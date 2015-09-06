#!/usr/bin/env node
'use strict';

// everything ES6
require('babel/register');

// we store the default values
var defaults = require('./resources/defaults/');

// lets store the arguments
var args = process.argv.slice(2);
// and we will use the default args merged with the given ones
Object.assign(args, defaults.get('options'), args);

// now, it's time for us to start some things up!
var argv =  require('minimist')(args,
            require('./resources/schemas/')
                .get('actions')),
    McLang = require('./mclang.js'),
    mcLang = new McLang(argv);

// and give it back to the world!
module.exports = mcLang;
