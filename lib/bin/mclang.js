
const defaults = require('./resources/defaults/');
var utils = require('./utils/');

/**
 * TODO: add documentation
 *
 *
 *
 */
class McLang {
    
    treatArg (optName, val) {
        optName = utils.safeFileName(optName);
        let action = require('./actions/' + optName + '.js');
        return action.exec(val);
    }
    
    // treats all the argument options passed to the program
    treatArgs () {
        let val = true;
        
        for(let opt in this.options) {
            if(opt != '_' &&
               opt.length > 1 &&
               this.options.hasOwnProperty(opt) &&
               this.options[opt]) {
                val = this.treatArg(opt, this.options[opt], this.options);
                
                // if any of these is a "dead end"(returning true),
                // stops the program
                if(val){
                    return false;
                }
            }
        }
        return true;
    }
    
    constructor (args) {
        
        this.options = args;
        
        // let's treat the arguments
        if(!this.treatArgs()) {
            process.exit();
            return;
        }
        
    }
}

module.exports = McLang;
