const Discord = require('discord.js');
const channel = require('../Config/channel.json')
const role = require('../Config/roles.json');
const options = require('../Config/data.json');
const db = require('../Server/mysql');
//-----------------------------------------------------
module.exports = async(client, chnid,user) => {
    const ticketchn = client.channels.cache.get(chnid);
    const autoBot = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor('Support Autobot')
    .setDescription("What's This Ticket For:\n\n`1️⃣` **|** General Questions\n`2️⃣` **|** Ban-Appeal\n`3️⃣` **|** Bug Reports\n`4️⃣` **|** Complaints")
    .setFooter("Choosing This Options Helps Us To Work Efficently")
    ticketchn.send(autoBot).then(tMessage =>{
        db(`UPDATE channel SET autobot = '${tMessage.id}' WHERE ChnId = ${chnid}`,function(err, result) {
            if (err) throw err;
        });
         tMessage.react('1️⃣')
         tMessage.react('2️⃣')
         tMessage.react('3️⃣')
         tMessage.react('4️⃣')

    })

    client.on("messageReactionAdd", async (reaction, user) => {
        if (reaction.message.partial) await reaction.message.fetch(); 
         if (reaction.partial) await reaction.fetch();
         if (user.bot) return;


         if(reaction.emoji.name === "1️⃣"){
            if (user.bot) return;
            let aplyemojireaction1 = user.id;
            let aplyemojiremove1 =await reaction.message.guild.members.cache.get(user.id)
            await reaction.users.remove(aplyemojiremove1);
            db('SELECT * FROM channel WHERE ChnId = ?', chnid, function(err, result) {
                if(reaction.message.id == result[0].autobot){
                    if(user.id == result[0].UserId)
                    generalQue(chnid)
                }else return;
            })
         }
         if(reaction.emoji.name === "2️⃣"){
            if (user.bot) return;
            let aplyemojireaction1 = user.id;
            let aplyemojiremove1 =await reaction.message.guild.members.cache.get(user.id)
            await reaction.users.remove(aplyemojiremove1);
            db('SELECT * FROM channel WHERE ChnId = ?', chnid, function(err, result) {
                if(reaction.message.id == result[0].autobot){
                    if(user.id == result[0].UserId)
                    banAppeal(chnid)
                }else return;
            })
         }
         if(reaction.emoji.name === "3️⃣"){
            if (user.bot) return;
            let aplyemojireaction1 = user.id;
            let aplyemojiremove1 =await reaction.message.guild.members.cache.get(user.id)
            await reaction.users.remove(aplyemojiremove1);
            db('SELECT * FROM channel WHERE ChnId = ?', chnid, function(err, result) {
                if(reaction.message.id == result[0].autobot){
                    if(user.id == result[0].UserId)
                    bgReport(chnid)
                }else return;
            })
         }
         if(reaction.emoji.name === "4️⃣"){
            if (user.bot) return;
            let aplyemojireaction1 = user.id;
            let aplyemojiremove1 =await reaction.message.guild.members.cache.get(user.id)
            await reaction.users.remove(aplyemojiremove1);
            db('SELECT * FROM channel WHERE ChnId = ?', chnid, function(err, result) {
                if(reaction.message.id == result[0].autobot){
                    if(user.id == result[0].UserId)
                    complaints(chnid)
                }else return;
            })
         }                          
        })  

        async function generalQue(chnid){
            let ticketchn = client.channels.cache.get(chnid);
            ticketchn.setName(`GQ┃${user.username}`);
            const gqEmbed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor("Autobot")
            .setDescription('**Your Ticket Channel Has Been Optimized Into General Questionnaire.**')
            .setFooter('Continue Your Query Here..')
            ticketchn.send(gqEmbed);
            delMsg(chnid)
        }

        async function banAppeal(chnid){
            let ticketchn = client.channels.cache.get(chnid);
            let adminchn = client.channels.cache.get(channel.txtadminsnote)
            ticketchn.setName(`BA┃${user.username}`);
            const baEmbed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor("Autobot")
            .setDescription('**Your Ticket Channel Has Been Changed To Ban Appeal And Superadmins Have Been Notified**')
            .setFooter('Continue Your Query Here..')
            ticketchn.send(baEmbed);
            delMsg(chnid)
        }

        async function bgReport(chnid){
            let ticketchn = client.channels.cache.get(chnid);
            ticketchn.setName(`BR┃${user.username}`);
            const bgEmbed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor("Autobot")
            .setDescription('**Your Ticket Channel Has Been Converted To Inform Bugs**')
            .setFooter('Continue Your Query Here..')
            ticketchn.send(bgEmbed);
            delMsg(chnid)
        }

        async function complaints(chnid){
            let ticketchn = client.channels.cache.get(chnid);
            ticketchn.setName(`CMP┃${user.username}`);
            const cmpEmbed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor("Autobot")
            .setDescription('**Your Can Now Raise Your Complaints Here**')
            .setFooter('Continue Your Query Here..')
            ticketchn.send(cmpEmbed);
            delMsg(chnid) 
        }

        async function delMsg(chnid){
            let delChn = client.channels.cache.get(chnid);
            db('SELECT * FROM channel WHERE ChnId = ?', chnid, function(err, result) {
            delChn.messages.fetch(result[0].autobot).then(async msg => {
                msg.delete()
            })
        });
        }
}