const getApiData = require("../utils/getApiData");
const Discord = require("discord.js");
const commonEndpoints = require("../utils/commonEndpoints");
const { notRegisteredEmbed, onlyDMEmbed } = require("../utils/embeds");

exports.run = async (client, message, args) => {
  const datas = client.json[message.author.id]
    ? client.json[message.author.id].auth
    : undefined;

  if (!datas) return message.channel.send(notRegisteredEmbed);

  if (message.channel.type != "dm") return message.channel.send(onlyDMEmbed);

  const data = await getApiData(commonEndpoints.student, datas);
  let Name = data.Nev;
  let Address = data.Cimek[0];
  let Szulok = data.Gondviselok;
  let szuletesiDatum = data.SzuletesiDatum;
  const embed = new Discord.MessageEmbed()
    .setTitle("❓ Ki vagyok én... :thinking:")
    .addField("Neved:", Name)
    .addField("Lakhely:", Address)
    .addField(
      "Születési dátum:",
      new Date(new Date(szuletesiDatum).getTime() + 86400000)
        .toISOString()
        .split("T")[0]
    );
  Szulok.forEach((szulo) => {
    embed.addField("Szülő:", szulo.Nev);
  });
  message.channel.send(embed);
};
