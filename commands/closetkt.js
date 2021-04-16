const discord = require('discord.js');
const options = require('../Config/data.json');
const roles = require('../Config/roles.json')
const channel = require('../Config/channel.json')
//---------------------------------------------------------------------------------------------
module.exports = {
    name: "closetkt",
    usage:"!closetkt",
    description: "Enable Disable Sticky Notes",
    async execute (client, message, args) {
        console.log(message.channel)
        if(message.channel.parentID == '797069808054304798'){
            const closeEmbed = new Discord.MessageEmbed()
            .setTitle('**__ALERT__**')
            .setColor('RANDOM')
            .setDescription('**This ticket will be closed in 30 Sec..**\n\n*If you feel that your concern is not solved react below*')
            .setTimestamp()
            require('../Ticket/transcript')(client,message.channel.id)
            message.channel.send(closeEmbed).then(tMessage =>{
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
                message.channel.delete()
            }, 30*1000);    
        }
        }
    }