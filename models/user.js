const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id:{
        type: String,
        required: true
    },
    pw:{
        type: String,
        required: true
    }
}, { timestamps: true});//자료형, 옵션

const User = mongoose.model('User', userSchema);
module.exports = User;