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

   #headers
   #allQuestions;


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

   register() {
      if (this.#auth !== null && this.#googleSheetsInstance !== null)
         throw new Error("Quiz already registered");
      this.#auth = new google.auth.GoogleAuth({
         keyFile: path.join(__dirname, "config/client-secret.json"), //the key file
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
      return this.query("Questions", "A2", "G")
   }

   async action(message) {
      const tokens = message.content.split(" ");
      console.log(tokens);
      if (tokens.length === 1 || tokens[1] === "start") {
         this.start(message.guild);
         message.reply("Quiz starting !");
      }
      if (tokens[1] === "stop") {
         clearTimeout(this.#questionTimeout);
         message.reply("Quiz stopped");
      }
      if (tokens[1] === "reload") {
         await this.getAllQuestions().then(response => {
            this.#allQuestions = response.data.values;
         });
      }
      if (tokens[1] === "state") {
         if (this.#questionTimeout?._idleTimeout > 0)
            message.reply("Quiz is running");
         else
            message.reply("Quiz is stopped");
      }
   }

   async start(guild) {
      await this.getHeaders().then(response => {
         this.#headers = response.data.values[0].map((elt, i) => {
            return {
               propIndex: i,
               prop: elt
            }
         });
      });
      await this.getAllQuestions().then(response => {
         this.#allQuestions = response.data.values;
      });
      
      const supportedChannels = Array.from(
         guild.channels.cache.filter(e => {
            if (e.type !== "GUILD_TEXT")
               return false;
            if (this.#channelWhitelist.length === 0)
               return !this.#channelBlacklist.includes(e.id);
            return !this.#channelBlacklist.includes(e.id) && this.#channelWhitelist.includes(e.id);
         }), ([_, value]) => value
      );

      this.#askQuestion(supportedChannels);
      
   }

   #askQuestion(supportedChannels) {
      const rand = Math.floor(Math.random() * (10_000 - 1_000 + 1) + 1_000)
      this.#questionTimeout = setTimeout(() => {
         // TODO : send question
         const randomIndex = Math.floor(Math.random() * (this.#allQuestions.length));
         const question = this.#allQuestions[randomIndex];
         

         this.#askQuestion(supportedChannels);
      }, rand)
   }
};