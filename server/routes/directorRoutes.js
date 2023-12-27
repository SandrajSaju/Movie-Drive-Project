const express = require("express")
const router = express.Router()
const multer = require('multer');
const {directorLogin,directorSignup,directorLogout,createCastingCall,getDirectorCastingCalls,deleteCastingCall,editCastingCall, directorApproveActor, directorRejectActor, directorGetApplications} = require('../controllers/directorControllers');
const {verifyDirectorToken} = require('../middlewares/authMiddleware')

const castingCallImageStorage = multer.memoryStorage({
    filename:function(req,file,cb){
        const uniqueSuffix = Date.now();
        cb(null,`${uniqueSuffix}-${file.originalname}`);
    }
});
const castingCallImageUpload = multer({storage:castingCallImageStorage});

router.post("/login",directorLogin)
router.post("/signup",directorSignup)
router.post("/logout",directorLogout)
router.post('/createcastingcall',verifyDirectorToken,castingCallImageUpload.single("image"),createCastingCall)
router.get('/getcastingcalls',verifyDirectorToken,getDirectorCastingCalls)
router.delete('/deletecastingcall/:id',verifyDirectorToken,deleteCastingCall)
router.put('/editcastingcall/:id',verifyDirectorToken,castingCallImageUpload.single("image"),editCastingCall);
router.get('/getapplicants/:id',verifyDirectorToken,directorGetApplications)
router.post('/approveactor/:id',verifyDirectorToken,directorApproveActor);
router.post('/rejectactor/:id',verifyDirectorToken,directorRejectActor);

module.exports = router