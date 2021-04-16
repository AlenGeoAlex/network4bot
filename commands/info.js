const Discord = require('discord.js');
const options = require('../Config/data.json');
const roles = require('../Config/roles.json')
const channel = require('../Config/channel.json')
const Canvas = require('canvas');
const util = require('minecraft-server-util');
//---------------------------------------------------------------------------------------------
module.exports = {
    name: "info",
    usage:"!info",
    description: "Enable Disable Sticky Notes",
    async execute (client, message, args){
        message.delete();
        util.status('kgo.world').then(async (response) => {
const applyText = (canvas, text) => {
	const ctx = canvas.getContext('2d');
	let fontSize = 70;
	do {
		ctx.font = `${fontSize -= 10}px sans-serif`;
	} while (ctx.measureText(text).width > canvas.width - 300);
	return ctx.font;
};
        const canvas = Canvas.createCanvas(796, 74);
        const ctx = canvas.getContext('2d');
        const background = await Canvas.loadImage('https://imgur.com/3MRBvsa.png');
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#74037b';
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
        ctx.font = '20px Arial';
        ctx.fillStyle = '#ffffff';
        ctx.fillText( response.onlinePlayers+'/'+response.maxPlayers, canvas.width / 1.17, canvas.height / 3.2);
        ctx.beginPath();
        ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');
        const serverEmbed = new Discord.MessageEmbed()
        .setAuthor('Mr. Manager Jr.')
        .setColor('RANDOM')
        .attachFiles(attachment)
        .setImage("attachment://welcome-image.png")
        .setDescription(`**KGO Network Is Now Online With ${response.onlinePlayers}/${response.maxPlayers}.**`)
        .addField("**Version**", '**1.8x-1.16x**')
        .setFooter('Showing Data For KGO Network',"https://imgur.com/lI8yElX.png");
        message.channel.send(serverEmbed);
    }).catch((error) => {
        message.channel.send('**Server Is Offline**')
        return;
    })    
}

}