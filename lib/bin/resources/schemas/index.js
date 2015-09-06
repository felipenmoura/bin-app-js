var utils = require('../../utils/');

var actionsPath = __dirname + '/../../actions/',
    actionsSchemasCache = null;

function getActionSchema (actName) {
    // we clean the name up
    actName = utils.safeFileName(actName);
    // and use it to get the action information
    return require(actionsPath + actName +'.js');
}

function getActionsSchemas () {
    let fs = require('fs'),
        actions = null,
        schema = {
            rawData: {},
            alias: {}
        };
    
    if(actionsSchemasCache){
        return actionsSchemasCache;
    }
    
    actions = fs.readdirSync(actionsPath);
    
    // for each available action
    actions.forEach(function(curName){
        
        if(curName[0] != '.'){
            curName = curName.replace(/\..+$/, '');
            // you can rename actions with ".", to disable them
            let action = getActionSchema(curName);
            schema[action.type] = schema[action.type] || [];
            schema[action.type].push(curName);
            if(action.alias) {
                schema.alias[action.alias] = curName;
            }
            action.name = curName;
            schema.rawData[curName] = action;
        }
    });
    
    // we return it, but also cache it for the next usage
    return actionsSchemasCache = schema;
}

module.exports = {
    get: (what)=>{
        if(what == 'actions'){
            return getActionsSchemas();
        }else{
            return require('./' + what.replace(/(\.\.)|(^\/)/g, '') + '.js');
        }
    }
}