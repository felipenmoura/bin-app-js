var utils = require(require.main.filename + '/../lib/bin/utils');
var inquirer = require("inquirer");
var started = false;

export function wait (){
    
    // shows the error message
    function showErrorMessage(e){
        console.error(utils.style.bold.red(utils.l10n.messages.failed), e.message, e);
    }
    
    // announcing the begining of the interactive mode
    if (!started) {
        console.log(utils.l10n.messages.starting);
        console.log("    " + utils.userConfig.exitCommands.join(", "));
        started = true;
    }
    
    // let's start listening for commands
    inquirer.prompt(utils.l10n.questions.command, function( answers ) {
        
        // if the user simply hitted enter
        if(!answers.command){
            return wait();
        }
        
        // we have some "give up" commands
        if (utils.userConfig.exitCommands.indexOf(answers.command) < 0) {
            
            answers.command = answers.command.split(" ");
            
            try{
                // let's try and execute the command
                let val = require(require.main.filename + "/../lib/bin/index.js").exec(...answers.command);
                
                // and if this is a Promise, then we wait for it
                if(!val || !(val.then && typeof val.then == 'function') ){
                    wait();
                }else{
                    // otherwise, go ahead or catch it
                    val.then(wait).catch((err)=>{
                        showErrorMessage(e);
                        wait();
                    });
                }
            }catch(e){
                // in case of errors, we also wait for the next command
                showErrorMessage(e);
                wait();
            }
            
        }else{
            // when one of the finish commands is triggered, it
            // ends up the program and politelly sais good bye!
            console.log(utils.style.bold(utils.l10n.messages.goodBye));
        }
    });
};


