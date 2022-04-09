const fs = require("fs");
const { notRegisteredEmbed, dataDeletedEmbed } = require("../utils/embeds");

exports.run = (client, message, args) => {
  const datas = client.json[message.author.id]
    ? client.json[message.author.id].auth
    : undefined;

  if (!datas) return message.channel.send(notRegisteredEmbed);

  delete client.json[message.author.id];
  fs.writeFileSync("./loginDatas.json", JSON.stringify(client.json, null, 2));

  message.channel.send(dataDeletedEmbed);
};
