import jwt from 'jsonwebtoken'

const isAuth = async(req, res, next)=>{

    try {
        // get out the only token value from the cookie righther then all cookie
        let {token} = req.cookies
        if(!token){
            return res.status(400).json({message:"user doesn't token"})
        }

        let verifyToken = await jwt.verify(token, process.env.JWT_SECRET)
        if(!verifyToken){
            return res.status(400).json({message:"user doesn't have valid token"})
        }
        
        req.userId = verifyToken.userId
        next()
    } catch (error) {
        
        return res.status(500).json({message: "is auth error"})
    }
}

export default isAuth