# JavaScript Bin App

Using nodeJS, we sometimes need, or want to write some terminal/console programs, with interactive and readable interfaces.
Yes, there are some really good tools out there, and we use them :)
The idea is to find the best(or one of the best) way to build, organize, publish and maintain this kind of apps.

We intend to use it with builders such as Yeoman or Grunt.
But if you want to simply clone it and change the properties, it will be easy too!

### Dependencies

- Babel (ES2015 transpiler)

	```npm install --global babel```

## How it works(and why to use it)?

Clone it, go to the directory and rename the `your-app` file to some better name than that. Let's call it `bin-demo` for our example.
Then

```npm install```
or
```npm install -g```

Great, now you can run `./bin-demo` in this dir, or `bin-demo` from anywhere.
Better than that, feel free to also use `-v or --version`, as well as `-h or --help`.

*help content will be generated automatically*.

## Creating your bin-app

Basically, you will only use work in the `lib/bin/actions` directory.
Simply create new actions (any .js file) following the pattern below.
Let's say, we created an action called `magic.js`:

```
var utils = require(__dirname + '/../utils/');

module.exports = {
    exec: function(){
        // magic
    },
    description: "Do some magical stuff",
    alias: "m",
    type: "boolean"
};
```

This will add your new action to the help description, where:
`bin-demo -m` or `bin-demo --magic`  will call this action automatically when opening the program.

In case the user simply runs `bin-demo`, it gets into interactive mode.
So, your action will be called when the user types `magic` and hits enter, in interactive mode.

You may have othe "types" for your action, like `string`, for example:

```
module.exports = {
    exec: function(value){
        // magic
        console.log(value);
        return true;
    },
    description: "Do some magical stuff",
    alias: "m",
    type: "string"
};
```

And then:
```bin-demo -m foo``` would log "foo".

## Bin-app actions returns

When your action `exec` method returns true, the program enters into interative mode (even when not in it).

For example, if the action magic returns true(as in the example above), `bin-demo -m foo` should show the log message, and then gets into interactive mode.
It if returned false, it would only output the log, and close the program.
When in interatcive mode, this makes no difference.

Of course you can create async actions!
Just return a promise...that's it!
Ah, then, resolve it with `true` or `false`, as explained above.

```
module.exports = {
    exec: function(value){
        return new Promise((resolve, reject)=>{
        	setTimeout(()=>{
        		console.log('resolving it');
        		resolve(true);
        	}, 2000);
        });
    },
    description: "Do some magical stuff",
    alias: "m",
    type: "string"
};
```

## L10N

You will find interesting, the directory at `lib/bin/resources/`.
There, you can change de default values, the help header, and the L10N directory.

To create a new language, simply create a new directory, and inside it, add the `messages.js` and `questions.js` files, exporting an object with your dictionary.

```
module.exports = {
    goodBye: "Good bye .o/",
    failed: "Failed executing it!",
    starting: "Getting into interactive mode.\nEnter the command 'help' if you need.\nTo exit, use ctrl+c or one of the exiting commands:"
}
```

To use this dictionary, use:
```utils.l10n.messages.goodBye```

## Better output

We use `cli-color` to allow you to use colors on your outputs.
To do so, use the cli-color pattern, like so:

`utils.style.bold.red("bold message in red!")`

Inquirer is also installed, so you may require and use it by any time.

## User settings

To get information of the user settings, you can access:

`utils.userConfig`

If you want to change it, go to `settings/index.js` file.

To get the default values, you can acces:
`console.log( utils.defaults.get('options') );`

You may create different .js files in the `lib/bin/resources/defaults`. Then, access it using `get('filename')`.

## Utils

Utils also has some extra, useful methos, like `safeFileName`, which returns a safer version of a path. That means you can filter addresses before loading or writing files.
`strPadLeft`, `strPadRight` and `strPadCenter` are also useful.


## Portable

The portable directory and files, are supposed to be js files that will work in both bin and client/server environments.
This files have methods that do not depend on DOM, process, or anything environmental specific.

## Have fun!

:)