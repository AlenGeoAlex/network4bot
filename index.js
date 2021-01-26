const discord = require('discord.js');
const client = new discord.Client({ disableEveryone: true, disabledEvents: ["TYPING_START"] },{ partials: ["MESSAGE", "CHANNEL", "REACTION"]});
const { readdirSync } = require("fs");
const { join } = require("path")
const editJsonFile = require("edit-json-file");
const wait = require('util').promisify(setTimeout);
//----------------------------------------------
//##Readable Files
const options = require('./Config/data.json');
const Data = require('./Data/stickydata.json')
const PREFIX = options.prefix;
const invites = {};
let file = editJsonFile(`${Data}`, {
  autosave: true})
//----------------------------------------------

client.login(options.token);
client.on("ready", () => {
    console.log(`\x1b[33mBot Loading Up..!`)
    require('./Server/minecraft')(client)
    require('./Server/initmysql')(client)
    require('./Status/botstatus')(client)
    require('./Ticket/sendsuptmsg')(client)
    console.log(`\x1b[32mBot Loadup Completed.`)
  })


  client.on('message', message => {
    if (message.author.id == client.user.id) return;
    require('./Sticky/onMsg')(client,message)
  })

  client.on("voiceStateUpdate", (oldVoiceState, newVoiceState) => {
    if (newVoiceState.channel) {
      console.log(newVoiceState)
      console.log(`${newVoiceState.member.user.tag} connected to ${newVoiceState.channel.name}.`);
      require('./Support Voice/connected')(client, oldVoiceState, newVoiceState)
  }
  })


  client.on("warn", info => console.log(info));
  client.on("error", console.error)
  client.commands = new discord.Collection()
  client.prefix = PREFIX
  const cmdFiles = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith(".js"))
  for (const file of cmdFiles) {
    const command = require(join(__dirname, "commands", file))
    client.commands.set(command.name, command)
  }   

client.on("message", message => {
    if (message.author.bot) return;
    if (!message.guild) return;
    if(message.content.startsWith(PREFIX)) { 
     const args = message.content.slice(PREFIX.length).trim().split(/ +/) //removing prefix from args
     const command = args.shift().toLowerCase();
     if(!client.commands.has(command)) {
       return;
     } 
     try  { 
       client.commands.get(command).execute(client, message, args)
     } catch (err) { 
          console.log(err)
          message.reply(`Bot Is Currently Not In Its Full Functionality`)
     }
   }
});
