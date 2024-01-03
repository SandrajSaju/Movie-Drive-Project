const Actor = require('../models/actorModel');
const CastingCall = require('../models/castingCallModel');
const Director = require('../models/directorModel');
const { generateToken } = require('../utils/generateToken');

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const adminToken = generateToken(res, email,"admin")
            res.status(200).json({ email, adminToken })
        } else {
            res.status(400).json({ error: "Invalid Email or password" })
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const adminGetActors = async (req, res) => {
    try {
        const allActors = await Actor.find({isVerified:true});
        res.status(200).json(allActors)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const adminGetDirectors = async (req,res) => {
    try {
        const allDirectors = await Director.find({isAdminApproved:true});
        res.status(200).json(allDirectors)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const adminLogout = (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Logout Successful'
    })
}

const adminBlockActor = async (req,res) => {
    try {
        const {id} = req.params;
        const actor = await Actor.findById(id);
        actor.isBlocked = true;
        await actor.save()
        res.status(200).json({message:"Actor Blocked Successfully"})
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const adminUnblockActor = async (req,res) => {
    try {
        const {id} = req.params;
        const actor = await Actor.findById(id);
        actor.isBlocked = false;
        await actor.save();
        res.status(200).json({message:"Actor Blocked Successfully"})
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const adminBlockDirector = async (req,res) => {
    try {
        const {id} = req.params;
        const director = await Director.findById(id);
        director.isBlocked = true;
        await director.save()
        res.status(200).json({message:"director Blocked Successfully"})
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const adminUnblockDirector = async (req,res) => {
    try {
        const {id} = req.params;
        const director = await Director.findById(id);
        director.isBlocked = false;
        await director.save();
        res.status(200).json({message:"Director Blocked Successfully"})
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getDirectorRequests = async (req, res)=> {
    try {
        const allDirectorRequests = await Director.find({isAdminApproved:false});
        res.status(200).json(allDirectorRequests)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const adminApproveDirector = async (req,res) => {
    try {
        const {id} = req.params;
        const director = await Director.findById(id);
        director.isAdminApproved = true;
        await director.save()
        res.status(200).json({message:"Director Approved Successfully"})
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const adminRejectDirector = async (req,res) => {
    try {
        const {id} = req.params;
        await Director.findByIdAndDelete(id);
        res.status(200).json({message:"Director Approved Successfully"})
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}


module.exports = {
    adminLogin,
    adminGetActors,
    adminLogout,
    adminBlockActor,
    adminUnblockActor,
    adminGetDirectors,
    adminBlockDirector,
    adminUnblockDirector,
    getDirectorRequests,
    adminApproveDirector,
    adminRejectDirector
}