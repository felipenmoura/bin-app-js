module.exports = {
    exec: function(){
        console.log("Current version: " + require('../../../package.json').version);
        // close the program
        return true;
    },
    alias: "v",
    description: "Shows version information of the McLang itself adjad ahdakhsdalksh adhaksjdh jh aksjdh",
    type: "boolean"
};
