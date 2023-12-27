const jwt = require('jsonwebtoken');

const generateActorToken = (res,actorId) => {
    const actorToken = jwt.sign(
        {actorId},
        process.env.JWT_SECRET_KEY,
        {expiresIn : "30d"}
    )
    return actorToken;
}

const generateDirectorToken = (res,directorId) => {
    const directorToken = jwt.sign(
        {directorId},
        process.env.JWT_SECRET_KEY,
        {expiresIn : "30d"}
    )
    return directorToken;
}

const generateAdminToken = (res,adminEmail) => {
    const adminToken = jwt.sign(
        {adminEmail},
        process.env.JWT_SECRET_KEY,
        {expiresIn : "30d"}
    )
    return adminToken
}

module.exports = {
    generateActorToken,
    generateDirectorToken,
    generateAdminToken
}