const Discord = require("discord.js");
exports.run = (client, message, args) => {
    const noDMEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("❌ Ezt a parancsot csak privát üzenetben tudom teljesíteni. ❌\n **Adatvédelmi okokból**")
        .setDescription("Próbálj meg rámírni priviben 😘");

    if (message.channel.type != "dm") return message.channel.send(noDMEmbed);

    const registerEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("📝 Regisztráció 📝")
        .setDescription("A regisztrációval elfogadod az Adatvédelmi nyilatkozatot: \n ```\nA Chalkbot egy kliensalkalmazás, segítségével az e-Kréta rendszeréből letöltheted és megjelenítheted az adataidat.\nIlyenkor adattovábbítás csak a Bot, a Discord és a Kréta-szerverek között történik, titkosított kapcsolaton keresztül.\nA Chalkbot fejlesztője és üzemeltetője a személyes adataidat semmilyen célból nem másolja és harmadik félnek nem továbbítja.\nEzeket így az eKRÉTA Informatikai Zrt. kezeli, az ő tájékoztatójukat ITT ->> https://tudasbazis.ekreta.hu/pages/viewpage.action?pageId=4065038 <<- találod:\nEzok törlésével vagy módosítával kapcsolatban keresd az osztályfőnöködet vagy az iskolád rendszergazdáját.\nA Chalkbot a bejelentkezési adatokat a szervergépen titkosítottan tárolja. Ha ezeket törölni szeretnéd, a /kreta unregister parancssal teheted meg.\nAz alkalmazás a szervergépen névtelen, alapszintű használati statisztikákat gyűjt.\nHa az adataiddal kapcsolatban bármilyen kérdésed van (törlés, módosítás, adathordozás), keress fel engem discordon: davidfegyver#8572 ```\n**Az alkalmazás használatával jelzed, hogy ezt a tájékoztatót tudomásul vetted.**\nUtolsó módosítás: 2021. 05. 14. \n Folytatod? Ha igen akkor írd be  **/kreta regisztralok [suli] [felhasznaloiAzonosito] [jelszo]** parancsot.\n Az iskolád azonosítóját a /kreta keres parancssal keresheted meg");
    message.channel.send(registerEmbed);
}