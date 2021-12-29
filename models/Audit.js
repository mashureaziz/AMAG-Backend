const mongoose = require('mongoose');
const User = require('./User');

const auditSchema = mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        required : [true, 'User is required'],
        ref : 'User'
    },
    actionType : {
        type : String,
        enum : ['CREATED','UPDATED','DELETED'],
        default : 'CREATED'
    },
    siteId: {
        type : mongoose.Schema.Types.ObjectId,
        required : [true, 'Site ID is required'],
        ref : 'Site'
    },
    date : {
        type : String,
        required : [true, 'Date is required']
    }
}
, {
    toJSON :{
        transform(doc,ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
} , {timestamps: true}
);

const Audit = mongoose.model('Audit', auditSchema);

module.exports = Audit;