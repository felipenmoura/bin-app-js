module.exports = {
    safeFileName : (fileName) => fileName.replace(/(\.\.)|^\//g, ''),
    strPadLeft: (str, len, char = " ") => {
        str= str.substr(0, len);
        str += (new Array(len - str.length)).join(char);
        return str;
    },
    strPadRight: (str, len, char = " ") => {
        str= str.substr(0, len);
        return (new Array(len - str.length)).join(char) + str;
    },
    strPadCenter: (str, len, char = " ") => {
        str= str.substr(0, len);
        let diff = Math.floor(len - str.length);
        return (new Array(diff)).join(char) + str + (new Array(diff)).join(char);
    },
    prettyfy: function (text, pad = 0, limit = 80, fill = " ") {
        let chunks = [],
            first = true;
        
        let lines = text.split("\n");
        
        lines.forEach((str)=>{
            
            // if it is empty, we simply add the new line to the chunks list
            if(!str){
                chunks.push("");
            }
            
            // while the line is still longer than the limit
            while (str.length + pad > limit) {
                
                // use the last space character
                let pos = str.substr(0, limit - pad);
                pos = pos.lastIndexOf(" ");
                // or the limit itself, if it is too long not-spaced word/line
                if(pos < 0) {
                    pos = limit - pad;
                }
                // then, ensure the trailing extra space will not be kept
                pos++;

                // if this is the first line of them all
                if(first){
                    // we simply add it to the list
                    first = false;
                    chunks.push(str.substr(0, pos));
                }else{
                    // otherwise, we add this using the giving pad
                    chunks.push(
                        this.strPadLeft("", pad) + str.substr(0, pos)
                    );
                }
                
                // do not forget to remove this block from the sring
                // to avoid an infinity loop
                str = str.substr(pos);
            }
            
            // if any part of the string is still in it, we use it
            if(str.length) {
                chunks.push(
                    this.strPadLeft("", first? 0 : pad) + str
                );
            }
        });
        
        //console.log(chunks);
        return chunks.join("\n");
    }
}