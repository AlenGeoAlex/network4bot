const Discord = require('discord.js');
const channel = require('../Config/channel.json')
const role = require('../Config/roles.json');
const options = require('../Config/data.json');
const db = require('../Server/mysql');
//-----------------------------------------------------
module.exports = async(client, member, invites) => {
// To compare, we need to load the current invite list.
member.guild.fetchInvites().then(guildInvites => {
    // This is the *existing* invites for the guild.
    const ei = invites[member.guild.id];
    // Update the cached invites for the guild.
    invites[member.guild.id] = guildInvites;
    // Look through the invites, find the one for which the uses went up.
    const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
    // This is just to simplify the message being sent below (inviter doesn't have a tag property)
    const inviter = client.users.get(invite.inviter.id);
    // Get the log channel (change to your liking)
    const logChannel = client.channels.cache.get(channel.txtinviteLog)
    logChannel.send(`${member.user.username} joined using invite code ${guildInvites.code} from ${inviter.tag}. Invite was used ${invite.uses} times since its creation.`);
  });
}