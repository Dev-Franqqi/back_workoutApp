const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const validator = require('validator');


const userSchema  =new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }

})

//static login method
userSchema.statics.login = async function(email,password){
    if(!email || !password){
        throw Error("All Fields must be filled")
    }
    const user= await this.findOne({email});
    if(!user){
        throw Error("Incorrect Email or Password")

    
    }
    const match = await bcrypt.compare(password ,user.password);
    if(!match){
        throw Error('Incorrect Email or Password');
    
    }
    return user;

    
}

//static siginup user
userSchema.statics.signup = async function(email,password){
    if(!email || !password){
        throw Error("All Fields must be filled")
    }

    if(!validator.isEmail(email)){
        throw Error("Please Enter a valid Email")
    }

    if(!validator.isStrongPassword(password)){
        throw Error("Password not strong enough")
    }
    const exists = await this.findOne({email});
    if(exists){
        throw Error("Email already in use")
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password,salt)


    const user = await this.create({email,password:hash})
    return user;

}



module.exports = mongoose.model('User',userSchema);
