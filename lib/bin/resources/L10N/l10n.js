
module.exports = function (utils) {
    // and then, the questions and messages objects in his/her language
    return{
        lang: utils.userConfig.language,
        questions: require(utils.binPath + "resources/L10N/" + (utils.userConfig.language || "en-us").toLowerCase() + "/questions.js"),
        messages: require(utils.binPath + "resources/L10N/" + (utils.userConfig.language || "en-us").toLowerCase() + "/messages.js")
    };
}