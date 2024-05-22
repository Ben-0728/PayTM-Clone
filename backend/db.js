const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect("mongodb+srv://hacker_ben:xghP7N2WPfKIUoUt@hackathon.vchd8bz.mongodb.net/").catch((err) => {console.log("MongoDB error",err)});

const userSchema = new Schema({
    first_name: {type: String,
        // required: true
    },
    last_name: {type: String,
        // required: true
    },
    username: {type: String,
        // required: true
    },
    password: {type: String,
        // required: true
    },
})

const accSchema = new mongoose.Schema({
    userId : {type: Schema.Types.ObjectId, ref: 'User'},
    balance: {type: Number,
        required: true
    },
})

const User = mongoose.model('User', userSchema);
const Account = mongoose.model('Account', accSchema);

module.exports = {User, Account};