var utils = require(__dirname + '/../utils/');

module.exports = {
    exec: function(){
        require("cli-clear")();
        // do not close the program
        return false;
    },
    description: "Clears the terminal"
};
