const Discord = require('discord.js');
const channel = require('../Config/channel.json')
const role = require('../Config/roles.json');
const options = require('../Config/data.json');
const db = require('../Server/mysql');
//-----------------------------------------------------
module.exports = async(client, message, friend) => {
        var tried = false;
        var welcome = client.channels.cache.get(channel.txtwelcome);
        let invite = await welcome.createInvite(
            {
              maxAge: 10 * 60 * 1000, // maximum time for the invite, in milliseconds
              maxUses: 1 // maximum times it can be used
            },
            `Requested by ${message.author.tag} For ${friend.username}`
          ).catch(console.log);
            
          if(invite){
              try{
                const invEmbed= new Discord.MessageEmbed()
                .setTitle('Invite For Friend')
                .setColor('RANDOM')
                .setDescription(`Hey ${friend.username},\n\nHere Is Your Requested Invite Link. This Invite Link Will Be Valid For 24 Hrs And Have A Life Of 1 User Invite\n\n**KGO Network:** ${invite}\n**Kerala Gamers Official:** https://discord.gg/C39E2YZJaF`)
                .setTimestamp()
                friend.send(invEmbed);

              }catch(err){
                  message.channel.send(`**We Have Tried To Send You An Invite To Your Friend, But Due To His Privacy Policy It Can't Be Done. We Will Provide You Your Invite Link Here And It Will Be Automatically Deleted In 120 Sec**`).then(msg => {
                    msg.delete({ timeout:120*1000 })
                  }).catch(console.error);
                const finInvEmbed = new Discord.MessageEmbed()
                .setTitle('Invite For Friend#No DM')
                .setColor('RANDOM')
                .setDescription(`Hey ${friend.username},\n\nHere Is A Requested Invite Link. This Invite Link Will Be Valid For 24 Hrs And Have A Life Of 1 User Invite\n\n**KGO Network:** ${invite}\n**Kerala Gamers Official:** https://discord.gg/C39E2YZJaF`)
                .setTimestamp();
                message.channel.send(finInvEmbed).then(msg => {
                    msg.delete({ timeout:120*1000 })
                  }).catch(console.error);
              }

            }

    
}