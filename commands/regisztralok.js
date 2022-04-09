const crypto = require("crypto");
const getToken = require("../utils/getToken");
const fs = require("fs");
const { encKey } = require("../settings.json");
const {
  onlyDMEmbed,
  alreadyRegisteredEmbed,
  badDataEmbed,
} = require("../utils/embeds");

exports.run = async (client, message, args) => {
  if (message.channel.type != "dm") return message.channel.send(onlyDMEmbed);

  const school = args[0];
  const username = args[1];
  const password = args.slice(2).join(" ");

  const datas = client.json[message.author.id]
    ? client.json[message.author.id].auth
    : undefined;

  if (datas) return message.channel.send(alreadyRegisteredEmbed);

  if (!school || !username || !password)
    return message.channel.send(badRegisterUsageEmbed);
  try {
    await getToken(school, username, password);
  } catch {
    return message.channel.send(badDataEmbed);
  }

  client.json[message.author.id] = client.json[message.author.id] || {};
  client.json[message.author.id].auth = encrypt(
    `${school}|${username}|${password}`
  );

  fs.writeFileSync("./loginDatas.json", JSON.stringify(client.json, null, 2));

  message.channel.send(registeredEmbed);
};

function encrypt(text) {
  const cipher = crypto.createCipher("aes-256-ctr", encKey);
  let crypted = cipher.update(text, "utf8", "hex");
  crypted += cipher.final("hex");
  return crypted;
}
