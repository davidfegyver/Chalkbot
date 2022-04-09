const Discord = require("discord.js");
const superagent = require("superagent");
exports.run = async (client, message, args) => {
  const { body } = await superagent
    .get("https://hu.wikipedia.org/w/api.php")
    .query({
      action: "query",
      prop: "extracts",
      format: "json",
      titles: args.join(" "),
      exintro: "",
      explaintext: "",
      redirects: "",
      formatversion: 2,
    });

  if (body.query.pages[0].missing)
    return message.channel.send("Nincs Találat.");
  const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle(body.query.pages[0].title)
    .setAuthor("Wikipedia")
    .setDescription(
      body.query.pages[0].extract.substr(0, 2000).replace(/[\n]/g, "\n\n")
    );
  return message.channel.send(embed);
};
