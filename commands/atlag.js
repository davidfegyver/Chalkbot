const getApiData = require("../utils/getApiData");

const { notRegisteredEmbed } = require("../utils/embeds");

const Discord = require("discord.js");
const commonEndpoints = require("../utils/commonEndpoints");
const table = require("table");
exports.run = async (client, message, args) => {
  const datas = client.json[message.author.id]
    ? client.json[message.author.id].auth
    : undefined;

  if (!datas) return message.channel.send(notRegisteredEmbed);

  const data = await getApiData(`${commonEndpoints.evaluations}`, datas);

  let tantargyak = {};

  data.forEach((jegy) => {
    if (!tantargyak[jegy.Tantargy.Uid]) {
      tantargyak[jegy.Tantargy.Uid] = {
        tanar: jegy.ErtekeloTanarNeve,
        jegyek: [],
        nev: jegy.Tantargy.Nev,
        atlag: "",
      };
    }
    const jegyek = tantargyak[jegy.Tantargy.Uid].jegyek;
    if (jegy.SulySzazalekErteke == null) return;
    jegyek.push(jegy.SzamErtek);
    if (jegy.SulySzazalekErteke == 200) jegyek.push(jegy.SzamErtek);
  });

  Object.keys(tantargyak).forEach((key) => {
    ttargy = tantargyak[key];
    let osszes = 0;
    ttargy.jegyek.forEach((adsasd) => {
      osszes += adsasd;
    });
    ttargy.atlag = osszes / ttargy.jegyek.length;
    if (isNaN(ttargy.atlag)) delete tantargyak[key];
  });

  let tantargytable = new Array(Object.keys(tantargyak).length);
  for (let i = 0; i < tantargytable.length; i++) {
    tantargytable[i] = new Array(2);
  }

  let i = 0;

  Object.keys(tantargyak).forEach((key) => {
    ttan = tantargyak[key];
    tantargytable[i][0] = ttan.nev;
    tantargytable[i][1] = ttan.atlag.toFixed(2);
    i += 1;
  });

  const atlagembed = new Discord.MessageEmbed();
  atlagembed.setTitle("Az átlagaid:");
  atlagembed.setColor("RANDOM");
  atlagembed.setDescription("```" + table.table(tantargytable) + "```");
  message.channel.send(atlagembed);
};
