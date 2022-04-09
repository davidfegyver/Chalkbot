const getApiData = require("../utils/getApiData");
const Discord = require("discord.js");
const { notRegisteredEmbed, noGradesEmbed } = require("../utils/embeds");

const commonEndpoints = require("../utils/commonEndpoints");
exports.run = async (client, message, args) => {
  const days = 7;
  const date = new Date(Date.now() - days * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];
  const datas = client.json[message.author.id]
    ? client.json[message.author.id].auth
    : undefined;

  if (!datas) return message.channel.send(notRegisteredEmbed);

  function getcolor(jegy) {
    if (jegy == 5) return "#008E44";
    if (jegy == 4) return "#00D166";
    if (jegy == 3) return "#F8C300";
    if (jegy == 2) return "#F93A2F";
    if (jegy == 1) return "#A62019";
  }

  const data = await getApiData(
    `${commonEndpoints.evaluations}?datumTol=${date}`,
    datas
  );
  if (!data.length) return message.channel.send(noGradesEmbed);

  for (let i = 0; i < data.length; i++) {
    const embed = new Discord.MessageEmbed()
      .setTitle(data[i].Tantargy.Nev)
      .addField("Értékelés", data[i].SzovegesErtek)
      .addField("Súly", `${data[i].SulySzazalekErteke}%`);
    if (data[i].Tema) embed.addField("Téma", data[i].Tema);
    embed
      .addField("Értékelő tanár neve", data[i].ErtekeloTanarNeve)
      .addField("Dátum", data[i].KeszitesDatuma.split("T")[0]);

    if (data[i].SzamErtek) embed.setColor(getcolor(data[i].SzamErtek));

    message.channel.send(embed);
  }
};
