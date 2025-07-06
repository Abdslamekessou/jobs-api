const bcrypt = require('bcrypt')
require('dotenv').config();
const { required } = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')  

const UserSchema = new mongoose.Schema (
    {
        name : {
            type : String ,
            required : [true , 'Please Provide A name'] ,
            minLength : 3 ,
            maxLength : 50
        },
        email:{
            type: String ,
            required : true , 
            match : [/^[^\s@]+@[^\s@]+\.[^\s@]+$/  , 'Please Provide Email'] ,
            unique : true
        },
        password:{
            type : String ,
            required : [true , 'Please Provide A Password'] ,
            minLength : 6 
        }
    }
)
UserSchema.pre('save' , async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt)

    next();
})

UserSchema.methods.createJWT = function(){
    return jwt.sign({userId : this._id , name : this.name} , process.env.JWT_SECRET , {
        expiresIn : process.env.JWT_LIFETIME
    })
}

UserSchema.methods.comparePassword = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword , this.password)
}

module.exports = mongoose.model('User',UserSchema)