const discord = require('discord.js');
const options = require('../Config/data.json');
const roles = require('../Config/roles.json')
const channel = require('../Config/channel.json')
//---------------------------------------------------------------------------------------------
module.exports = {
    name: "say",
    usage:"!say",
    description: "Enable Disable Sticky Notes",
    async execute (client, message, args) {
        message.delete();
        if(message.member.roles.cache.find(r => r.id === roles.admin) || message.member.roles.cache.find(r => r.id === roles.superadmin) || message.member.roles.cache.find(r => r.id === roles.official)|| message.member.roles.cache.find(r => r.id === roles.mod)){
          let MSG = message.content.split(`${options.prefix}say `).join("");
      if (!args[0])
        return message.channel.send('**Your Message Is Too Short To Send** \n\n**NOTE: This Message Will Be Auto Delete In 300 Sec.** ').then(msg => {
          msg.delete({ timeout:300*1000 })
        }).catch(console.error);
        const sayEmbed = new discord.MessageEmbed()
        .setTitle('__**KGO Network**__')
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter(`Announced By: Network Admins`)
        .setDescription(`**${MSG}**`);
        message.channel.send(sayEmbed)
        }
    }
}
