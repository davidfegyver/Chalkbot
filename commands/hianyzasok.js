const getApiData = require("../utils/getApiData")
const Discord = require("discord.js")
const commonEndpoints = require("../utils/commonEndpoints")
exports.run = async (client, message, args) => {
    const datas = client.json[message.author.id] ? client.json[message.author.id].auth : undefined;

    
    const days = 7;
    const date = new Date(Date.now() - (days * 24 * 60 * 60 * 1000)).toISOString().split("T")[0];

    const notRegisteredEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("❌ Hiba! ❌")
        .setDescription("Még nem regisztráltál. Használd a **/kreta register** parancsot!");

    if (!datas) return message.channel.send(notRegisteredEmbed)

    const data = await getApiData(`${commonEndpoints.absences}?datumTol=${date}`,datas);

    const nohfs = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("🎉 Hiányzások - Huh... 🎉")
        .setDescription("Nem hiányoztál egy óráról se az elmúlt egy héten");

    if (!data.length) return message.channel.send(nohfs)


    for (let i = 0; i < data.length; i++) {
        const embed = new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle(data[i].Tipus.Leiras)
            .addField("Dátum:", data[i].KeszitesDatuma.split("T")[0])
            .addField("Tanár neve:", data[i].RogzitoTanarNeve)
            .addField("Tantárgy:", data[i].Tantargy.Nev);
        message.channel.send(embed)
    }
}