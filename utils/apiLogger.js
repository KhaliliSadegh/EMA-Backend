const ApiLogsSchema = require('../app/models/apiLogs.js');

const apiLogger = (request) => {

    var ip = request.headers['x-forwarded-for'] || 
        request.connection.remoteAddress || 
            request.socket.remoteAddress ||
                (request.connection.socket ? request.connection.socket.remoteAddress : null);

    var apiLog = new ApiLogsSchema({
        ip: ip,
        url: request.originalUrl,
        method: request.method,
        http_version: request.httpVersion,
        body: request.body,
        //user: request.session.user
    });

    return apiLog.save();

};

module.exports = apiLogger;