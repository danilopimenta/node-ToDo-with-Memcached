'use strict';

const Hapi = require('hapi');
var Memcached = require('memcached');
var path = require('path');
const Inert = require('inert');

const server = new Hapi.Server();
server.connection({
  port: 80,
});

server.route({
    method: 'GET',
    path:'/cache',
    handler: function (request, reply) {

      var memcached = new Memcached('memcached:11211');

      memcached.set('foo', 'bar', 10, function (err) { /* stuff */ });

      memcached.get('foo', function (err, data) {
        console.log(data);
      });

      return reply('hel world');
    }
});

server.register(Inert, () => {});

server.route({
    method: 'GET',
    path:'/',
    handler: {
        file: 'index.html'
    }
});

server.route({
  method: 'GET',
  path: '/js/{file*}',
  handler: {
    directory: {
      path: 'js'
    }
  }
})

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});
