const { prefix } = require("../settings.json");
exports.run = (client, message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  let command = message.content.split(" ")[0].slice(prefix.length);
  let args = message.content.split(" ").slice(1);

  try {
    if (command == "kreta") {
      let kretaCommand = args[0];
      let kretaArgs = args.slice(1);

      if (!client.kretacommands.has(kretaCommand))
        return client.kretacommands.get("help").run(client, message, kretaArgs);
      client.kretacommands.get(kretaCommand).run(client, message, kretaArgs);
    }

    if (client.commands.has(command))
      client.commands.get(command).run(client, message, args);
  } catch (error) {
    client.logger.error(error);
  }
};
