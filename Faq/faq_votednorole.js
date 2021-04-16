const Discord = require('discord.js');
const channel = require('../Config/channel.json')
const role = require('../Config/roles.json');
const options = require('../Config/data.json');
const db = require('../Server/mysql');
//-----------------------------------------------------
module.exports = async(client, message) => {
    const faq3Embed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setDescription("**Your Website Says You Are Voted, But Still Doesn't Got The Role. Check Out The Below Suggestions**")
    .addField('**Voted Between**',"**You Must Vote On All The Three Sites With In An Hour Or Else The Vote Will Be Wiped From The Server Cache.\nIf That's The Issue, Open Up A Ticket On **<#"+channel.txtsupportchn+">.")
    .addField('**Incorrect Username**',`**Check <#${channel.txtvoterlog}> And Confirm That You Have Voted On The Same Name As Of Your Ingame Name, If Not\nOpen Up A Ticket On <#${channel.txtsupportchn}>.**`)
    .addField('**Voted Before 24Hrs**',"**If You Have Voted Before You Loose The Voter Role\nOpen Up A Ticket On <#"+channel.txtsupportchn+'>.**')
    message.channel.send(faq3Embed)
}