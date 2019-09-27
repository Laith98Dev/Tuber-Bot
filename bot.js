const Discord = require('discord.js');

const client = new Discord.Client();

var prefix = "$"

 

client.on('message', message => {

    var p = message.mentions.members.first();

    var reason = message.content.split(" ").slice(2).join(' ');

    var log = message.guild.channels.find('name', 'warns-log');

    if(message.content.startsWith(`$warn`)){

        if(!p) return message.reply(`**منشن الشخص اول**`);

        if(!reason) return message.reply(`**حط سبب**`);

        if(!p.bannable) return message.reply(`**مقدر اعطي وورن لشخص من الادارة**`);

        reason = reason.replace('1', "**كتابة الاوامر بالشات العام**");

        reason = reason.replace('2', "**بيع اشياء**");

        reason = reason.replace('3', "**التحذث عن السياسة**");

        reason = reason.replace('4', "**التحذث عن الدين **");

        reason = reason.replace('5', "**التحدث عن الطائفية**");

        reason = reason.replace('6', "**السبام**");

        reason = reason.replace('7', "**فتح تذكرة من دون سبب**");

        reason = reason.replace('8', "**العنصرية**");

        reason = reason.replace('9', "**عدم الاحترام**");

        reason = reason.replace('10', "**نشر بالعام**");

        var embed = new Discord.RichEmbed()

        .setAuthor(`تم التحذير`)

        .addField(`Name ♣`, `<@${p.id}>`)

        .addField(`By ♣`, `<@${message.author.id}>`)

        .addField(`Reason ♣`, reason)

        .setTimestamp()

        .setColor("WHITE")

        .setFooter(` `)

        message.channel.send(`${p} ${reason}`)

            message.delete();

        log.send({embed});

        warnRoles = ['USER']

    }

});

///////////

client.on('message', message => {

    var p = message.mentions.members.first();

    var reason = message.content.split(" ").slice(2).join(' ');

    var log = message.guild.channels.find('name', 'ban-log');

    if(message.content.startsWith(`$ban`)){

        if(!p) return message.reply(`**منشن الشخص**`);

        if(!reason) return message.reply(`**حط سبب**`);

        if(!p.bannable) return message.reply(`**م اقدر ابتد شخص من الستاف**`);

        reason = reason.replace('1', "**نشر في الخاص**");

        reason = reason.replace('2', "**اسم غير لائق**");

        reason = reason.replace('3', "**صوره غير لائقه**");

        reason = reason.replace('4', "**اسم غير لآئق**");

        reason = reason.replace('5', "**سب الاهل**");

        var embed = new Discord.RichEmbed()

        .setAuthor(`User Banned!`)

        .addField(`Name ♣`, `<@${p.id}>`)

        .addField(`By ♣`, `<@${message.author.id}>`)

        .addField(`Reason ♣`, reason)

        .setTimestamp()

        .setColor("BLACK")

        .setFooter(` `)

        p.ban();

            message.delete();

        log.send({embed});

        banRoles = ['۰۪۫O۪۫۰۰۪۫W۪۫۰۰۪۫N۪۫۰۰۪۫E۪۫۰۰۪۫R۪۫۰۰۪۫S۪۫۰']

    }

});

///////////////////////////

client.on('message',async message => {

  var room;

  var title;

  var duration;

  var gMembers;

  var filter = m => m.author.id === message.author.id;

  if(message.content.startsWith("-$giveaway")) {

     //return message.channel.send(':heavy_multiplication_x:| **هذا الامر معطل حاليا.. ``حاول في وقت لاحق``**');

    if(!message.guild.member(message.author).hasPermission('MANAGE_GUILD')) return message.channel.send(':heavy_multiplication_x:| **يجب أن يكون لديك خاصية التعديل على السيرفر**');

    message.channel.send(`:eight_pointed_black_star:| **من فضلك اكتب اسم الروم**`).then(msgg => {

      message.channel.awaitMessages(filter, {

        max: 1,

        time: 20000,

        errors: ['time']

      }).then(collected => {

        let room = message.guild.channels.find('name', collected.first().content);

        if(!room) return message.channel.send(':heavy_multiplication_x:| **لم اقدر على ايجاد الروم المطلوب**');

        room = collected.first().content;

        collected.first().delete();

        msgg.edit(':eight_pointed_black_star:| **اكتب مدة القيف اواي بالدقائق , مثال : 60**').then(msg => {

          message.channel.awaitMessages(filter, {

            max: 1,

            time: 20000,

            errors: ['time']

          }).then(collected => {

            if(isNaN(collected.first().content)) return message.channel.send(':heavy_multiplication_x:| **يجب عليك ان تحدد وقت زمني صحيح.. ``يجب عليك اعادة كتابة الامر``**');

            duration = collected.first().content * 60000;

            collected.first().delete();

            msgg.edit(':eight_pointed_black_star:| **واخيرا اكتب على ماذا تريد القيف اواي**').then(msg => {

              message.channel.awaitMessages(filter, {

                max: 1,

                time: 20000,

                errors: ['time']

              }).then(collected => {

                title = collected.first().content;

                collected.first().delete();

                try {

                  let giveEmbed = new Discord.RichEmbed()

                  .setAuthor(message.guild.name, message.guild.iconURL)

                  .setTitle(title)

                  .setDescription(`المدة : ${duration / 60000} دقائق`)

                  .setFooter(message.author.username, message.author.avatarURL);

                  message.guild.channels.find('name', room).send(giveEmbed).then(m => {

                     let re = m.react('💖');

                     setTimeout(() => {

                       let users = m.reactions.get("💖").users;

                       let list = users.array().filter(u => u.id !== m.author.id);

                       let gFilter = list[Math.floor(Math.random() * list.length) + 0];

                         if(users.size === 1) gFilter = '**لم يتم التحديد**';

                       let endEmbed = new Discord.RichEmbed()

                       .setAuthor(message.author.username, message.author.avatarURL)

                       .setTitle(title)

                       .addField('انتهى القيف اواي !',`الفائز هو : ${gFilter}`)

                       .setFooter(message.guild.name, message.guild.iconURL);

                       m.edit(endEmbed);

                     },duration);

                   });

                  msgg.edit(`:heavy_check_mark:| **تم اعداد القيف اواي**`);

                } catch(e) {

                  msgg.edit(`:heavy_multiplication_x:| **لم اقدر على اعداد القيف اواي بسبب نقص الخصائص**`);

                  console.log(e);

                }

              });

            });

          });

        });

      });

    });

  }

});

////////

client.on('message', async message => {

 

if(message.content.startsWith('$invite')) {

        let oi = message.mentions.users.first() ? message.mentions.users.first().id : message.author.id;

        let Tag = message.mentions.users.first() ? message.mentions.users.first().tag : message.author.tag;

        let Username = message.mentions.users.first() ? message.mentions.users.first().username : message.author.username;

        let Avatar = message.mentions.users.first() ? message.mentions.users.first().avatarURL : message.author.avatarURL;

       

        message.guild.fetchInvites().then(invs => {

            let member = client.guilds.get(message.guild.id).members.get(oi);

            let personalInvites = invs.filter(i => i.inviter.id === oi);

            let urll = invs.filter(i => i.inviter.id === oi);

            let link = urll.reduce((p , v) => v.url +` , Total de membros recrutados no convite: ${v.uses}.\n`+ p, `\nServidor: ${message.guild.name} \n `);

            let inviteCount = personalInvites.reduce((p, v) => v.uses + p, 0);

            let inviteCode = personalInvites.reduce((p, v) => v.code);

            let possibleInvites = [['Total de membros recrutados:']];

            possibleInvites.push([inviteCount, inviteCode]);

            let user = message.mentions.users.first() || message.author;

            let mem = message.guild.member(user);

            let millisJoined = new Date().getTime() - mem.joinedAt.getTime();

            let daysJoined = millisJoined / 1000 / 60 / 60 / 24;

           

            var inviteInfo = new Discord.RichEmbed()

            .setTitle(`:incoming_envelope: **[INVITE INFO]** ${Username}`)

            .setThumbnail(client.user.avatarURL)

            .addField('**الدعوات**', `**➥** [ شخص **${Number(inviteCount)}** ]`)

            .addField('**تم الانضمام للسيرفر من**', `**➥** [ يوم **${daysJoined.toFixed(0)}** ]`)

            .addField('**رابط دعوة الانضمام**', `**➥** [ **https://discord.gg/${inviteCode || 'Zm2U6we'}** ]`)

            .setColor('ORANGE')

            .setTimestamp()

            .setFooter(Tag, Avatar)

           

            message.channel.send(inviteInfo);

            });

    };

});

//////////////////////////////////

var config = {

  events: [

    {type: "CHANNEL_CREATE", logType: "CHANNEL_CREATE", limit: 4 , delay: 5000},

    {type: "CHANNEL_DELETE", logType: "CHANNEL_DELETE", limit: 4, delay: 5000},

    {type: "GUILD_MEMBER_REMOVE", logType: "MEMBER_KICK", limit: 4, delay: 5000},

    {type: "GUILD_BAN_ADD", logType: "MEMBER_BAN_ADD", limit: 4, delay: 5000},

    {type: "GUILD_ROLE_CREATE", logType: "ROLE_CREATE", limit: 5, delay: 5000},

    {type: "GUILD_ROLE_DELETE", logType: "ROLE_DELETE", limit: 4, delay: 5000},

  ]

}

client.on("error", (e) => console.error(e));

client.on("raw", (packet)=> {

  let {t, d} = packet, type = t, {guild_id} = data = d || {};

  if (type === "READY") {

    client.startedTimestamp = new Date().getTime();

    client.captures = [];

  }

  let event = config.events.find(anEvent => anEvent.type === type);

  if (!event) return;

  let guild = client.guilds.get(guild_id);

  if (!guild) return;

  guild.fetchAuditLogs({limit : 1, type: event.logType})

    .then(eventAudit => {

      let eventLog = eventAudit.entries.first();

      if (!eventLog) return;

      let executor = eventLog.executor;

      guild.fetchAuditLogs({type: event.logType, user: executor})

        .then((userAudit, index) => {

          let uses = 0;

          userAudit.entries.map(entry => {

            if (entry.createdTimestamp > client.startedTimestamp && !client.captures.includes(index)) uses += 1;

          });

          setTimeout(() => {

            client.captures[index] = index

          }, event.delay || 2000)

          if (uses >= event.limit) {

            client.emit("reachLimit", {

              user: userAudit.entries.first().executor,

              member: guild.members.get(executor.id),

              guild: guild,

              type: event.type,

            })

          }

        }).catch(console.error)

    }).catch(console.error)

});

client.on("reachLimit", (limit)=> {

  let log = limit.guild.channels.find( channel => channel.name === "security-log");

  log.send(limit.user.username+"\** سيرفر بيتهكر ! ** ");

  limit.guild.owner.send(limit.user.username+"\** سيرفرك بيتهكر ! ** ")

  limit.member.roles.map(role => {

    limit.member.removeRole(role.id)

    .catch(log.send)

  });

});

///////

client.on('message', message => {

    if(message.content.startsWith('$new')) {

        let args = message.content.split(' ').slice(1).join(' ');

        let support = message.guild.roles.find("name","Support Team");

        let ticketsStation = message.guild.channels.find("name", "TICKETS.");

        if(!args) {

            return message.channel.send('**المرجو كتآبة موضوع للتذكرة**');

        };

                if(!support) {

                    return message.channel.send('** من فضلك قم بإنشاء رتبة اسمها `Support Team` **');

                };

            if(!ticketsStation) {

                message.guild.createChannel("TICKETS.", "category");

            };

                message.guild.createChannel(`ticket-${message.author.username}`, "text").then(ticket => {

                    message.delete()

                        message.channel.send(`Your ticket has been created. [ ${ticket} ]`);

                    ticket.setParent(ticketsStation);

                    ticketsStation.setPosition(1);

                        ticket.overwritePermissions(message.guild.id, {

                            SEND_MESSAGES: false,

                            READ_MESSAGES: false

                        });

                            ticket.overwritePermissions(support.id, {

                                SEND_MESSAGES: true,

                                READ_MESSAGES: true

                            });

                                ticket.overwritePermissions(message.author.id, {

                                    SEND_MESSAGES: true,

                                    READ_MESSAGES: true

                                });

                    let embed = new Discord.RichEmbed()

                                .setTitle('**New Ticket.**')

                                .setColor("RANDOM")

                                .setThumbnail(`${message.author.avatarURL}`)

                                .addField('Subject', args)

                                .addField('Author', message.author)

                                .addField('Channel', `<#${message.channel.id}>`);

 

                                ticket.sendEmbed(embed);

                }) .catch();

    }

    if(message.content.startsWith('-close')) {

            if(!message.member.hasPermission("ADMINISTRATOR")) return;

        if(!message.channel.name.startsWith("ticket")) {

            return;

        };  

                let embed = new Discord.RichEmbed()

                    .setAuthor("أعد الامر ، لديك 20 ثآنية")

                    .setColor("RANDOM");

                    message.channel.sendEmbed(embed) .then(codes => {

 

                   

                        const filter = msg => msg.content.startsWith('$close');

                        message.channel.awaitMessages(response => response.content === prefix + 'close', {

                            max: 1,

                            time: 20000,

                            errors: ['time']

                        })

                        .then((collect) => {

                            message.channel.delete();

                        }) .catch(() => {

                            codes.delete()

                                .then(message.channel.send('**تم إلغاء العملية**')) .then((c) => {

                                    c.delete(4000);

                                })

                                   

                           

                        })

 

 

                    })

 

 

           

    }

});

//////

client.on("guildMemberAdd", member => {

  client.channels.find('id', '582093431770185745').send(` **Welcome To .. Server**  `)

});

/////////

client.on('message', msg => {

    if(msg.content === '$help')

    msg.reply('تم الارسال في الخاص  :white_check_mark:')

  });

 

 

  client.on("message", message => {

    if (message.content === "$help") {

     const embed = new Discord.RichEmbed()

         .setColor("#00FF00")

         .setThumbnail(message.author.avatarURL)

         .setDescription(`**Help|هيلب

       -invites | لمعرفة عدد انفايتاتك

       -new | لإنشاء تكت

       -giveaway  |  لإعداد قيفاواي

	$listvoice  |  عدد الاشخاص في الرومات الصوتية

	$clear      |   لمسح الشات



       ** `)

   message.author.sendEmbed(embed)

   

   }

   });

///كوبيرايت
client.on('ready', () => {
client.user.setGame('By Mortada','https://www.youtube.com/LaithYT','-help المساعدة');
console.log('Logging into discord..');
});



///مسح الشات
client.on('message', message => {
	var prefix = "$";
   if(!message.channel.guild) return;
if(message.content.startsWith('$clear')) {
if(!message.channel.guild) return message.channel.send('**This Command is Just For Servers**').then(m => m.delete(500000));
if(!message.member.hasPermission('MANAGE_MESSAGES')) return      message.channel.send('**You Do not have permission** `MANAGE_MESSAGES`' );
let args = message.content.split(" ").join(" ").slice(2 + prefix.length);
let request = `Requested By ${message.author.username}`;
message.channel.send(`** هل تريد مسح الشات بالكامل؟**`).then(msg => {
msg.react('✅')
.then(() => msg.react('❌'))
.then(() =>msg.react('✅'))

let reaction1Filter = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
let reaction2Filter = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;

let reaction1 = msg.createReactionCollector(reaction1Filter, { time: 12000 });
let reaction2 = msg.createReactionCollector(reaction2Filter, { time: 12000 });
reaction1.on("collect", r => {
message.channel.send(`سيتم مسح الشات`).then(m => m.delete(500000));
var msg;
        msg = parseInt();

      message.channel.fetchMessages({limit: msg}).then(messages => message.channel.bulkDelete(messages)).catch(console.error);
      message.channel.sendMessage("", {embed: {
        title: "`` تم مسح الشات بنجاح ``",
        color: 0x06DF00,
        footer: {

        }
      }}).then(msg => {msg.delete(3000)});

})
reaction2.on("collect", r => {
message.channel.send(`**Chat deletion cancelled**`).then(m => m.delete(500000));
msg.delete();
})
})
}
});


////ميوت روابط
client.on('message', async message => {
            if(message.content.includes('discord.gg')){
                if(message.member.hasPermission("MANAGE_GUILD")) return;
        if(!message.channel.guild) return;
        message.delete()
          var command = message.content.split(" ")[0];
    let muterole = message.guild.roles.find(`name`, "Muted");
    if(!muterole){
      try{
        muterole = await message.guild.createRole({
          name: "Muted",
          color: "#000000",
          permissions:[]
        })
        message.guild.channels.forEach(async (channel, id) => {
          await channel.overwritePermissions(muterole, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false
          });
        });
      }catch(e){
        console.log(e.stack);
      }
    }
           if(!message.channel.guild) return message.reply('** This command only for servers**');
     message.member.addRole(muterole);
    const embed500 = new Discord.RichEmbed()
      .setTitle("Muted Ads")
            .addField(`**  You Have Been Muted **` , `**Reason : Sharing Another Discord Link**`)
            .setColor("c91616")
            .setThumbnail(`${message.author.avatarURL}`)
            .setAuthor(message.author.username, message.author.avatarURL)
        .setFooter(`${message.guild.name} `)
     message.channel.send(embed500)
     message.author.send('` انت معاقب ميوت شاتي بسبب نشر سرفرات ان كان عن طريق الخطا **ف** تكلم مع الادارة `');
   
       
    }
})

client.on('message' , message => {
if(message.content === '$listvoice') {
    message.channel.send(`**عدد الاشخاص الموجودين بـ  الرومات الصوتيه : ${message.guild.members.filter(g => g.voiceChannel).size}**`);
}
});

/////
client.login('NjI2NTExOTg4MTM0MTE3Mzgz.XY5Ucg.Fg9hxO361Pix2W2duV0-RwgCaDA');
