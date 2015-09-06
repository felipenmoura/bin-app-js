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
    prettyfy: function (str, pad = 0, limit = 80, fill = " ") {
        let len = str.length,
            chunks = [],
            first = true;
        
        while (str.length + pad > limit){
            let pos = str.slice(0, limit - pad).lastIndexOf(' ');
            
            if(pos < 0) {
                pos = limit - pad;
            }
            
            if(first){
                first = false;
                chunks.push(str.substr(0, pos));
            }else{
                chunks.push(
                    this.strPadLeft("", pad) + str.substr(1, pos)
                );
            }
            str = str.substr(pos);
        }
        
        if(str.length) {
            chunks.push(
                this.strPadLeft("", first? 0 : pad) + str.replace(/^ /, '')
            );
        }
        
        //console.log(chunks);
        return chunks.join("\n");
    }
}