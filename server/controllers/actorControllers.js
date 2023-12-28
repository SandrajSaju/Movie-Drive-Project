const Actor = require('../models/actorModel');
const { generateToken } = require('../utils/generateToken');
const CastingCall = require('../models/castingCallModel');
const Application = require('../models/applicationModel');
const ImageKit = require("imagekit");
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const saltRounds = 10;


const actorLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Please provide Email and Password" });
        }
        const actor = await Actor.findOne({ email })
        if (actor && actor.isVerified === true) {
            const isPasswordMatch = await bcrypt.compare(password, actor.password)
            if (isPasswordMatch) {
                if (actor.isBlocked === true) {
                    return res.status(400).json({ error: "Your Account is been blocked" });
                }
                const actorToken = generateToken(res, actor._id,"actor")
                res.status(200).json({ actor, actorToken })
            } else {
                return res.status(400).json({ error: "Email or password does not match" });
            }
        } else {
            return res.status(400).json({ error: "You are not Registered" });
        }
    } catch (error) {
        console.log(error.message)
        res.status(400).json({ error: error.message });
    }
}

const googleLogin = async (req, res) => {
    try {
        const { name, email, picture } = req.body
        console.log(req.body)
        const existingActor = await Actor.findOne({ email })
        if (existingActor && existingActor.isVerified === true) {
            const actorToken = generateActorToken(res, existingActor._id);
            res.status(200).json({ existingActor, actorToken })
        } else {
            let password = (Math.floor(Math.random() * 900000) + 100000).toString();

            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: "sandrajdevamangalam@gmail.com",
                    pass: process.env.EMAIL_PASSWORD
                }
            });

            let mailOptions = {
                from: "sandrajdevamangalam@gmail.com",
                to: email,
                subject: "Movie Drive Otp Verification Mail",
                text: `Welcome to Movie Drive developed by Sandraj Saju.Your password for login in is ${password}.`
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log("Email sent:" + info.response);
                }
            });
            const hashedPassword = await bcrypt.hash(password, saltRounds)

            const newActor = await Actor.create({
                name,
                email,
                profile: {
                    profileImage: picture
                },
                password: hashedPassword
            })
            const actorToken = generateActorToken(res, newActor._id);
            res.status(200).json({ newActor, actorToken })
        }
    } catch (error) {
        console.log(error.message)
        res.status(400).json({ error: error.message });
    }
}

const actorSignup = async (req, res) => {
    try {
        const { name, email, phoneNumber, password, confirmPassword } = req.body;
        if (!name || !email || !phoneNumber || !password || !confirmPassword) {
            return res.status(400).json({ error: "Please fill all the field" });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords doesnt match" });
        }
        const existingActor = await Actor.findOne({ email });
        if (!existingActor) {
            const hashedPassword = await bcrypt.hash(password, saltRounds)
            const newActor = new Actor({
                name,
                email,
                phoneNumber,
                password: hashedPassword
            })
            await newActor.save()

            if (newActor) {
                let otp = Math.floor(Math.random() * 9000) + 1000;

                let transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: "sandrajdevamangalam@gmail.com",
                        pass: process.env.EMAIL_PASSWORD
                    }
                });

                let mailOptions = {
                    from: "sandrajdevamangalam@gmail.com",
                    to: email,
                    subject: "Movie Drive Otp Verification Mail",
                    text: `Welcome to Movie Drive developed by Sandraj Saju.Your Otp for Verification is ${otp}.`
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log("Email sent:" + info.response);
                    }
                });

                res.status(201).json({
                    email: newActor.email,
                    otp: otp
                });
            } else {
                res.status(400).json({ error: "Invalid Actor Data" })
            }
        } else {
            return res.status(400).json({ error: "Actor Already Registered" });
        }
    } catch (error) {
        console.log(error.message)
        res.status(400).json({ error: error.message });
    }
}

const actorLogout = (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Logout Successful'
    })
}

const verifyOtp = async (req, res) => {
    try {
        const { enteredOtp, otp, email } = req.body;
        if (enteredOtp == otp) {
            const actor = await Actor.findOne({ email });
            if (actor) {
                actor.isVerified = true;
                await actor.save();
                res.status(200).json("Otp Verified");
            } else {
                res.status(400).json("Actor Not Found")
            }
        } else {
            res.status(400).json({ error: "Enter Valid Otp" })
        }
    } catch (error) {
        console.log(error.message)
        res.status(400).json({ error: error.message });
    }
}

const getAllCastingCalls = async (req, res) => {
    try {
        const castingCalls = await CastingCall.find();
        res.status(200).json(castingCalls)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error.message });
    }
}

const updateActorProfile = async (req, res) => {
    try {
        const { name, email, phoneNumber } = req.body;
        const actor = await Actor.findOne({ _id: req.actorId })
        actor.name = name || actor.name;
        actor.email = email || actor.email;
        actor.phoneNumber = phoneNumber || actor.phoneNumber;
        actor.profile.age = req.body["profile.age"] || actor.profile.age
        actor.profile.gender = req.body["profile.gender"] || actor.profile.gender

        if (req.file) {
            const imagekit = new ImageKit({
                publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
                privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
                urlEndpoint: process.env.IMAGEKIT_URL_END_POINT,
            });

            const uploadImage = () => {
                return new Promise((resolve, reject) => {
                    imagekit.upload(
                        {
                            file: req.file.buffer,
                            fileName: `${Date.now()}-${req.file.originalname}`
                        },
                        (error, result) => {
                            if (error) {
                                console.log("Error uploading image to imagekit", error);
                                reject(error);
                            } else {
                                resolve(result.url);
                            }
                        }
                    )
                })
            }
            const imageUrl = await uploadImage();
            actor.profile.profileImage = imageUrl || actor.profile.profileImage
        }
        await actor.save();
        res.status(200).json({ message: "Actor Profile Updated Successfully", actor })

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" })
    }
}

const actorViewDetailedCastingCall = async (req, res) => {
    try {
        const id = req.params.id;
        const castingCall = await CastingCall.findById(id).populate('director');
        res.status(200).json(castingCall)
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" })
    }
}

const applyCastingCall = async (req, res) => {
    try {
        const { id } = req.params;
        const castingCall = await CastingCall.findById(id);
        const actor = await Actor.findById(req.actorId);
        if (actor) {
            if (!actor.profile.gender) {
                return res.status(400).json({ error: "Please Add Your gender in Profile" })
            }
            if (actor.profile.gender === castingCall.gender) {
                if (castingCall.appliedActors.includes(actor._id)) {
                    return res.status(400).json({ error: "Actor has already applied for this casting call" });
                }
                const newApplication = new Application({
                    actor: req.actorId,
                    castingCall: id
                })
                await newApplication.save();
                castingCall.appliedActors.push(actor._id)
                await castingCall.save()
                res.status(200).json(newApplication)
            } else {
                return res.status(400).json({ error: "This Casting Call require a different gender" })
            }
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" })
    }
}

const cancelApplication = async (req, res) => {
    try {
        const { castingCallId,applicationId } = req.params;
        const castingCall = await CastingCall.findById(castingCallId);

        const actorIndex = castingCall.appliedActors.findIndex((actor) => req.actorId)
        const deletedId = castingCall.appliedActors.splice(actorIndex, 1)
        castingCall.save()

        const application = await Application.findById(applicationId);
        application.status = "Cancelled";
        await application.save();
        res.status(200).json({ message: "Cancelled Successfully" })

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message })
    }
}

const ActorUploadVideo = async (req, res) => {
    try {
        const actor = await Actor.findById(req.actorId);

        if (req.file) {
            const imagekit = new ImageKit({
                publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
                privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
                urlEndpoint: process.env.IMAGEKIT_URL_END_POINT,
            });
            const uploadVideo = () => {
                return new Promise((resolve, reject) => {
                    imagekit.upload(
                        {
                            file: req.file.buffer,
                            fileName: `${Date.now()}-${req.file.originalname}`
                        },
                        (error, result) => {
                            if (error) {
                                console.log("Error Uploading video to imagekit", error);
                                reject(error)
                            } else {
                                resolve(result.url)
                            }
                        }
                    )
                })
            }

            try {
                const videoUrl = await uploadVideo();
                actor.profile.profileVideos.push(videoUrl);
            } catch (error) {
                return res.status(500).json({ error: "Video upload failed" })
            }
        }
        await actor.save();
        res.status(200).json({ message: "Video updated Successfully", actor });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getActorApplications = async (req, res) => {
    try {
        const applications = await Application.find({ actor: req.actorId ,status:{$ne:"Cancelled"}})
            .populate('actor')
            .populate({
                path: 'castingCall',
                populate: {
                    path: 'director',
                    model: 'Director'
                }
            })
        res.status(200).json(applications)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    actorLogin,
    googleLogin,
    actorSignup,
    verifyOtp,
    actorLogout,
    getAllCastingCalls,
    updateActorProfile,
    actorViewDetailedCastingCall,
    applyCastingCall,
    cancelApplication,
    ActorUploadVideo,
    getActorApplications
}