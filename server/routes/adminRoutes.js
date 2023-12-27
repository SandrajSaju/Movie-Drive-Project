const express = require("express");
const router = express.Router();
const { adminLogin, adminGetActors, adminLogout, adminBlockActor, adminUnblockActor} = require("../controllers/adminControllers");
const { verifyAdminToken } = require("../middlewares/authMiddleware");


router.post('/login', adminLogin);
router.get('/getallactors', verifyAdminToken, adminGetActors);
router.post('/logout',adminLogout);
router.post('/blockactor/:id',verifyAdminToken, adminBlockActor)
router.post('/unblockactor/:id',verifyAdminToken, adminUnblockActor);

module.exports = router;