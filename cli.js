#!/usr/bin/env node

'use strict';

// Get the modules
var meow = require('meow');
var chalk = require('chalk');
var _ = require('lodash');
var jbs = require('./');

// Handle the arguments
var cli = meow({
    help: [
        '',
        'Usage:',
        '    $ jbs <query>',
        '',
        'Example:',
        '    $ jbs "wordpress developer"',
        ' ',
    ]
});

// Check if a query is supplied
if (!cli.input[0]) {
    console.log(cli.help);
    process.exit(1);
}

// Call the jbs module
jbs(cli.input[0], cli.flags).then(function(res) {
    console.log();
    _.forIn(res.data.items, function(val, key) {
        var job = {
            title: val.title,
            url: val.link,
            description: val.snippet
        };

        console.log(chalk.magenta('==> ') + chalk.blue.bold(job.title));
        // console.log(chalk.magenta('  > ') + chalk.white(job.description));
        console.log(chalk.magenta('  > ') + chalk.white(job.url));
        console.log();
    });

    console.log(chalk.white('---\n'));
    console.log(chalk.white(res.url));
    console.log();

    process.exit(0);
});
