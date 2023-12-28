const express = require("express")
const router = express.Router()
const multer = require('multer');
const {directorLogin,directorSignup,directorLogout,createCastingCall,getDirectorCastingCalls,deleteCastingCall,editCastingCall, directorApproveActor, directorRejectActor, directorGetApplications, directorVerifyOtp} = require('../controllers/directorControllers');
const {verifyToken} = require('../middlewares/authMiddleware')

const castingCallImageStorage = multer.memoryStorage({
    filename:function(req,file,cb){
        const uniqueSuffix = Date.now();
        cb(null,`${uniqueSuffix}-${file.originalname}`);
    }
});
const castingCallImageUpload = multer({storage:castingCallImageStorage});

const certificateStorage = multer.memoryStorage({
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      cb(null, `${uniqueSuffix}-${file.originalname}`);
    },
});
const directorCertificatesUpload = multer({ storage: certificateStorage })
  

router.post("/login",directorLogin)
router.post("/signup",directorCertificatesUpload.array('images'),directorSignup)
router.post("/verifyotp",directorVerifyOtp)
router.post("/logout",directorLogout)
router.post('/createcastingcall',verifyToken,castingCallImageUpload.single("image"),createCastingCall)
router.get('/getcastingcalls',verifyToken,getDirectorCastingCalls)
router.delete('/deletecastingcall/:id',verifyToken,deleteCastingCall)
router.put('/editcastingcall/:id',verifyToken,castingCallImageUpload.single("image"),editCastingCall);
router.get('/getapplicants/:id',verifyToken,directorGetApplications)
router.post('/approveactor/:id',verifyToken,directorApproveActor);
router.post('/rejectactor/:id',verifyToken,directorRejectActor);

module.exports = router