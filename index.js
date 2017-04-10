'use strict';
var Geo = require('ip-to-location');


var register = function (server, options, next) {
    options = Object.assign({}, { enabled: false }, options || {});
    // decorate the request with a `geo` property
    server.decorate('request', 'geo', function () { return null }, { apply: true });

    server.ext('onPostAuth', function (request, reply) {

        var opts = request.route.settings.plugins.geo;
        options = Object.assign({}, options, opts || {});
        if (options.enabled) {
            var ips = request.headers['x-forwarded-for'];
            var ip = ips ? ips.split(',')[0] : request.info.remoteAddress;
            Geo.fetch(ip, function (err, res) {
                request.geo = res;
                return reply.continue();
            });
        } else {
            return reply.continue();
        }

    });

    next();
};

register.attributes = { pkg: require('../package.json') };

exports.register = register;