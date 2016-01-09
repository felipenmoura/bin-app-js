var utils = require(__dirname + '/../utils/');

module.exports = {
    exec: function(){
        require("cli-clear")();
        // should continue the program
        return true;
    },
    description: "Clears the terminal"
};
