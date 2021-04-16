const discord = require('discord.js');
const options = require('../Config/data.json');
const roles = require('../Config/roles.json')
const channel = require('../Config/channel.json')
//---------------------------------------------------------------------------------------------
module.exports = {
    name: "help",
    usage:"!help",
    description: "Enable Disable Sticky Notes",
    async execute (client, message, args) {
        message.delete();
        if(args.length == 0){
            const firstEmbed = new discord.MessageEmbed()
            .setAuthor('Mr. Manager Jr.')
            .setDescription(`Hey ${message.author.tag},\n\n**I Am Mr. Manager Jr.**\n**A Bot Developed For KGO Network To Assist The User's Who Need Assistance In Both Its Minecraft Server \`KGO Network\` And Its Discord Server.**\n**You Can View My Commands On The Basis Of Its Requirement**\n\n\`👦\`  **|** User Commands\n\`🔧\`  **|** Admin Commands`)
            .setColor('RANDOM')
            .setFooter('React To A Emoji To Proceed Further')
            message.channel.send(firstEmbed).then(msg => {
                msg.react('👦')
                msg.react('🔧')
                msg.delete({ timeout:120*1000 })
            }).catch(console.error);

            client.on("messageReactionAdd", async (reaction, user) => {
                if (reaction.message.partial) await reaction.message.fetch(); 
                if (reaction.partial) await reaction.fetch();
                if (user.bot) return;

                if (reaction.emoji.name === "👦" && user.id == message.author.id) {
                    if (user.bot) return;
                    let aplyemojireaction1 = user.id;
                    let aplyemojiremove1 =await reaction.message.guild.members.cache.get(user.id)
                    await reaction.users.remove(aplyemojiremove1);
                    userHelp(message)
                }

                if (reaction.emoji.name === "🔧" && user.id == message.author.id) {
                    if (user.bot) return;
                    let aplyemojireaction1 = user.id;
                    let aplyemojiremove1 =await reaction.message.guild.members.cache.get(user.id)
                    await reaction.users.remove(aplyemojiremove1);
                    adminHelp(message)
                }
            })
        }else if(args.length ==1){ 
            switch(args[0].toUpperCase()){
                case "USER":
                    userHelp(message)
                break;
                case "ADMIN":
                    adminHelp(message)
                break;
                default:
                    const errEmbed = new discord.MessageEmbed()
                    .setColor('RANDOM')
                    .setDescription(`${args[0]} is an invalid Help Role.Either Use !help user or !help admin`)
                    message.channel.send(errEmbed).then(msg => {
                        msg.delete({ timeout:120*1000 })
                    }).catch(console.error);
            }
        }
        async function userHelp(message){
            const userHelpEmbed = new discord.MessageEmbed()
            .setAuthor('User Help')
            .setColor('RANDOM')
            .setDescription('**This Commands Are For Normal Users And Can Be Executed By Nearly Anyone**')
            .addField('!invite',"**It Create An Invite On Your Name Which Have 24Hrs Duration And Can Be Used 1 Time**")
            .addField('!invite <@user>',"**It Creates And Send An Invite On Your Name Which Have 24Hrs Duration And Can Be Used 1 Time**")
            .addField('!status',"**Check Whether Which All Servers Under KGO Network Are Online**")
            .addField('!server',"**Check The Network Status**")
            .addField('!suggest',"**Have Any Suggestion Which You Like To See In The Server..Shot It Here**")
            .addField('!info',"**A Custom Image Based Info On About The Server**")
            .addField('!rank <name>',"Use !rank To Check Out The Different Ranks And !ranks <name> To Know More About Them.")
            .setFooter('You Can Also Use \'!help user\' To Skip The GUI')
            
            message.channel.send(userHelpEmbed).then(msg => {
                msg.delete({ timeout:120*1000 })
            }).catch(console.error);
        }

        async function adminHelp(message){
                if(message.member.roles.cache.find(r => r.id === roles.admin) || message.member.roles.cache.find(r => r.id === roles.superadmin) || message.member.roles.cache.find(r => r.id === roles.official)|| message.member.roles.cache.find(r => r.id === roles.mod)){
                const adminHelpEmbed = new discord.MessageEmbed()
                .setAuthor('Admin Help')
                .setColor('RANDOM')
                .setDescription('**This Commands Are For Adminstrators**')
                .addField('!ann <announcement>',"**To Announce Anything Particular In The Channel.It Shows Who Made The Announcement**")
                .addField('!say <message>', '**To Say Any Message In Disguise Of Network Admins**')
                .addField('!patch <patchNote>',"**To Announce A Patch Note**")
                .addField('!sticky <on|off|remove>', '**To Add Or Remove Sticky Embed On This Particular Channel**')
                .addField('!poll <poll|suggestion_ID>',"**To Either Create A New Poll Or Create Something Based On An Incomming Suggestion**")
                .addField('!img',"**To Post An Imgur Image Link**")
                .addField('!faq',"**Shows The List Of FAQ's Available**")
                .addField('!faq <name>',"**To Automatically Respond To Commonly Asked Questions**")
                .addField('!closetkt',"**Close An Unopen Ticket**")
                .setFooter('You Can Also Use \'!help admin\' To Skip The GUI')
                message.channel.send(adminHelpEmbed).then(msg => {
                    msg.delete({ timeout:120*1000 })
                }).catch(console.error);
                }
        }
    }


}