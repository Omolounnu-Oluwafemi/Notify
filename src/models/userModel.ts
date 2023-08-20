import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
    {
    firstname:{
        type: String,
        required: [true, 'A user must have a firstname'],
    },
    lastname:{
        type: String,
        required: [true, 'A user must have a lastname'],
    },
    username:{
        type: String,
        required: [true, 'A user must have a username'],
        unique: true,
        // primaryKey: true,
    },
    email:{
        type: String,
        required: [true, 'A user must have a username'],
        unique: true,
    },
    password:{
        type: String,
        required: [true, 'A user must have a username'],
    },
    },
)

export const User = mongoose.model('User', userSchema)

// User.hasMany( Note, {
//     foreignKey: 'userId'
// })

// Note.belongsTo(User, {
//     foreignKey: 'userId'
// })
