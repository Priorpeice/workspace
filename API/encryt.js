const crypto = require('crypto');
const util = require("util");

async function Hashing(password) {
    const mkSalt = util.promisify(crypto.randomBytes);
    const mkResult = util.promisify(crypto.pbkdf2);

    let salt = await mkSalt(60); // make 60bytes size random value(data type is buffer)
    salt = salt.toString("base64"); // so we hava to change to String by encoding

    const result = await mkResult(password, salt, 10253, 64, "sha512"); // make hash using sha512 hash function

    return {key : salt, value : result.toString("base64")}; // hash value changed String using encoding(base64)
}

 function ReHashing(password,salt) {

    const result =  crypto.pbkdf2Sync(password, salt, 10253, 64, "sha512"); 

    return result.toString("base64"); // hash value changed String using encoding(base64)
}
// async function ReHashing(password,salt) {
//     const mkResult = util.promisify(crypto.pbkdf2);
//     const result = await mkResult(password, salt, 10253, 64, "sha512"); 
//     return result.toString("base64"); // hash value changed String using encoding(base64)
// }

module.exports = { Hash : Hashing ,ReHash : ReHashing};