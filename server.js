'use strict';

const Hapi = require('hapi');
var Memcached = require('memcached');

const server = new Hapi.Server();
server.connection({
  port: 80,
});

server.route({
    method: 'GET',
    path:'/',
    handler: function (request, reply) {

      var memcached = new Memcached('memcached:11211');

      memcached.set('foo', 'bar', 10, function (err) { /* stuff */ });

      memcached.get('foo', function (err, data) {
        console.log(data);
      });

      return reply('hel world');
    }
});

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});
