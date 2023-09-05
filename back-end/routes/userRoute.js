const router = require("express").Router();
const userModel = require("../models/userModel");
const bcrypt = require('bcrypt');

//register route and function 
router.post("/register", async (req, res) => {
	try {
        //check if user exit with same email or not
		const userexists = await userModel.findOne({ email: req.body.email});
		if (userexists) {
			res.send({
				status: false,
				message: "Email already in use",
			});
		} else {
            //bcrypt password
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(req.body.password, salt);
            req.body.password = hashPassword;

			const newUser = await userModel(req.body);
            newUser.save();
            
            return res.send({
                status: true,
                message: "User registered successfully"
            })
		}
	} catch (error) {
		res.send(error);
	}
});

//Login route and function to login
router.post('/login', async (req,res) => {
    try {
        const userexists = await userModel.findOne({email:req.body.email});

        if( !userexists ) {
            return res.send({
				status: false,
				message: "Email not registered",
			});
        }

        //decrypt password and match if correct or not
        const validPassword = await bcrypt.compare(req.body.password, userexists.password);

        if(validPassword) {
            return res.send({
				status: true,
				message: "User Logged In",
			});
        } else {
            return res.send({
				status: false,
				message: "Invalid Password",
			});
        }
    } catch (error) {
        console.log(error);
    }
    res.send("hello from login");
});

//export
module.exports = router;
