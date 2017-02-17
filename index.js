'use strict';

var got = require('got');
var chalk = require('chalk');

module.exports = function(query, opts, token) {
    // Setup our URL
    // https://www.googleapis.com/customsearch/v1?key=AIzaSyBXXPk7Ok1wt_Fgful-LYd38BXX7eHMDXE&cx=009649313578604026890:j6kv1-0r0bo&q=wordpress+developer+portland&fields=items,queries
    var base = 'https://www.googleapis.com/customsearch/v1';
    var key = 'AIzaSyBXXPk7Ok1wt_Fgful-LYd38BXX7eHMDXE';
    var cx = '009649313578604026890:j6kv1-0r0bo';
    var fields = 'items,queries';

    var url = base + '?key=' + key + '&cx=' + cx + '&fields=' + fields + '&q=' + query.replace(/ /g, '+');

    // Set up our options
    var options = {
        json: true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    // Send the request to Google and return the data and query
    return got(url, options)
        .then(res => {
            return {
                url: url,
                data: res.body,
                query: query
            };
        })
        .catch(err => {
            console.log(err.response.body);
        });
};
