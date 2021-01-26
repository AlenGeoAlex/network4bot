const discord = require('discord.js');
const options = require('../Config/data.json');
const roles = require('../Config/roles.json')
const channel = require('../Config/channel.json')
//---------------------------------------------------------------------------------------------
module.exports = {
    name: "patch",
    usage:"!patch",
    description: "Enable Disable Sticky Notes",
    async execute (client, message, args) {
        message.delete();
        if(message.member.roles.cache.find(r => r.id === roles.admin) || message.member.roles.cache.find(r => r.id === roles.superadmin) || message.member.roles.cache.find(r => r.id === roles.official)){
            let MSG = message.content.split(`${options.prefix}patch `).join("");
      if (!args[0])
        return message.channel.send('**Your Message Is Too Short To Send** \n\n**NOTE: This Message Will Be Auto Delete In 300 Sec.** ').then(msg => {
          msg.delete({ timeout:300*1000 })
        }).catch(console.error);
        message.channel.send(`<@&${roles.miner}>`).then(msg => {
            msg.delete({ timeout:2500 })
          }).catch(console.error);
          const patchnoteEmbed = new discord.MessageEmbed()
          .setTitle(`**PATCH NOTES**`)
          .setColor('RANDOM')
          .setDescription(`\`\`\`${MSG}\n\`\`\``)
          .setTimestamp()
          .setFooter(`KGO NETWORK`)
          message.channel.send(patchnoteEmbed)
       }
}
}