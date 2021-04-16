const discord = require('discord.js');
const options = require('../Config/data.json');
const roles = require('../Config/roles.json')
const channel = require('../Config/channel.json')
//---------------------------------------------------------------------------------------------
module.exports = {
    name: "faq",
    usage:"!faq",
    description: "Enable Disable Sticky Notes",
    async execute (client, message, args) {
        var cntrlString;
        if(message.member.roles.cache.find(r => r.id === roles.admin) || message.member.roles.cache.find(r => r.id === roles.superadmin) || message.member.roles.cache.find(r => r.id === roles.official)|| message.member.roles.cache.find(r => r.id === roles.mod)){
            if(args.length == 0){
                const faqEmbed = new discord.MessageEmbed()
                .setColor('RANDOM')
                .setAuthor('Autobot')
                .setDescription('**Either Use !faq <name> Or !faq <no> To Display Possible Suggestion**-')
                .addField('0. Ingame Name [IGN]','Ask A Player His Ingame Name')
                .addField('1. Can\'t Vote [cantvote]','If A Player Can\'t Vote On A Specific Site')
                .addField('2. Voted But No Role [votednorole]', 'A Player Voted On All 3 Sites But Didn\'t Get The Role')
                .addField('3. About PE Support [pe]',"What About PE Players")
                .setFooter('Anyone With The Role Moderator Can Use This On Any Channels In The Network')
                message.channel.send(faqEmbed)
            }else if(args.length == 1){
                if(isNaN(args[0])){
                    cntrlString = args[0].toUpperCase();
                }else{
                    cntrlString = args[0];
                }
                switch(cntrlString){
                    case "0":
                    case "IGN":
                        require('../Faq/faq_IGN')(client,message)
                    break;
                    case "1":
                    case "CANTVOTE":
                        require('../Faq/faq_cantVote')(client,message)
                    break;
                    case "2":
                    case "VOTEDNOROLE":
                        require('../Faq/faq_votednorole')(client,message)
                    break;
                    case "3":
                    case "PE":
                        require('../Faq/faq_Pe')(client,message)
                    break;
                    default:
                }
            }
        }
        else return;
    }
}