const express = require("express")
const router = express.Router()
const multer = require('multer')
const { actorLogin, actorSignup, actorLogout, getAllCastingCalls, updateActorProfile, googleLogin, verifyOtp, actorViewDetailedCastingCall, applyCastingCall, cancelApplication, ActorUploadVideo, getActorApplications, actorCancelApplication} = require("../controllers/actorControllers")
const { verifyToken } = require("../middlewares/authMiddleware")

const profileImageStorage = multer.memoryStorage({
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, `${uniqueSuffix}-${file.originalname}`);
    }
});
const profileImageUpload = multer({ storage: profileImageStorage });

const videoStorage = multer.memoryStorage({
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, `${uniqueSuffix}-${file.originalname}`);
    }
});
const videoUpload = multer({ storage: videoStorage });

router.post("/login", actorLogin)
router.post("/googlelogin", googleLogin)
router.post("/signup", actorSignup)
router.post("/verifyotp",verifyOtp)
router.post("/logout", actorLogout)
router.get('/castingcalls', verifyToken, getAllCastingCalls)
router.patch('/updateprofile', verifyToken, profileImageUpload.single("image"), updateActorProfile);
router.get('/viewdetailedcastingcall/:id',verifyToken,actorViewDetailedCastingCall)
router.post('/applycastingcall/:id',verifyToken,applyCastingCall);
router.post('/cancelapplication/:castingCallId/:applicationId',verifyToken,cancelApplication);
router.post('/uploadvideo', verifyToken, videoUpload.single("video"), ActorUploadVideo);
router.get('/getactorapplications',verifyToken,getActorApplications);


module.exports = router