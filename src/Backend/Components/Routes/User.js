const app= require('express');
const user = require('../Collections/User');
const router= app.Router();
// bcrypt for password hashing 
const bcrypt= require('bcrypt');
const jwt= require('jsonwebtoken'); // to generate tokens 
const secretKey="This is Shahnwaz Khan";



// Route 1: Register new user . Login not required
router.post('/',async (req,res)=>{
    const check=await user.findOne({Email:req.body.Email});
    if(check){
        return res.status(400).json({Error:"Email already exists."})
    }
    // Encrypting password to keep safe 
    // generate salt 
    const salt = await bcrypt.genSalt(10);
    // generate hash
    const hashedPassword= await bcrypt.hash(req.body.Password,salt);

    
    const create=await user.create({
        Name:req.body.Name,
        Email:req.body.Email,
        Department:req.body.Department,
        Designation:req.body.Designation,
        Password:hashedPassword
    })
    if(create){
        const payLoad={
            user:{
                id:create._id
            }
        }
        const token =jwt.sign(payLoad,secretKey); 
        return res.status(200).json(token);
    }else return res.status(401).json({Error:"Internal server error."})
    
})


// Router 2 : Login register user . No login required
router.post('/login',async (req,res)=>{
      const {Email,Password} = req.body;
      const checkEmail=await user.findOne({Email:Email});
      if(!checkEmail){
        return res.status(404).json({Error:"Account not found.Please register first."})
      }
      const oldPassword=await user.findOne({Email:Email});
      console.log(oldPassword)
      const checkPassword= await bcrypt.compare(Password,oldPassword.Password);
      if(!checkPassword){
        return res.status(402).json({Error:"Wrong Password detected."})
      }
      const payLoad={
        user:{
            id:oldPassword._id
        }
    }
    const token =jwt.sign(payLoad,secretKey);
      res.json({Success:"Welcome to andc_treasure.",token})
})
module.exports=router;