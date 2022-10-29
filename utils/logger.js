const fs = require('fs');
const winston = require('winston');

const logDir = "./log"
if(!fs.existsSync(logDir))
	fs.mkdirSync(logDir);

const fileTransport = new winston.transports.File({
	filename: [logDir, 'app.log'].join("/"),
	timestamp: true,
	json: false,
});

winston.loggers.options.transports = [ fileTransport ];
winston.loggers.add('app', {
	console: {
		level: 'debug',
		colorize: true,
		timestamp: true,
		label: 'app'
	}
});

winston.loggers.add('user_action', {
	console: {
		level: 'debug',
		colorize: true,
		timestamp: true,
		label: 'user_action'
	}
});


module.exports = {
	appLogger: winston.loggers.get('app'),
	userActionLogger: winston.loggers.get('user_action'),
};
