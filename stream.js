
var Twitter = require('twitter');

var client = new Twitter({
    consumer_key: 'eeyniajDwY4xHSJzSFPjyg1Iq',
    consumer_secret: 'sdWt3PWFpivseMBS4bux8wd6kn3Fqge29NsJfoJF2YZBNVIdgu',
    access_token_key: '14499302-4j7zOwf9kyFAqDJayqlzfUeK8SEGlZzOZE0u1cuGs',
    access_token_secret: 'z1JtnWydmicfsEwIJQKpbha07DHIOphOodH9vHJH4X1mF'
});


client.stream('statuses/filter', { track: 'Spectre', language: 'en', }, function(stream) {
    stream.on('data', function(tweet) {
        console.log(tweet);
    });

    stream.on('error', function(error) {
        throw error;
    });
});
