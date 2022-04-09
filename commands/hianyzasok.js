const getApiData = require("../utils/getApiData");
const Discord = require("discord.js");
const { notRegisteredEmbed, noAbsencesEmbed } = require("../utils/embeds");

const commonEndpoints = require("../utils/commonEndpoints");
exports.run = async (client, message) => {
  const datas = client.json[message.author.id]
    ? client.json[message.author.id].auth
    : undefined;

  const days = 7;
  const date = new Date(Date.now() - days * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  if (!datas) return message.channel.send(notRegisteredEmbed);

  const data = await getApiData(
    `${commonEndpoints.absences}?datumTol=${date}`,
    datas
  );

  if (!data.length) return message.channel.send(noAbsencesEmbed);

  for (let i = 0; i < data.length; i++) {
    const embed = new Discord.MessageEmbed()
      .setColor("RED")
      .setTitle(data[i].Tipus.Leiras)
      .addField("Dátum:", data[i].KeszitesDatuma.split("T")[0])
      .addField("Tanár neve:", data[i].RogzitoTanarNeve)
      .addField("Tantárgy:", data[i].Tantargy.Nev);
    message.channel.send(embed);
  }
};
