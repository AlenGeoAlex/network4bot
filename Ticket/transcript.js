const Discord = require('discord.js');
const channels = require('../Config/channel.json')
const role = require('../Config/roles.json');
const options = require('../Config/data.json');
var paste = require("better-pastebin");
module.exports = async(client, chn) => {
    paste.setDevKey(options.pasteAPI)
    var PasteURL;
    let channel = client.channels.cache.get(chn);
    let supportchn = client.channels.cache.get(channels.txtlog)
    channel.messages.fetch({limit:100})
    .then(function(messages) {
        let content = messages.map(message => message.content && message.content).join("\n");
        paste.login(options.pasteUsername, options.pastePassword, function(success, data) {
            if(!success) {
                console.log("Failed (" + data + ")");
                return false;
            }
         
            paste.create({
                contents: content,
                name: chn,
                privacy: "1",
                expiry: "1H"
            }, function(success, data) {
                if(success) {
                    const PasteEmbed = new Discord.MessageEmbed()
                    .setAuthor('Autobot')
                    .setColor('RANDOM')
                    .setDescription(`You Can View Your Transcript For The Channel ${channel.id}[Here](${data})`)
                    .setFooter('This Link Will Be Valid Only For 24 Hours')
                    channel.send(PasteEmbed);
                    supportchn.send(PasteEmbed)
                } else {
                    console.log(data)
                }
            });
        });
        const TransEmbed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setAuthor('AUTOBOT')
        .setDescription('**A Transcript Of Your Message Will Be Posted Here...**\n**Alternatively A Paste Bin Will Also Be Provided Which Will Be Valid For 24 Hours**')
        .setFooter('According To API\'s Limitation, Last 100 Messagse Will Be Only Included')
      channel.send(TransEmbed);  
      channel.send({ files: [{ name: `${channel.id}.txt`, attachment: Buffer.from(content) }] });  
      supportchn.send({ files: [{ name: `${channel.id}.txt`, attachment: Buffer.from(content) }] }); 
    })
}