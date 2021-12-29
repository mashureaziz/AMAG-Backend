const { redirect } = require('express/lib/response');
const mongoose = require('mongoose');
const Audit = require('./Audit');

const SiteSchema = mongoose.Schema({
    siteNo :{
        type : Number,
        required :['Site no is required']
    },
    name : {
        type : String,
        required : [true, 'Site name is required']
    },
    region : {
        type : String,
        required : [true, 'Site name is required']
    },
    description : {
        type : String,
        required : [true, 'Site Description must be provided']
    },
    latitude : {
        type: Number,
        min: -90,
        max: 90,
        required: [true,'Valid Latitude must be provided']
    },
    longitude : {
        type: Number,
        min : -180,
        max : 180,
        required: [true,'Valid Longitude must be provided']
    },
    audits :[{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Audit'
    }]
}, 

{
    toJSON: {
        transform(doc,ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    },
    timestamps: true,
},
);

const Site = mongoose.model('Site', SiteSchema);

module.exports = Site;