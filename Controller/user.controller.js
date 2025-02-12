const userModel = require("../models/user.model");
const bcrypt = require('bcryptjs');

const signup = async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({ name, email, password: hashedPassword });
    await  newUser.save()

    .then((results)=>{
        if(results){
            res.send({status:200, message:"User Created Successfully"})
        }
    })
    .catch((err)=>{
        res.send({status:500, message:"Error in Creating User", error:err})
    })
}

const signin = (req, res)=>{
    const { email, password } = req.body;
    userModel.findOne({ email})

    .then((user) => {
        if (!user) {
            console.log('Invalid credentials: User not found');
            return res.status(400).json({ status: false, message: 'User does not exist' });
        }
    
        return bcrypt.compare(password, user.password)
            .then((isMatch) => {
                if (!isMatch) {
                    console.log('Invalid credentials: Password mismatch');
                    return res.status(401).json({ status: false, message: 'Invalid credentials' });
                }
    
                return res.status(200).json({ status: true, message: 'Login successful', user: user });
            });
    })
    .catch(err => {
        console.error("Error during signin:", err);
        return res.status(500).json({ status: false, message: 'Error during signin' });
    });

}
    module.exports = {signup, signin};