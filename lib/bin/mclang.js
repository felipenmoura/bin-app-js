
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
        
        let listOfPromises = [];
        
        for(let opt in this.options) {
            if(opt != '_' &&
               opt.length > 1 &&
               this.options.hasOwnProperty(opt) &&
               this.options[opt]) {
                
                listOfPromises.push(
                    this.treatArg(opt, this.options[opt], this.options)
                );
            }
        }
        
        // returns then, the list of promises
        return Promise.all(listOfPromises);
    }
    
    constructor (args) {
        
        // store the arguments passed to the program
        this.options = args;
        
        // let's treat the arguments
        this.treatArgs()
            .then((results)=>{
                
                // if one of the programs returned false, then that was a
                // dead end action
                if(results.length && results.indexOf(false) >= 0){
                    return process.exit();
                }

                // if no command has been passed (results.length === 0)
                // we open it for the interactive mode
                require('./actions/interactive.js').wait();
            
            })
            .catch((err)=>{
                console.error(err);
            });
    }
}

module.exports = McLang;
