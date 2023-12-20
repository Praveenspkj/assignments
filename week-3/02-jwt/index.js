const jwt = require('jsonwebtoken');
const zod = require('zod')
const jwtPassword = "secret";

const validateInput = zod.object({
    username :zod.string().email(),
    password :zod.string().min(6)
})

function signJwt(username, password) {
    const user = {username:username,password:password}
    const validataion = validateInput.safeParse(user)
    if (!validataion.success){
        return null;
    }
    // console.log(validataion)
    const token = jwt.sign(user,jwtPassword);
    // console.log(token)
    return token;

}

function verifyJwt(token) {
    try{
        const verifiedTokenResult = jwt.verify(token,jwtPassword);
        console.log(verifiedTokenResult)
        return true;
    }catch(err){
        return false;
    }

}

function decodeJwt(token) {
    const parts = token.split('.')
    if (!(parts.length===3))return false
    try{
        const results  = jwt.decode(token );
        return true;
    }catch(err){
        return false;
    }
}


module.exports = {
    signJwt,
    verifyJwt,
    decodeJwt,
    jwtPassword
}