const util = require('minecraft-server-util');
const server = require('../Config/server.json');
const Discord = require('discord.js');
const Canvas = require('canvas');
//-------------------------------------------------------------------------------------------------------
module.exports = async(client) => {
    console.log(1)
const canvas = Canvas.createCanvas(796, 74);
const ctx = canvas.getContext('2d');
const background = await Canvas.loadImage('https://imgur.com/3MRBvsa.png')
ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
ctx.strokeStyle = '#74037b';
ctx.strokeRect(0, 0, canvas.width, canvas.height);

ctx.font = '28px sans-serif';
ctx.fillStyle = '#ffffff';
ctx.fillText('Welcome to the server,', canvas.width / 2.5, canvas.height / 3.5);

util.status('kgo.world').then((response) => {
    ctx.fillText(response.onlinePlayers, canvas.width / 2.5, canvas.height / 3.5);
    ctx.beginPath();
	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();

	const avatar = Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
	ctx.drawImage(avatar, 25, 25, 200, 200);

	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

	channel.send(attachment);
}).catch((error) => {
    return;
})
}