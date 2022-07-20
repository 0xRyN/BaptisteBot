const { google } = require('googleapis');
const path = require('path');

// Token used for private constructor
const instanceToken = Symbol('instanceToken');

exports.Quiz = class Quiz {
   static #instance = null;
   #spreadsheetId = "1Lb36P6IZMtqtLdCsgKPt6EYTZLPZlN31C0rYXJS-O7A";
   #auth = null;
   #googleSheetsInstance = null;
   // TODO : list for a sepecific guild
   #channelWhitelist = [];
   #channelBlacklist = [];
   #questionTimeout;

   #allQuestions;

   #MINTIME_NEXT;
   #MAXTIME_NEXT;


   static getInstance(guild) {
      if (this.#instance === null)
         this.#instance = new Quiz(instanceToken, guild);
      return this.#instance;
   }

   // Public constructor but using a intern token to create a fake private constructor
   constructor(token) {
      if (token !== instanceToken) {
        throw new Error('Constructor is private');
      }
   }

   checkInstance() {
      if (this.#auth === null || this.#googleSheetsInstance === null)
         throw new Error("Quiz is not registered");
   }

   channelWhitelist(list) {
      this.#channelWhitelist = list;
      return this;
   }

   channelBlacklist(list) {
      this.#channelBlacklist = list;
      return this;
   }

   minTime(time) {
      this.#MINTIME_NEXT = time * 1000;
      return this;
   }

   maxTime(time) {
      this.#MAXTIME_NEXT = time * 1000;
      return this;
   }

   register() {
      if (this.#auth !== null && this.#googleSheetsInstance !== null)
         throw new Error("Quiz already registered");
      this.#auth = new google.auth.GoogleAuth({
         credentials: {
            client_email: process.env.GOOGLE_CLIENT_EMAIL,
            private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
         }, 
         //url to spreadsheets API
         scopes: "https://www.googleapis.com/auth/spreadsheets", 
      });
      const authClientObject = async () => {
         await auth.getClient();
      };
      this.#googleSheetsInstance = google.sheets({ version: "v4", auth: authClientObject });
      return this;
   }

   async query(page, from, to) {
      this.checkInstance();
      return await this.#googleSheetsInstance.spreadsheets.values.get({
         auth: this.#auth,
         spreadsheetId: this.#spreadsheetId, 
         range: `${page}!${from}:${to}`,
      });
   }

   getHeaders() {
      return this.query("Questions", "1", "1");
   }

   getAllQuestions() {
      return this.query("Questions", "A2", "I")
   }

   async action(message) {
      const tokens = message.content.split(" ");
      if (tokens.length === 1 || tokens[1] === "start") {
         if (this.#questionTimeout?._idleTimeout > 0) {
            message.reply("Quiz already started");
            return;
         }
         this.start(message.guild);
         message.reply("Quiz starting !");
         return;
      }
      if (tokens[1] === "stop") {
         clearTimeout(this.#questionTimeout);
         message.reply("Quiz stopped");
         return;
      }
      if (tokens[1] === "reload") {
         await this.getAllQuestions().then(response => {
            this.#allQuestions = response.data.values.filter(e => e[7] === '1');
         }).then(() => {
            message.react("✅");
         });
         return;
      }
      if (tokens[1] === "state") {
         if (this.#questionTimeout?._idleTimeout > 0)
            message.reply("Quiz is running");
         else
            message.reply("Quiz is stopped");
         return;
      }
      if (tokens[1] === "leaderboard") {
         let leaderboard;
         await this.query("Leaderboard", "A2", "I").then(response => {
            if (!response.data.values) {
               message.reply("No player in the leaderboard");
               return;
            }

            leaderboard = response.data.values
               .map(e => {
                  return [ e[0], parseInt(e[1]), e[2] ];
               })
               .sort((e1, e2) => {
                  return e2[1] - e1[1];
               });

            message.reply(":trophy: Leaderboard : :trophy:\n" + leaderboard.map((e, i) => `${i + 1}. **${e[0]}** : ${e[1]} points`).join("\n"));
         });
         return;
      }
      if (tokens[1] === "wlist") {
         if (!tokens[2]) {
            const channels = this.#channelWhitelist
               .map((e) => `- ${message.guild.channels.cache.get(e)}`)
               .filter(e => e && e !== "undefined");
            message.reply("Whitelist :\n" + channels.join("\n"));
            return;
         }
         if (tokens[2] === "add") {
            if (!tokens[3])
               return;

            if (message.guild.channels.cache.get(tokens[3])) {
               this.#channelWhitelist.push(tokens[3]);
               message.reply(`${message.guild.channels.cache.get(tokens[3])} added to whitelist`);
            } else {
               message.reply(`${tokens[3]} is not a valid channel`);
            }
            return;
         } 
         if (tokens[2] === "remove") {
            if (!tokens[3])
               return;
            this.#channelWhitelist = this.#channelWhitelist.filter(e => e !== tokens[3]);
            
            return;
         }
      }
      if (tokens[1] === "blist") {
         if (!tokens[2]) {
            const channels = this.#channelBlacklist
               .map((e) => `- ${message.guild.channels.cache.get(e)}`)
               .filter(e => e !== "undefined");
            message.reply("Blacklist :\n" + channels.join("\n"));
            return;
         }
         if (tokens[2] === "add") {
            if (!tokens[3])
               return;
         
            if (message.guild.channels.cache.get(tokens[3])) {
               this.#channelBlacklist.push(tokens[3]);
               message.reply(`${message.guild.channels.cache.get(tokens[3])} added to blacklist`);
            } else {
               message.reply(`${tokens[3]} is not a valid channel`);
            }
            return;
         } 
         if (tokens[2] === "remove") {
            if (!tokens[3])
               return;
            this.#channelBlacklist = this.#channelBlacklist.filter(e => e !== tokens[3]);
            message.reply(`${message.guild.channels.cache.get(tokens[3])} removed from blacklist`);
            return;
         }
         
      }
   }

   async start(guild) {
      await this.getAllQuestions().then(response => {
         this.#allQuestions = response.data.values.filter(e => e[7] === '1');
      });
      
      const supportedChannels = Array.from(guild.channels.cache.filter(e => {
         if (e.type !== "GUILD_TEXT")
            return false;
         if (this.#channelWhitelist.length === 0)
            return !this.#channelBlacklist.includes(e.id);
         return !this.#channelBlacklist.includes(e.id) && this.#channelWhitelist.includes(e.id);
      }), ([_, values]) => values);

      if (supportedChannels.length === 0) 
         return;

      this.#askQuestion(supportedChannels);
      
   }

   #askQuestion(supportedChannels) {
      const rand = Math.floor(Math.random() * (this.#MAXTIME_NEXT - this.#MINTIME_NEXT + 1) + this.#MINTIME_NEXT);

      supportedChannels = supportedChannels.filter(e => {
         if (this.#channelWhitelist.length === 0)
            return !this.#channelBlacklist.includes(e.id);
         return !this.#channelBlacklist.includes(e.id) && this.#channelWhitelist.includes(e.id);
      });

      if (supportedChannels.length === 0)
         return;

      this.#questionTimeout = setTimeout(() => {
         // TODO : send question
         let randomIndex = Math.floor(Math.random() * (this.#allQuestions.length));
         const question = this.#allQuestions[randomIndex];
      
         randomIndex = Math.floor(Math.random() * (supportedChannels.length));
         const channel = supportedChannels[randomIndex];

         channel
            .send(`:rotating_light: **NOUVELLE QUESTION :** :rotating_light:\n
            **Question :** ${question[1]} :
               1) - ${question[2]}
               2) - ${question[3]}
               3) - ${question[4]}
               4) - ${question[5]}`)
            .then(msg => {
               msg.react("1️⃣");
               msg.react("2️⃣");
               msg.react("3️⃣");
               msg.react("4️⃣");

               setTimeout(() => {
                  msg.edit(`
                  **Réponse :** ${question[1]} :
                  ✅ ${question[parseInt(question[6]) + 1]}`)
                  msg.reactions.removeAll()
	                  .catch(error => console.error('Failed to remove reactions:', error));
               }, question[8] * 1000);   
               
               
               const filter = (reaction, user) => {
                  return user.id !== msg.author.id;
               };

               const emojiToIndex = {
                  "1️⃣": "1",
                  "2️⃣": "2",
                  "3️⃣": "3",
                  "4️⃣": "4"
               }
               
               const collector = msg.createReactionCollector({ filter, time: question[8] * 1_000 });
               
               const alreadyResponded = [];
               let order = 1;
               collector.on('collect', async (reaction, user) => {
                  // Vérifier si user a déjà réagi
                  // TODO : enlever les réactions déjà mises du user
                  if (alreadyResponded.includes(user.id))
                     return;
                  alreadyResponded.push(user.id);

                  // Vérifier la réponse
                  
                  if (emojiToIndex[reaction.emoji.name] === question[6]) {
                     const score = Math.floor(100 / order);

                     // Get user row in sheet
                     const allUsers = this.query("Leaderboard", "A2", "C");
                     let tempUser;
                     let create = false;

                     await allUsers.then(response => {
                        if (!response.data.values) 
                           response.data.values = [];

                        tempUser = response.data.values.find(e => e[0] === user.tag);
                        // If user row doesn't exist, create it
                        if (!tempUser) {
                           tempUser = [ user.tag, score.toString(), (response.data.values.length+2).toString() ];
                           create = true;
                        } else {
                           tempUser[1] = (parseInt(tempUser[1]) + score).toString();
                        }
                     });
                     
                     // Update user row
                     if (create) {
                        await this.#googleSheetsInstance.spreadsheets.values.append({
                           auth: this.#auth,
                           spreadsheetId: this.#spreadsheetId,
                           range: `Leaderboard!A${tempUser[2]}:C${tempUser[2]}`,
                           valueInputOption: "USER_ENTERED",
                           resource: {
                              values: [ tempUser ]
                           }
                        });
                     } else {
                        await this.#googleSheetsInstance.spreadsheets.values.update({
                           auth: this.#auth,
                           spreadsheetId: this.#spreadsheetId,
                           range: `Leaderboard!A${tempUser[2]}:C${tempUser[2]}`,
                           valueInputOption: "USER_ENTERED",
                           resource: {
                              values: [ tempUser ]
                           }
                        });
                     }
                     order++;
                  }
               });
         });


         // Recursive call
         this.#askQuestion(supportedChannels);
      }, rand);
   }
};