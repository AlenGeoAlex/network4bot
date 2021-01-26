const Discord = require('discord.js');
const channel = require('../Config/channel.json')
const role = require('../Config/roles.json');
const options = require('../Config/data.json');
const db = require('../Server/mysql');
const sendsuptmsg = require('../Ticket/sendsuptmsg');
module.exports = async(client, reaction, user) => {
    
    checkchm(user, async function(result1, result2){
    if(result2 === false){
    var server = reaction.message.guild;
    let category = server.channels.cache.find(c => c.name == "───────«Support»───────" && c.type == "category")
    server.channels.create(`support-${user.username}`).then(channel => {
    if (!category) throw new Error("Category channel does not exist");
    channel.setParent(category.id);
    db(`INSERT INTO channel (SerId,ChnId,UserId) values (${reaction.message.guild.id}, ${channel.id}, ${user.id})`, function (err, result, fields) {
        if (err) throw err;
      });
      setTimeout(changePerm.bind(null,client, user,channel.id, server), 500)
      setTimeout(sendFirstMsg.bind(null, client, user, channel.id), 1000)
  }).catch(console.error);


}
else
{
    const tktopenchn = client.channels.cache.get(result1);
    const openChnEmbed = new Discord.MessageEmbed()
    .setTitle('***Hey There***')
    .setDescription(`**${user.username}, You Have An Open Ticket Ask An Admin To Close It Or Continue The Issue Here**`)
    .setColor('RANDOM')
    .setTimestamp()
    tktopenchn.send(`<@${user.id}>`).then(msg => {
        msg.delete({ timeout:500 })
      }).catch(console.error);
    tktopenchn.send(openChnEmbed)
}
})
async function checkchm(data, callback) {
    db('SELECT ChnId FROM channel WHERE UserId = ?', data.id, function(err, result) {
        if(!result.length){
            callback(null , false)
        }   else{
            callback(result[0].ChnId, true);
        }
    })
}

async function changePerm(client, data, permchn, guild){
    const chn = client.channels.cache.get(permchn)
    chn.overwritePermissions([
        {
            id: guild.id,
            deny: ['VIEW_CHANNEL']
        },
        {
            id: user.id,
            allow: ['VIEW_CHANNEL', 'ATTACH_FILES','EMBED_LINKS']
        },
        {
            id: role.support,
            allow: ['VIEW_CHANNEL']
        },
      ], 'Private Ticket');
}


async function sendFirstMsg(client, data, chnid){
    const ticketchn = client.channels.cache.get(chnid);
    ticketchn.send(`${data.username}, <@&${role.mod}>, <@&${role.admin}`).then(msg => {
        msg.delete({ timeout:1000 })
      }).catch(console.error);
    const firstMssg = new Discord.MessageEmbed()
    .setTitle('**KGO World**')
    .setColor('RANDOM')
    .setTimestamp()
    .setDescription(`**Hey ${data.username}, Admins Are Not Available Right Now..! ,Meanwhile Take Your Time And Explain The Issue..**\n\nNote: If One Didn't Respond With 24 Hour The Ticket Will Be Closed.\n\n\`🚩\` **Claims The Ticket**\n\`✅\` **Close The Ticket**\n\`🔔\` **Ping A Developer**\n\`🔴\` **Ping A Superadmin**`)
    ticketchn.send(firstMssg).then(tMessage =>{
        tMessage.react('🚩')
        tMessage.react('✅')
        tMessage.react('🔔')
        tMessage.react('🔴')
  
    })
    client.on("messageReactionAdd", async (reaction, user) => {
      if (reaction.message.partial) await reaction.message.fetch(); 
       if (reaction.partial) await reaction.fetch();
       if (user.bot) return;
  
       if (reaction.emoji.name === "🚩") {
          if (user.bot) return;
          let aplyemojireaction1 = user.id;
          let aplyemojiremove1 =await reaction.message.guild.members.cache.get(user.id)
          await reaction.users.remove(aplyemojiremove1);
          if(reaction.message.channel.id === chnid){
            if(aplyemojiremove1.roles.cache.find(r => r.id === role.support)){   
                db('SELECT * FROM channel WHERE UserId = ?', data.id, function(err, result) {
                    if(result[0].isclaimed === 0){
                        claimtkt(client, user, chnid, data )
                    }   
                    else{
                        if(user.id === result[0].claimedby){
                            unclaimtkt(client, user, chnid, data )
                        }
                    }
                })
            }
            }
       }
       if(reaction.emoji.name === "🔔"){
        if (user.bot) return;
        let aplyemojireaction1 = user.id;
        let aplyemojiremove1 =await reaction.message.guild.members.cache.get(user.id)
        await reaction.users.remove(aplyemojiremove1);
        if(reaction.message.channel.id === chnid){
            if(aplyemojiremove1.roles.cache.find(r => r.id === role.support)){
                ticketchn.send(`<@&${role.developer}>, <@${options.bewin}>, <@${options.Alen}`).then(msg => {
                    msg.delete({ timeout:1000 })
                    }).catch(console.error);
                const pingDevEmbed = new Discord.MessageEmbed()
                .setTitle(`**__Ping__ !!**`)
                .setColor('RANDOM')
                .setAuthor(`${user.username}`)
                .setDescription(`<@&${role.developer}>, <@${options.bewin}>, <@${options.Alen}, **You Have Been Needed In Assistance.**`)
                .setTimestamp()
                ticketchn.send(pingDevEmbed)
            }

         }
       }
       if(reaction.emoji.name === "🔴"){
        if (user.bot) return;
        let aplyemojireaction1 = user.id;
        let aplyemojiremove1 =await reaction.message.guild.members.cache.get(user.id)
        await reaction.users.remove(aplyemojiremove1);
        if(reaction.message.channel.id === chnid){
            if(aplyemojiremove1.roles.cache.find(r => r.id === role.support)){
                ticketchn.send(`<@&${role.superadmin}>`).then(msg => {
                    msg.delete({ timeout:1000 })
                    }).catch(console.error);
                const pingDevEmbed = new Discord.MessageEmbed()
                .setTitle(`**__Ping__ !!**`)
                .setColor('RANDOM')
                .setAuthor(`${user.username}`)
                .setDescription(`<@&${role.superadmin}>, **You Have Been Needed In Assistance.**`)
                .setTimestamp()
                ticketchn.send(pingDevEmbed)
            }

         }
       }
       if (reaction.emoji.name === "✅") {
        if (user.bot) return;
        let aplyemojireaction1 = user.id;
        let aplyemojiremove1 =await reaction.message.guild.members.cache.get(user.id)
        await reaction.users.remove(aplyemojiremove1);
        if(reaction.message.channel.id === chnid){
            if(aplyemojiremove1.roles.cache.find(r => r.id === role.support)){
                closeticket(client, user, chnid, data)
            }
         }
     }
    })
}
async function claimtkt(client, user, chnid, data)
{
    const ticketchn = client.channels.cache.get(chnid);
db(`UPDATE channel SET claimedby = ${user.id}, isclaimed = 1 WHERE ChnId = ${chnid}`, function (err, result, fields) {
    if (err) throw err;
    });
const ClaimEmbed = new Discord.MessageEmbed()
.setTitle('**__Is Claimed__**')
.setColor('RANDOM')
.setTimestamp()
.setDescription(`*An Admin (${user.username}) Is Now Ready To Help You..*\nThis Ticket Is Now Claimed.`)
ticketchn.send(ClaimEmbed)
}

async function unclaimtkt(client, user, chnid, data)
{
    const ticketchn = client.channels.cache.get(chnid);
    db(`UPDATE channel SET claimedby = NULL, isclaimed = 0 WHERE ChnId = ${chnid}`, function (err, result, fields) {
        if (err) throw err;
        });
        const UnClaimEmbed = new Discord.MessageEmbed()
        .setTitle('**__Now Unclaimed__**')
        .setColor('RANDOM')
        .setTimestamp()
        .setDescription('**This Ticket Is Now Unclaimed**')
        ticketchn.send(UnClaimEmbed)
}
async function closeticket(client, user, chnid, data)
{   
    const ticketchn = client.channels.cache.get(chnid);
    const closeEmbed = new Discord.MessageEmbed()
    .setTitle('**__ALERT__**')
    .setColor('RANDOM')
    .setDescription('**This ticket will be closed in 5 Mins..**\n\n*If you feel that your concern is not solved react below*')
    .setTimestamp()
    ticketchn.send(closeEmbed).then(tMessage =>{
        tMessage.react('⭕')
    })
    client.on("messageReactionAdd", async (reaction, user) => {
      if (reaction.message.partial) await reaction.message.fetch(); 
       if (reaction.partial) await reaction.fetch();
       if (user.bot) return;
  
       if (reaction.emoji.name === "⭕") {
          if (user.bot) return;
          let aplyemojireaction1 = user.id;
          let aplyemojiremove1 =await reaction.message.guild.members.cache.get(user.id)
          await reaction.users.remove(aplyemojiremove1);
          if(reaction.message.channel.id === chnid){
            clearTimeout(myVar);
          }
       }
    })
    myVar = setTimeout(function(){
        const ticketchn = client.channels.cache.get(chnid);
        ticketchn.delete()
        db(`DELETE FROM channel WHERE ChnId = ${chnid}`, function (err, result, fields) {
            if (err) throw err;
            });
    }, 300*1000);    
}


    }

