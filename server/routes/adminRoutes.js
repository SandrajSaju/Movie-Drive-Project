const express = require("express");
const router = express.Router();
const { adminLogin, adminGetActors, adminLogout, adminBlockActor, adminUnblockActor} = require("../controllers/adminControllers");
const { verifyToken } = require("../middlewares/authMiddleware");


router.post('/login', adminLogin);
router.get('/getallactors', verifyToken, adminGetActors);
router.post('/logout',adminLogout);
router.post('/blockactor/:id',verifyToken, adminBlockActor)
router.post('/unblockactor/:id',verifyToken, adminUnblockActor);

module.exports = router;