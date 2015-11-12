import * as strs from "../../portable/string-utils.js";

// let's get the user settings
var userConfig = require(require.main.filename + '/../lib/bin/utils/user-config.js');

var toExport = {
    
    binPath: require.main.filename + '/../lib/bin/',
    
    colorify: (text) => require('./beautify.js').colorify(text),
    
    style: require('cli-color'),
    
    safeFileName : (fileName) => fileName.replace(/(\.\.)|^\//g, ''),
    
    strPadLeft: strs.strPadLeft,
    strPadRight: strs.strPadRight,
    strPadCenter: strs.strPadCenter,
    
    prettyfy: strs.prettyfy,
    
    userConfig
}

toExport.l10n = require(toExport.binPath + 'resources/L10N/l10n.js')(toExport);

module.exports = toExport;
