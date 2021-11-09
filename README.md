FULL DISCORD.JS GUIDE : https://discordjs.guide/

# English

## Dependencies

You will need NodeJs 16.8.0+ to run BaptisteBot.

Try to create a discord server for testing before deploying to production.

## How it works

BaptisteBot is a Node.js discord bot deployed to the cloud using **this current repository's source code.**

Any changes to the repository (using pull requests) will change the bot's behaviour instantly.

**You don't have to handle environnement variables, dependencies or api keys.**

**To submit a change to baptiste bot, just submit a pull request on GitHub.**

## How to submit a pull request

[You can watch this 5 min video to understand pull requests on GitHub](https://www.youtube.com/watch?v=rgbCcBNZcdQ)

1. Fork this repository.

2. Clone your repo.

3. Make your changes to a new branch and push to your forked repo.

4. Go back to your fork's repo. A green button will show "Submit Pull Request". Click it, add a description and submit your PR.

You can [check the github docs by clicking here](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork)

## Testing and debugging before pull request

1. [Follow this guide to setup a bot in your own discord server](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)

2. Clone the repository (_you will need NodeJs 16.8.0+ to run BaptisteBot_).

3. Browse into the cloned repository.

4. Create a new file called `.env` - In this file, add the line `API_KEY=YOUR_API_KEY_HERE`.

5. Run `npm i`. You only need to run this once per session.

6. Run `npm start`. When the bot's ready to answer commands, the terminal will show `Prêt`.

# Français

## Dépendances

Vous aurez besoin de NodeJs 16.8.0+ pour faire fonctionner BaptisteBot.

Essayez de créer un serveur discord pour tester avant de déployer en production.

## Comment ça marche

BaptisteBot est un bot discord Node.js déployé sur le cloud en utilisant **le code source de ce dépôt actuel**.

Toute modification apportée au dépôt (à l'aide de pull requests) changera le comportement du robot instantanément.

Vous n'avez pas à gérer les variables d'environnement, les dépendances ou les clés API.

**Pour soumettre un changement au bot baptiste, il suffit de soumettre une pull request sur GitHub.**

## Comment soumettre une pull request

[Vous pouvez regarder cette vidéo de 5 minutes pour comprendre les pull requests sur GitHub](https://www.youtube.com/watch?v=rgbCcBNZcdQ)

1. Forkez ce repo.

2. Clonez votre repo.

3. Effectuez vos changements dans une nouvelle branche et poussez vers votre repo bifurqué.

4. Retournez sur le repo de votre fork. Un bouton vert affichera "Submit Pull Request". Cliquez dessus, ajoutez une description et soumettez votre PR.

Vous pouvez [consulter la documentation de github en cliquant ici](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork)

## Test et débogage avant la demande de téléchargement

1. [Suivez ce guide pour installer un bot dans votre propre serveur discord](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)

2. Clonez le repo (_vous aurez besoin de NodeJs 16.8.0+ pour exécuter BaptisteBot_).

3. Naviguez dans le repo cloné.

4. Créez un nouveau fichier appelé `.env` - Dans ce fichier, ajoutez la ligne `API_KEY=Votre_API_KEY_HERE`.

5. Exécutez `npm i`. Vous n'avez besoin de l'exécuter qu'une fois par session.

6. Exécutez `npm start`. Lorsque le robot est prêt à répondre aux commandes, le terminal affiche `Prêt`.
