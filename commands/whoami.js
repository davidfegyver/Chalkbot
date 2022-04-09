const getApiData = require("../utils/getApiData")
const Discord = require("discord.js")
const commonEndpoints = require("../utils/commonEndpoints")
exports.run = async (client, message, args) => {
    const datas = client.json[message.author.id] ? client.json[message.author.id].auth : undefined;

    const notRegisteredEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("❌ Hiba! ❌")
        .setDescription("Még nem regisztráltál. Használd a **/kreta register** parancsot!");

    if (!datas) return message.channel.send(notRegisteredEmbed)


    const noDMEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("❌ Ezt a parancsot csak privát üzenetben tudom teljesíteni. ❌\n **Adatvédelmi okokból**")
        .setDescription("Próbálj meg rámírni priviben 😘");


    if (message.channel.type != "dm") return message.channel.send(noDMEmbed);
    
    const data = await getApiData(commonEndpoints.student, datas)
    let Name = data.Nev;
    let Address = data.Cimek[0];
    let Szulok = data.Gondviselok;
    let szuletesiDatum = data.SzuletesiDatum;
    const embed = new Discord.MessageEmbed()
        .setTitle("❓ Ki vagyok én... :thinking:")
        .addField("Neved:", Name)
        .addField("Lakhely:", Address)
        .addField("Születési dátum:", new Date(new Date(szuletesiDatum).getTime() + 1 * 86400000).toISOString().split("T")[0]);
    Szulok.forEach(szulo => {
        embed.addField("Szülő:", szulo.Nev);
    });
    message.channel.send(embed);
}