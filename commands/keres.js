const table = require("table");
const { noSuchSchoolEmbed, badSearchUsageEmbed } = require("../utils/embeds");
const schoolJson = require("../school-list.json");
exports.run = (client, message, args) => {
  if (!args) return message.channel.send(badSearchUsageEmbed);

  const school = args.join(" ").toLowerCase();
  results = [];
  for (let i = 0; i < schoolJson.length; i++) {
    if (
      schoolJson[i].name.toLowerCase().includes(school) ||
      schoolJson[i].instituteCode.toLowerCase().includes(school)
    ) {
      results.push(schoolJson[i]);
    }
  }
  if (!results.length) return message.channel.send(noSuchSchoolEmbed);

  let idk = [];
  for (let x = 0; x < results.length; x++)
    idk[x] = [results[x].name, results[x].instituteCode];
  message.channel.send("```" + table.table(idk) + "```");
};
