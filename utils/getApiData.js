const crypto = require("crypto")
const getToken = require("./getToken")
const superagent = require("superagent")
const {encKey} = require("../settings.json")
module.exports = async (apilink, datas) => {
    const decryptedDatas = decrypt(datas).split("|");
    let bearer = await getToken(decryptedDatas[0], decryptedDatas[1], decryptedDatas[2])
    if (apilink.includes("ellenorzo")) apilink = `https://${decryptedDatas[0]}.e-kreta.hu${apilink}`
    const {
        body
    } = await superagent
        .get(apilink)
        .set("User-Agent", "hu.ekreta.student/1.0.5/Android/0/0")
        .set("Authorization", `Bearer ${bearer}`).catch(console.error);
    return body;
}

function decrypt(text) {
    const decipher = crypto.createDecipher('aes-256-ctr', encKey)
    let dec = decipher.update(text, 'hex', 'utf8')
    dec += decipher.final('utf8');
    return dec;
}