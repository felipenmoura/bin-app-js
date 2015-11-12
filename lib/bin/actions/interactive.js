var utils = require(require.main.filename + '/../lib/bin/utils');
var inquirer = require("inquirer");

export function wait (){
    inquirer.prompt(utils.l10n.questions.command, function( answers ) {
        console.log(answers);
        
        if(answers.command != 'q' &&
           answers.command != 'quit' &&
           answers.command != 'exit' &&
           answers.command != 'bye'){
            
            answers.command = answers.command.split(" ");
            
            try{
                require(require.main.filename + "/../lib/bin/index.js").exec(...answers.command);
            }catch(e){
                console.log(utils.style.bold.red(utils.l10n.messages.failed), e.message, e);
            }
            
            // waits for the next command
            wait();
        }else{
            console.log(utils.style.bold(utils.l10n.messages.goodBye));
        }
    });
};


