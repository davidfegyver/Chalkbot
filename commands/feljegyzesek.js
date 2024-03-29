const getApiData = require("../utils/getApiData");
const { notRegisteredEmbed } = require("../utils/embeds");
const Discord = require("discord.js");
const commonEndpoints = require("../utils/commonEndpoints");
exports.run = async (client, message, args) => {
  const datas = client.json[message.author.id]
    ? client.json[message.author.id].auth
    : undefined;

  const days = 7;
  const date = new Date(Date.now() - days * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  if (!datas) return message.channel.send(notRegisteredEmbed);

  const data = await getApiData(
    `${commonEndpoints.notes}?datumTol=${date}`,
    datas
  );
  if (!data.length) return message.channel.send(noNotesEmbed);

  for (let i = 0; i < data.length; i++) {
    const embed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTitle(data[i].Cim)
      .addField("Tanár", data[i].KeszitoTanarNeve)
      .addField("Dátum", data[i].KeszitesDatuma.split("T")[0])
      .setDescription(data[i].Tartalom);
    message.channel.send(embed);
  }
};
