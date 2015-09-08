var utils = require(__dirname + '/../utils/');

module.exports = {
    exec: function(){
        console.log(utils.prettyfy(
                utils.colorify(
                    require('fs')
                        .readFileSync(__dirname + '/../resources/help.txt','utf-8')
                )
            )
        );
        
        console.log(utils.colorify("[[bold]]Available options:[[/bold]]"));
        
        let acts = require(__dirname + '/../resources/schemas/').get('actions');
        
        for(let act in acts.rawData){
            let cur = acts.rawData[act],
                help = "";
            
            if(cur.alias) {
                help += "-" + cur.alias +" ";
            }
            help += "--" + cur.name + " ";
            
            if(cur.type != 'boolean') {
                help += `[${cur.type}]`;
            }
            
            help = utils.strPadLeft(help, 26, " ");
            help = utils.colorify("[[green]]"+help+"[[/green]]");
            help += utils.prettyfy(cur.description, 26); // 80, " ", 26);
            console.log(help);
        }
        
        // close the program
        return true;
    },
    alias: "h",
    description: "Shows help information",
    type: "boolean"
};
