/*
{
  "token": "",
  "prefix": "%",

  "b_id": "",
  "b_key": ""
}
*/

const config = require("../botconfig/config.json");
const fetch = require("node-fetch");
const { MessageAttachment } = require("discord.js");
//npm i colors
module.exports = client => {
  console.log(" :: LOADED CHATFEATURE.JS ".bgGreen)
  /** @INFO NO PUBLIC VERSION
  */
  /*
    let channels = [
      "814525315367698445"
    ]

    client.on("message", message => {
      if(message.author.bot) return;
      if(channels.includes(message.channel.id)){
        if(message.attachments.size > 0)
          return message.reply("Look at this too...", { files: ["./I_CANNOT_READ_FILES.png"]})
        fetch(`http://api.brainshop.ai/get?bid=${config.b_id}&key=${config.b_key}&uid=1&msg=${encodeURIComponent(message)}`).
          then(res => res.json())
          .then(data => {
          message.channel.send(data.cnt).catch(e=>console.log("ERROR | " + e.stack))
        })
      }
    })
  */
  /* HOW DOES FOR LOOP IN AND OF DIFFERNCE LOOK LIKE
    const array = ["one", "two", "three"]
    for(const item in array){
      console.log(item) //--> 0, 1, 2
    }
    for(const item of array){
      console.log(item) //--> one, two, three
    }
  */
  /** @INFO - PUBLIC VERSION
  */
  client.on("message", message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm"){
      if(message.attachments.size > 0)
        return message.reply("Look at this too...", { files: ["./I_CANNOT_READ_FILES.png"]})

      fetch(`http://api.brainshop.ai/get?bid=${config.b_id}&key=${config.b_key}&uid=1&msg=${encodeURIComponent(message)}`).
        then(res => res.json())
        .then(data => {
        message.channel.send(data.cnt).catch(e=>console.log("ERROR | " + e.stack))
        client.stats.inc("global", "messages")
      })
      return;
    }
    if(client.chatbot.get(message.guild.id, "channels").includes(message.channel.id)){
      if(message.attachments.size > 0)
        return message.reply("Look at this too...", { files: ["./I_CANNOT_READ_FILES.png"]})

      fetch(`http://api.brainshop.ai/get?bid=${config.b_id}&key=${config.b_key}&uid=1&msg=${encodeURIComponent(message)}`).
        then(res => res.json())
        .then(data => {
        message.channel.send(data.cnt).catch(e=>console.log("ERROR | " + e.stack))
        client.stats.inc(message.guild.id, "messages")
        client.stats.inc("global", "messages")
      })
    }
  })
  client.on("channelDelete", channel => {
    try{
      client.chatbot.remove(channel.guild.id, channel.id, "channels")
    }catch { }
  })
  client.on("guildRemove", guild => {
    try{
      let channels = guild.channels.cache.map(ch => ch.id)
      for(const chid of channels){
        if(client.chatbot.get(message.guild.id).includes(channel.id))
          client.chatbot.remove(message.guild.id, chid, "channels")
      }
    }catch{ }
  })
}
