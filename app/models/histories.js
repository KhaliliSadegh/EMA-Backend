const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { ObjectId } = Schema

const HistoriesSchema = new Schema({
    action: { type: String, required: true },
    collectionName: { type: String, required: true },
    documentId: Schema.Types.ObjectId,
    actionBy: { type: Schema.Types.Mixed },
    document_data: { type: Schema.Types.Mixed }
},{
    timestamps: { createdAt: 'createdAt' },
})

HistoriesSchema.index({ action: 1, collectionName: 1 })

module.exports = mongoose.model('Histories', HistoriesSchema);