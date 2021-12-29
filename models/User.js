const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : [true, 'Name is required']
    },
    role : {
        type : String,
        required : [true, 'Role is required']
    }
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
}
);

const User = mongoose.model('User', userSchema);

module.exports = User;