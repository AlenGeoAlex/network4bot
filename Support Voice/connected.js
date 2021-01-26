const Discord = require('discord.js');
const channel = require('../Config/channel.json')
const role = require('../Config/roles.json');
const options = require('../Config/data.json');
const db = require('../Server/mysql');
//-----------------------------------------------------
module.exports = async(client,oldVoiceState, newVoiceState) => {
    if(newVoiceState.channelID == channel.vcsupport) {
        var LogChannel = await client.channels.cache.get(channel.txtlog);
        const VoiceLogEmbed = new Discord.MessageEmbed()
        .setTitle('**Support Mod**')
        .setColor('RANDOM')
        .setDescription(`${newVoiceState.member.user.tag} Has Joined The Support Channel *(Voice)*`)
        .setTimestamp()
        LogChannel.send(VoiceLogEmbed)
    }
}