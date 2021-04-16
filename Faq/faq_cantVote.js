const Discord = require('discord.js');
const channel = require('../Config/channel.json')
const role = require('../Config/roles.json');
const options = require('../Config/data.json');
const db = require('../Server/mysql');
//-----------------------------------------------------
module.exports = async(client, message) => {
    const faq2Embed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setDescription('**There Are Multiple Reason That You Can\'t Vote**')
    .addField('**Check Up Your Internet Connection**',"**Try Switching Your ISP To Another One And Try Again.**")
    .addField('**Change Your Browser**',"**Issue Might Be With Your Browser Too...Try Another Browser Or Another Device Like A Smart Phone.**")
    .addField('**Captcha Error**',"**If You Can't Complete The Captcha..Either Request For Another Captcha Or Reload The Page And Try Again.**")
    .setFooter('If Your Issue Is Still Not Solved Open Up A Ticket.')
    message.channel.send(faq2Embed)
}