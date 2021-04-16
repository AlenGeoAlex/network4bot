const Discord = require('discord.js');
const channel = require('../Config/channel.json')
module.exports = async(client) => {
    const ticketmsgchn = client.channels.cache.get(channel.txtsupportchn);
    const tEmbed = new Discord.MessageEmbed()
    .setTitle('KGO Network Support')
    .setColor('RANDOM')
    //.setFooter()
    .setTimestamp()
    .setDescription('React with the emoji \`📧\` below to open up the ticket.\nYou can only create 1 ticket at a time.')
    let message = await ticketmsgchn.send(tEmbed).then(tMessage =>{
      tMessage.react('📧')

  })
  client.on("messageReactionAdd", async (reaction, user) => {
    if (user.partial) await user.fetch();
    if (reaction.message.partial) await reaction.message.fetch(); 
     if (reaction.partial) await reaction.fetch();
     if (user.bot) return;

     if (reaction.emoji.name === "📧") {
        if (user.bot) return;
        let aplyemojireaction1 = user.id;
        let aplyemojiremove1 =await reaction.message.guild.members.cache.get(user.id)
        await reaction.users.remove(aplyemojiremove1);
        if(reaction.message.channel.id === channel.txtsupportchn){
            const McEmbed = new Discord.MessageEmbed()
            .setTitle('**__Alert__**')
            .setColor('RANDOM')
            .setDescription(`**Hey ${user.username},** \n\n *Please Note That The Following Ticket Will Be Only Used To Clarify Issues Related KGO Network*`)
            .setTimestamp()
            reaction.message.channel.send(McEmbed).then(msg => {
              msg.delete({ timeout:5000 })
            }).catch(console.error);
            require('../Ticket/createchannel')(client, reaction, user)
         }
     }
  })



  

}