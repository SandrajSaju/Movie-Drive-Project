const mongoose = require('mongoose');

const directorSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    certificates: [{
        type: String,
        required:true
    }],
    profile: {
        gender: {
            type: String
        },
        phoneNumber: {
            type: Number
        },
        movies: [String]
    },
    castingCalls: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CastingCall'
    }],
    isBlocked: {
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdminApproved: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    })

const Director = mongoose.model('Director', directorSchema);
module.exports = Director;