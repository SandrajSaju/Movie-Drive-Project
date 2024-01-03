const express = require("express");
const router = express.Router();
const { adminLogin, adminGetActors, adminLogout, adminBlockActor, adminUnblockActor, adminGetDirectors,adminBlockDirector,adminUnblockDirector, getDirectorRequests, adminApproveDirector, adminRejectDirector} = require("../controllers/adminControllers");
const { verifyToken } = require("../middlewares/authMiddleware");


router.post('/login', adminLogin);
router.get('/getallactors', verifyToken, adminGetActors);
router.post('/logout',adminLogout);
router.post('/blockactor/:id',verifyToken, adminBlockActor)
router.post('/unblockactor/:id',verifyToken, adminUnblockActor);
router.get('/getalldirectors', verifyToken, adminGetDirectors);
router.post('/blockdirector/:id',verifyToken, adminBlockDirector)
router.post('/unblockdirector/:id',verifyToken, adminUnblockDirector);
router.get('/getdirectorrequests', verifyToken, getDirectorRequests);
router.post('/approvedirector/:id',verifyToken, adminApproveDirector);
router.post('/rejectdirector/:id',verifyToken, adminRejectDirector);

module.exports = router;