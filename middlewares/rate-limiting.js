'use strict';
const Throttle = require('../services/throttle');
const config = require('../config.json')[process.env.NODE_ENV || 'local'];

module.exports = (req, res, next) => {
    const remoteAddress = req.connection.remoteAddress ||
        req.headers['x-forwarded-for'] ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    const { secure } = config;
    const { path } = req;

    console.log('ANTI BOTS DETECTION', remoteAddress, path);

    const throttle = new Throttle(remoteAddress, path);
    const routeThrottlingConfig = secure && secure[path];
	
    throttle.secure(routeThrottlingConfig, function(allowed, timeToBan) {
        console.log('Allowed: ', allowed);
        if(!allowed) {
            return res.status(429).send('you have exceeded your request limit');
        }

        return next();
	});
};
