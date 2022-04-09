const Discord = require("discord.js");
const math = require("mathjs");
exports.run = (client, message, args) => {
  if (!args.length)
    return message.channel.send(
      `Adj meg egy műveletet amit meg akarsz oldani.`
    );
  let whatto = args.join(" ");
  try {
    let result = math.evaluate(whatto).toString();

    const embed = new Discord.MessageEmbed()
      .setTitle("Matek Megoldás")
      .addField(`Feladat:`, whatto, true)
      .addField(`Eredmény:`, result, true);
    message.channel.send({ embed });
  } catch (e) {
    return message.channel.send("Szerintem ez nem megoldható.");
  }
};
