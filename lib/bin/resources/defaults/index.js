module.exports = {
    get: (what)=>{
        return require('./' + what.replace(/(\.\.)|(^\/)/g, '') + '.js');
    }
}