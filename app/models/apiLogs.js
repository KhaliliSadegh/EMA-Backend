const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ApiLogsSchema = new Schema({
    ip: { type: String, required: true },
    url: { type: String, required: true },
    method: { type: String, required: true },
    http_version: { type: String, required: true },
    body: { type: Schema.Types.Mixed },
    user: { type: Schema.Types.Mixed }
},{
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
})

module.exports = mongoose.model('ApiLogs', ApiLogsSchema);