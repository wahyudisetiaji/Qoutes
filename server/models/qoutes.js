const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var qoutesSchema = new Schema({
    status: {
        type: String,
        required: [true, 'status is required']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
},{
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});

var Qoutes = mongoose.model('Qoutes', qoutesSchema);

module.exports = Qoutes