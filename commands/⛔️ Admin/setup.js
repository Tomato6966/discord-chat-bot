const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "setup",
    category: "⛔️ Admin",
    aliases: [""],
    cooldown: 2,
    usage: "setup <add/remove> <#channel>",
    description: "Setup Bot Channels (Adding / Removing setups)",
    memberpermissions: ["ADMINISTRATOR"],
    run: async (client, message, args, user, text, prefix) => {
    try{
      if(!args[0])
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`❌ ERROR | You didn't provided a Method`)
            .setDescription(`Usage: \`${prefix}setup <add/remove> <#channel>\``)
        );
      if(args[0].toLowerCase() !== "add" && args[0].toLowerCase() !== "remove" )
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`❌ ERROR | You didn't provided a **valid** Method`)
            .setDescription(`Usage: \`${prefix}setup <add/remove> <#channel>\``)
        );
      if(!args[1])
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`❌ ERROR | You didn't provided a Channel`)
            .setDescription(`Usage: \`${prefix}setup <add/remove> <#channel>\``)
        );
      if(args[1].length !== 18 && !message.mentions.channels.first())
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`❌ ERROR | You didn't provided a **valid** Channel`)
            .setDescription(`Usage: \`${prefix}setup <add/remove> <#channel>\``)
        );
      let channel = message.mentions.channels.first() || client.channels.cache.get(args[1]);
      if(!channel)
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`❌ ERROR | You didn't provided a **valid** Channel`)
            .setDescription(`Usage: \`${prefix}setup <add/remove> <#channel>\``)
        );
      if(args[0].toLowerCase() === "add") {
        if(client.chatbot.get(message.guild.id, "channels").includes(channel.id))
          return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle(`❌ ERROR | Your Channel is already, in the Setup!`)
              .setDescription(`You can remove it by typing: \`${prefix}setup remove <#${channel.id}>\``)
          );
        client.chatbot.push(message.guild.id, channel.id, "channels");
        return message.channel.send(new MessageEmbed()
            .setColor(ee.color)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`✅ SUCCESS | Added \`${channel.name}\` to the Setup!`)
            .setDescription(`You can now chat with me in: <#${channel.id}>`)
        );
      }
      else if(args[0].toLowerCase() === "remove") {
        if(!client.chatbot.get(message.guild.id, "channels").includes(channel.id))
          return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle(`❌ ERROR | Your Channel is NOT in the Setup!`)
              .setDescription(`You can add it by typing: \`${prefix}setup add <#${channel.id}>\``)
          );
        client.chatbot.remove(message.guild.id, channel.id, "channels");
        return message.channel.send(new MessageEmbed()
            .setColor(ee.color)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`✅ SUCCESS | Removed \`${channel.name}\` to the Setup!`)
            .setDescription(`You can no longer chat with me in: <#${channel.id}>`)
        );
      }
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`❌ ERROR | An error occurred`)
            .setDescription(`\`\`\`${e.stack}\`\`\``)
        );
    }
  }
}
/**
  * @INFO
  * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/Discord-Js-Handler-Template
  * @INFO
  * Work for Milrato Development | https://milrato.eu
  * @INFO
  * Please mention Him / Milrato Development, when using this Code!
  * @INFO
*/
