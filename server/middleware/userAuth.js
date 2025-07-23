import jwt from 'jsonwebtoken';

const userAuth = async(req, res, next) => {
    const {token} = req.cookies;
    if(!token) {
        return res.json({
            success: false,
            message: "Not authorized, Log In again!"
        })
    }
    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        if(tokenDecode.id) {
            req.body = req.body || {};
            req.body.userId = tokenDecode.id
        } else {
            return res.json({
                success: false,
                message: "Not authorized, Log In again!"
            })
        }
        next();
    } catch(err) {
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
}

export default userAuth;