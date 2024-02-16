import bcrypt from "bcrypt";
import jwt  from "jsonwebtoken";
import User from "../models/User.js";

export const register = async (req, res) => {
    try {
        const  { 
            firstName,
            lastName,
            email,
            password,
            picture,
            friends,
           location,  
        } = req.body;

        console.log(req.body)

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picture,
            friends,
           location,
        });

        const savedUser = await newUser.save();

        res.status(201).json(savedUser)

    } catch (error) {
        res.status(500).json({ "ErrorMessage": error.message });
    }
}

// logged In

export const loggedIn = async (req, res) => {
    try {
        const { email, password} = req.body;
        const user = await User.findOne({ email: email })
        if(!user) return res.status(400).json({msg: "User does not exist. "})

        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch)

        if(!isMatch) res.status(401).json("Invaid Creadition");

        var token = jwt.sign({ id: user._id}, process.env.JWT_SECRET);
        delete user.password;

        res.status(200).json({ token,  user})

    } catch (error) {
        res.status(501).json({ "ErrorMessage": error.message });
    }
}