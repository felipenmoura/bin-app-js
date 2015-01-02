var utils = require(__dirname + '/../utils/');

module.exports = {
    exec: function(){
        console.log(utils.style.bold("Current version: ") + require('../../../package.json').version);
        return false;
    },
    alias: "v",
    description: "Shows version information of the McLang itself adjad ahdakhsdalksh adhaksjdh jh aksjdh",
    type: "boolean"
};
