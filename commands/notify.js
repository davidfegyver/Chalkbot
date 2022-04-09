const Discord = require("discord.js");
const fs = require("fs");
const { notRegisteredEmbed } = require("../utils/embeds");

exports.run = async (client, message, args) => {
  const datas = client.json[message.author.id]
    ? client.json[message.author.id].auth
    : undefined;

  if (!datas) return message.channel.send(notRegisteredEmbed);

  let arg = args[0];
  client.json[message.author.id].kretaNotify =
    arg == "on"
      ? true
      : arg == "off"
      ? false
      : client.json[message.author.id].kretaNotify;
  fs.writeFileSync("./loginDatas.json", JSON.stringify(client.json, null, 2));

  const embed = new Discord.MessageEmbed()
    .setTitle("Kréta értesítő rendszer")
    .setColor(client.json[message.author.id].kretaNotify ? "GREEN" : "ORANGE")
    .addField(
      "Állapot",
      client.json[message.author.id].kretaNotify ? "Bekapcsolva" : "Kikapcsolva"
    );
  message.channel.send(embed);
};
