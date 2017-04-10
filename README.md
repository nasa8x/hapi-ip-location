Hapi.js Geo IP 2 Location plugin. 

Fetch the geo location of Client IP incoming request in a plugin before your handlers, available under the `request.geo` property.


Install via NPM

```js
npm install hapi-ip-location --save
```

```js
var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({ port: 8080, host: 'localhost' });

server.register([{
    register: require('hapi-ip-location'),
    options: {   
        // set true, if you want to use all rountes     
         enabled: false 
    }
}], function (err) {
    // Insert your preferred error handling here...
});

```

Options can be configured on a route via the `geo` plugin object.

```js
server.route({
  method: 'GET',
  path: '/ip',
  config: {
    plugins: {
      geo: { enabled: true } }
    },
    handler: function (request, reply) {
      reply(request.geo);
        //  {  
        //     ip: '209.58.139.51', 
        //     country_code: 'US', 
        //     country_name: 'United States', 
        //     region_code: 'CA', 
        //     region_name: 'California', 
        //     city: 'San Jose', 
        //     zip_code: '95131', 
        //     time_zone: 'America/Los_Angeles', 
        //     latitude: 37.3874, 
        //     longitude: -121.9024, 
        //     metro_code: 807  
        // } 
    }
  }
});
```