const discord = require('discord.js');
const options = require('../Config/data.json');
const roles = require('../Config/roles.json')
const db = require('../Server/mysql')
const editJsonFile = require("edit-json-file");
const Data = require('../Data/stickydata.json')
//---------------------------------------------------------------------------------------------
module.exports = {
    name: "sticky",
    usage:"!sticky on/off",
    description: "Enable Disable Sticky Notes",
    async execute (client, message, args) {
        message.delete();
        let file = editJsonFile(`${Data}`, {
            autosave: true
        });
        if(message.member.roles.cache.find(r => r.id === roles.admin) || message.member.roles.cache.find(r => r.id === roles.superadmin) || message.member.roles.cache.find(r => r.id === roles.official)||message.member.roles.cache.find(r => r.id === roles.mod)){
            if(!args[0]){
                const imCoUsageEmbed = new discord.MessageEmbed()
                .setColor('RANDOM')
                .setDescription('**Incorrect Usage\n\n** **__Command__**: **/sticky on/off**')
                .setTimestamp()
                message.channel.send(imCoUsageEmbed).then(msg => {
                    msg.delete({ timeout:30*1000 })
                  }).catch(console.error);  
                  return;
                }
            
            if(args[0]){
                var casechk = args[0].toUpperCase()
                switch(String(casechk)){
                    
                    case "ON":
                        {
                            checkchm(message.channel.id, async function(cb){
                                if(cb){
                                    const alreadyExostEmbed = new discord.MessageEmbed()
                                    .setColor('RANDOM')
                                    .setDescription(`**__Already Exist__**\n\n**A Sticky Note Is Already Active On This Channel..!!**`)
                                    message.channel.send(alreadyExostEmbed).then(msg => {
                                        msg.delete({ timeout:10000 })
                                      }).catch(console.error);
                                }else if(!cb){
                                    const askSticky = new discord.MessageEmbed()
                                    .setColor('RANDOM')
                                    .setDescription('**__Anything To Stick__**\n\n**Type Down Below What You Want To Stick Out On This Channel**\n\n**NOTE:** *This Message Will Be Timed Out In 30Sec*')
                                    message.channel.send(askSticky)
                                    message.channel.awaitMessages(m => m.author.id == message.author.id,
                                        {max: 1, time: 30000}).then(collected => {
                                      const response = collected.first();
                                      if(!response) {message.channel.send(`**Timed*Out**`).then(msg => {
                                        msg.delete({ timeout:5000 })
                                      }).catch(console.error);
                                    return;
                                    }
                                      var stickynotemsg = response.content
                                      message.channel.bulkDelete(2)
                                      file.set(message.channel.id, stickynotemsg)
                                      message.channel.send(`**Sticky Notes Activated**`).then(msg => {
                                        msg.delete({ timeout:10000 })
                                      }).catch(console.error);
                                        })

                                }
                            })
                        }
                    case "OFF":
                        checkchm(message.channel.id, async function(cb2){
                            if(!cb2){
                                const nothingstickyEmbed = new discord.MessageEmbed()
                                .setColor('RANDOM')
                                .setDescription('**__Nothing To Stick__**\n\n**This Channel Does Not Have A Sticky Note Linked With**')
                                message.channel.send(nothingstickyEmbed).then(msg => {
                                    msg.delete({ timeout:10000 })
                                  }).catch(console.error);
                            }else if(cb2){
                                file.unset(message.channel.id)
                                const deletedSticky = new discord.MessageEmbed()
                                .setColor('RANDOM')
                                .setDescription('**__Deleted Sticky__**\n\n**Removed Sticky Notes Linked With The Channel**')
                                message.channel.send(deletedSticky).then(msg => {
                                    msg.delete({ timeout:10000 })
                                  }).catch(console.error);
                            }
                        })
                        break;
                    case "LIST":
                        require('../Sticky/list')(client, message)
                        break;
                    case "REMOVE":
                        checkchm(message.channel.id, async function(cb2){
                            if(!cb2){
                                const nothingstickyEmbed = new discord.MessageEmbed()
                                .setColor('RANDOM')
                                .setDescription('**__Nothing To Stick__**\n\n**This Channel Does Not Have A Sticky Note Linked With**')
                                message.channel.send(nothingstickyEmbed).then(msg => {
                                    msg.delete({ timeout:10000 })
                                  }).catch(console.error);
                            }else if(cb2){
                                file.unset(message.channel.id)
                                const deletedSticky = new discord.MessageEmbed()
                                .setColor('RANDOM')
                                .setDescription('**__Deleted Sticky__**\n\n**Removed Sticky Notes Linked With The Channel**')
                                message.channel.send(deletedSticky).then(msg => {
                                    msg.delete({ timeout:10000 })
                                  }).catch(console.error);
                            }
                        })
                        break;
                    default:
                        const defaultEmbed = new discord.MessageEmbed()
                        .setColor('RANDOM')
                        .setDescription('**Incorrect Usage\n\n** **__Command__**: **/sticky on/off**')
                        .setTimestamp()
                        message.channel.send(defaultEmbed).then(msg => {
                            msg.delete({ timeout:30*1000 })
                          }).catch(console.error);  
                }
            }
        }
        async function checkchm(chnid, callback) {
            var chkflg = file.get(chnid);
            if (!chkflg){
                callback(false);
            }
            else{
                callback(true);
            }
        
    }
    
    }
}