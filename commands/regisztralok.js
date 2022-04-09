const crypto = require('crypto');
const Discord = require("discord.js");
const getToken = require("../utils/getToken")
const fs = require("fs")
const {encKey} = require("../settings.json")
exports.run = async (client, message, args) => {
    
    const noDMEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("❌ Ezt a parancsot csak privát üzenetben tudom teljesíteni. ❌\n **Adatvédelmi okokból**")
        .setDescription("Próbálj meg rámírni priviben 😘");

    if (message.channel.type != "dm") return message.channel.send(noDMEmbed);

    const school = args[0];
    const username = args[1];
    const password = args[2];

    const datas = client.json[message.author.id] ? client.json[message.author.id].auth : undefined;


    const alredyRegisteredEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("❌ Regisztráció - Hiba! ❌")
        .setDescription("Már regisztráltál! Ha úgy gondolod hogy valami baj van a bottal, akkor próbáld a **kreta unregister** parancsot");

    if (datas) return message.channel.send(alredyRegisteredEmbed);

    
    const badUseEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("❌ Regisztráció - Hibás használat! ❌")
        .setDescription("Elvárt használat: **/kreta regisztralok [Iskola] [TanulóAzonosító] [Jelszó]**");

    if (!school || !username || !password) return message.channel.send(badUseEmbed);

    let token;
    try {
        token = await getToken(school, username, password)
    } catch {
        const badDataEmbed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("❌ Regisztráció - Hiba! ❌")
            .setDescription("Hibás adatok! Próbáld újra");
        return message.channel.send(badDataEmbed)
    }

    client.json[message.author.id] = client.json[message.author.id] || {};
    client.json[message.author.id].auth = encrypt(`${school}|${username}|${password}`)

    fs.writeFileSync('./loginDatas.json', JSON.stringify(client.json, null, 2));

    const doneEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("📝 Regisztráció - Sikerült! 🎉")
        .setDescription("Sikerült! Mostmár eléred a bot többi részét");
    message.channel.send(doneEmbed);
}

function encrypt(text) {
    const cipher = crypto.createCipher('aes-256-ctr', encKey)
    let crypted = cipher.update(text, 'utf8', 'hex')
    crypted += cipher.final('hex');
    return crypted;
}