const superagent = require("superagent");

module.exports = async (institute_code, userName, password) => {
  const nonce = await superagent
    .get("https://idp.e-kreta.hu/nonce")
    .then((res) => res.text);

  const bytes = Buffer.from(
    userName.toLowerCase() + institute_code.toLowerCase() + nonce,
    "utf8"
  );
  const digest = require("crypto")
    .createHmac(
      "sha512",
      Buffer.from([53, 75, 109, 112, 109, 103, 100, 53, 102, 74])
    )
    .update(bytes)
    .digest();

  const resp = await superagent
    .post("https://idp.e-kreta.hu/connect/token")
    .set("Content-Type", "application/x-www-form-urlencoded")
    .set("X-Authorizationpolicy-Nonce", nonce)
    .set("X-Authorizationpolicy-Key", digest.toString("base64"))
    .set("X-Authorizationpolicy-Version", "v1")
    .send({
      institute_code,
      userName,
      password,
      grant_type: "password",
      client_id: "kreta-ellenorzo-mobile",
    })
    .then((res) => res.body);

    return resp.access_token
};
