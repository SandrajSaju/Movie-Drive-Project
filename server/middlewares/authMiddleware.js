const jwt = require('jsonwebtoken');

const verifyActorToken = (req, res, next) => {
    console.log(req.body);
    const token = req.headers.actorauthorization;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.actorId = decoded.actorId;
        next();
    } catch (error) {
        return res.status(400).json({
            message: 'Invalid Token'
        })
    }
}

const verifyDirectorToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.directorId = decoded.directorId;
        next();
    } catch (error) {
        return res.status(400).json({
            message: 'Invalid Token'
        })
    }
}

const verifyAdminToken = (req,res,next) => {
    try {
        const token = req.headers.adminauthorization;
        if(!token){
            return res.status(401).json({message:"Unauthorized: No token provided"});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        next();
    } catch (error) {
        return res.status(400).json({
            message: 'Invalid Token'
        })
    }
}

module.exports = {
    verifyActorToken,
    verifyDirectorToken,
    verifyAdminToken
}