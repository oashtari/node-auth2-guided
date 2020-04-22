module.exports = {
    jwtSecret: process.env.JWT_SECRET || 'it is a secret' // previously a variable, now on object, then add a .env file 
}

// watch Luis web 26 video at 1:25 market on how to use JWTKEY