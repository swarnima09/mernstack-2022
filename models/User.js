const mongoose          =       require('mongoose');

const UserSchema        =       new mongoose.Schema({
    name                :       {
        type            :       String,
        required        :       true,
    },
    email               :       {
        type            :       String,
        required        :       true,
        unique          :       true,
    },
    password            :       {
        type            :       String,
        required        :       true,
    },
    avatar              :       {
        type            :       String,
    },
    Date                :       {
        type            :       Date,
        default         :       Date.now
    }
})

                                                 // It takes two things user and the schema
module.exports          =       User        =   mongoose.model('user', UserSchema);