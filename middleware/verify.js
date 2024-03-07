import jwt from 'jsonwebtoken'


const verify = (req, res, next) => {
    const token = req.header('auth-token')
    if(!token) return res.status(404).send('Access denied')
    try{
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        req.user = verified
        console.log(verified)
        next()
        
    }
    catch(err) {
        console.log(err.message)
        
    }

}

export default verify