const readlineSync = require('readline-sync');
const { help_rss, cls, new_feed, remove_feed, alter_feed } = require('./functions');

cls();
help_rss();
let userInput = "";

while (userInput !== "exit") {
    userInput = readlineSync.question("\nconsole rss-discord # ");

    switch (userInput) {
        case "add":
            const key = readlineSync.question("Nom du flux : ");
            const username = readlineSync.question("Nom du webhook : ");
            const rss_url = readlineSync.question("URL du flux rss : ");
            const url_webhook = readlineSync.question("URL du webhook : ");
            const url_avatar = readlineSync.question("URL avatar : ");
            new_feed(key, username, rss_url, url_webhook, url_avatar);
            break;

        case "remove":
            const removeKey = readlineSync.question("Nom du flux à supprimer : ");
            const confirmRemove = readlineSync.question(`Êtes-vous sûr de vouloir supprimer ${removeKey} ? (y/n) `);
            remove_feed(removeKey, confirmRemove);
            break;

        case "alter":
            const alterKey = readlineSync.question("Nom de la clé à modifier : ");
            const alterValue = readlineSync.question("Nom de la valeur à modifier (URL / WEBHOOK / USERNAME / AVATAR) : ");
            const alterChange = readlineSync.question(`Entrez la nouvelle valeur pour ${alterValue} : `);
            alter_feed(alterKey, alterValue, alterChange);
            break;

        case "catdb":
            const catDbCommand = "cat ./db.json";
            require('child_process').exec(catDbCommand, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Erreur lors de l'exécution de la commande : ${stderr}`);
                    return;
                }
                console.log(stdout);
            });
            break;

        case "help":
            help_rss();
            break;

        case "exit":
            console.log("Fermeture de la console rss-discord.");
            break;

        default:
            console.log("Commande invalide. Utilisez 'help' pour afficher les commandes disponibles.");
            break;
    }
}
