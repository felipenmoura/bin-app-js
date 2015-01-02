var cli = require('cli-color');

var commands = ["black",
                "bgBlack",
                "red",
                "bgRed",
                "green",
                "bgGreen",
                "yellow",
                "bgYellow",
                "blue",
                "bgBlue",
                "magenta",
                "bgMagenta",
                "cyan",
                "bgCyan",
                "white",
                "bgWhite",
                "blackBright",
                "bgBlackBright",
                "redBright",
                "bgRedBright",
                "greenBright",
                "bgGreenBright",
                "yellowBright",
                "bgYellowBright",
                "blueBright",
                "bgBlueBright",
                "magentaBright",
                "bgMagentaBright",
                "cyanBright",
                "bgCyanBright",
                "whiteBright",
                "bgWhiteBright",
                "bold",
                "italic",
                "underline",
                "blink",
                "inverse",
                "strike"];

module.exports = {
    colorify: function (text) {
        
        var tokenNewLine = "@___TOKEN__NEWLINE___@";
        
        //let md = rawData;
        let beuatified = text.replace(/\n/g, tokenNewLine);
        
        commands.forEach((cur)=>{
            beuatified = beuatified.replace(
                            new RegExp("\\[\\["+cur+"\\]\\](.+?)\\[\\[\\/"+cur+"\\]\\]", 'g'),
                            cli[cur]("$1"));
        });
        
        beuatified= beuatified.replace(new RegExp(tokenNewLine, 'g'), "\n");
        
        return beuatified;
    }
}
