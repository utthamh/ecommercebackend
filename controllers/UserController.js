const User=require('../models/user')
const bcrypt = require('bcrypt');
const {getToken}=require('../config/util')

exports.signup=async(req,res)=>{
   const {firstName,lastName,email,password}=req.body;
   const userexist=await User.findOne({ where: { email } })
   if(userexist){
    return res.status(400).json({
        message: 'User already registered'
    });
   }
   let hashpassword='12345'
    if(password){hashpassword= await bcrypt.hashSync(password,10)}
    User.create({firstName,lastName,email,password:hashpassword}).then(data=>res.status(200).json(data)).catch(err=>res.status(500).json(err))
}

exports.signin=async(req,res)=>{

    try{
   const user= await User.findOne({where:{ email: req.body.email }})
    
       
        if(user){
            const  {firstName,lastName,email,password}=user
            if(bcrypt.compareSync(req.body.password,password)){
               
                res.status(200).json({
                    token:getToken({firstName,lastName,email,password}),
                    user: {firstName,lastName,email}
                });
            }else{
                return res.status(400).json({
                    message: 'Invalid Password'
                })
            }

        }else{
            return res.status(400).json({message: 'User Not Exist'});
        }
    }
    catch(error){
        if(error) return res.status(400).json({ error });
    }
}