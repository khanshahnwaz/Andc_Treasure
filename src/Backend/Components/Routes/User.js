const app = require('express');
const user = require('../Collections/User');
const router = app.Router();
// bcrypt for password hashing 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // to generate tokens 
const secretKey = "This is Shahnwaz Khan";



// Route 1: Register new user . Login not required
router.post('/signUp', async (req, res) => {
    // console.log("Hi I am here.")
    console.log("Requested data is",req.body)

    const check = await user.findOne({ Email: req.body.email });
    if (check) {
        console.log("Email already exists.")
        return res.json({ Message: "Email already exists.",status:400 })
    }
    // Encrypting password to keep safe 
    // generate salt 
    const salt = await bcrypt.genSalt(10);
    // generate hash
    const hashedPassword = await bcrypt.hash(req.body.password, salt);


    const create = await user.create({
        Name: req.body.name,
        Email: req.body.email,
        Department: req.body.department,
        Designation: req.body.designation,
        Password: hashedPassword
    })
    if (create) {
        const payLoad = {
            user: {
                id: create._id
            }
        }
        const token = jwt.sign(payLoad, secretKey);
        return res.status(201).json({Message:"Account created successfully.",token:token,status:201});
    } else return res.status(401).json({Message: "Internal server error." })

})


// Router 2 : Login register user . No login required
router.post('/login', async (req, res) => {

    const { Email, Password } = req.body;
    const checkEmail = await user.findOne({ Email: Email });
    if (!checkEmail) {
        return res.status(404).json({ Message: "Account not found." })
    }
    const oldPassword = await user.findOne({ Email: Email });
    // console.log(oldPassword)
    const checkPassword =  await bcrypt.compare(Password, oldPassword.Password);
    if (!checkPassword) {
        console.log("Password matched.")
        return res.status(401).json({ Message: "Wrong password detected.",status:401 })
    }else console.log("Password matched.")
    const payLoad = {
        user: {
            id: oldPassword._id
        }
    }


    const token = jwt.sign(payLoad, secretKey);
    // localStorage.setItem('token', token)
    return res.json({ Message: "Welcome to andc_treasure.", token,status:200 })

})
module.exports = router;