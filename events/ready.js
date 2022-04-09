const kretaNotify = require("../utils/kretaNotify");
const { prefix } = require("../settings.json");
exports.run = async (client) => {
  client.logger.info(
    `A bot elindult, ${Object.keys(client.json).length} felhasználóval és ${
      client.guilds.cache.size
    } szerveren.`
  );

  activities_list = [
    "Developer: davidfegyver#8572",
    `${prefix}kreta help`,
    `A C3 versenyére!`,
    `${Object.keys(client.json).length} aktív felhasználó!`,
    `${prefix}kreta notify`,
    `${prefix}kreta jegyek`,
    `${prefix}kreta orarend`,
  ];
  setInterval(() => {
    const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
    client.user.setActivity(activities_list[index]);
  }, 10000);

  setInterval(
    () => kretaNotify(client),

    30 * 60 * 1000
  );
  kretaNotify(client);
};
