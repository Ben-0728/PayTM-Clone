const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://hacker_ben:ivz0Y4XHyZZ6G7OB@hackathon.vchd8bz.mongodb.net/").catch((err) => {console.log("MongoDB error",err)});

const userSchema = new mongoose.Schema({
    fisrt_name: {type: String,
        required: true
    },
    last_name: {type: String,
        required: true
    },
    username: {type: String,
        required: true
    },
    password: {type: String,
        required: true
    },
})

const User = mongoose.model('User', userSchema);

module.exports = User;