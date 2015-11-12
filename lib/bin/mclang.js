
const defaults = require('./resources/defaults/');
var utils = require('./utils/');

/**
 * TODO: add documentation
 *
 *
 *
 */
class McLang {
    
    /**
     * Treats an argument calling the program
     * 
     * Runs the command/program/action from the given argument.
     * For example, -v or --version runs the action "version.js".
     */
    treatArg (optName, val) {
        return this.exec(optName, val);
    }
    
    /**
     * Runs the command or action
     */
    exec (command, options) {
        command = utils.safeFileName(command);
        let action = require('./actions/' + command + '.js');
        return action.exec(options);
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
        }else{
            
            console.log(args._.length)
            
            // if no command has been passed
            // we open it for the interactive mode
            require('./actions/interactive.js').wait();
        }
        
    }
}

module.exports = McLang;
