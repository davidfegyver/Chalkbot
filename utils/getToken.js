const fetch = (...args) => import('node-fetch').then(module => module.default(...args))

module.exports = async (school, username, password)=>{
    const nonceStr = await fetch("https://idp.e-kreta.hu/nonce").then(r=>r.text())

    const nonceEncoder = getNonce(nonceStr, username, school)
    const resp = await fetch("https://idp.e-kreta.hu/connect/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            ...nonceEncoder.header()
        },
        body: `institute_code=${school}&userName=${username}&password=${password}&grant_type=password&client_id=kreta-ellenorzo-mobile`
    }).then(response => response.json());
    return resp.access_token; 
}


function getNonce(nonce, username, institute_code) {
    const nonceEncoder = new Nonce(Buffer.from([53, 75, 109, 112, 109, 103, 100, 53, 102, 74]), nonce)
    nonceEncoder.encode(username.toLowerCase() + institute_code.toLowerCase() + nonce)
    return nonceEncoder
}
class Nonce {
    constructor(key, nonce) {
        this.key = key;
        this.nonce = nonce;
        this.encoded = "";
    }
    encode(str) {
        const bytes = Buffer.from(str, "utf8")
        const digest = require("crypto").createHmac("sha512", this.key)
            .update(bytes)
            .digest();
        this.encoded = digest.toString("base64");
    }
    header() {
        return {
            "X-Authorizationpolicy-Nonce": this.nonce,
            "X-Authorizationpolicy-Key": this.encoded || "",
            "X-Authorizationpolicy-Version": "v1",
        }
    }

}