const Users = require('../models/userModel')
const bycrypt = require('bcryptjs')
const jwt =require('jsonwebtoken')

const useCtrl = {

    registerUser: async (req, res) => {
        try {
            const { username, email, password } = req.body;
            const user = await Users.findOne({ email: email })
            if (user) return res.status(400).json({ msg: "The email already exists" })
            
            const passwordHash = await bycrypt.hash(password, 10)
            const newUser = new Users({
                username: username,
                email: email,
                password:password
            })
            await newUser.save()
            res.json("user made")
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
            
        }


        
    },
    loginUser:async (req, res) => {
        try {
           
            const { email, password } = req.body;
            const user = await Users.findOne({email:email})
            if (!user) return res.status(400).json({ msg: "user does not exist" })
            

         
            if (password!=user.password) return res.status(400).json({ msg: "Incorrect password" })
            
            //create token if login succesful
            const payload = { id: user._id, name: user.username }
            const token = jwt.sign(payload, process.env.TOKEN_SECRET, {expiresIn:"10d"})


            res.json({ token });
          
        } catch (err) {
          return res.status(500).json({ msg: err.message });
        }
  
    },
    verifiedToken:async (req, res) => {
        try {
            const token = req.header("Authorization");
            if (!token)
              return res.status(400).json({ msg: "invalidAuthentication" });

            jwt.verify(token, process.env.TOKEN_SECRET,async (err, verified) => {
              if (err)
                return res.status(400).json({ msg: "Authorization not valid" });

                const user = await Users.findById(verified.id)
                if (!user) return res.send(false)
                return res.send(true)
            })

            
        } catch (error) {
            return res.status(500).json({ msg: err.message });
            
        }
    }
}

module.exports = useCtrl