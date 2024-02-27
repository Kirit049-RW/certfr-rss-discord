const fs = require('fs');

/* Clear the console */
function cls() {
    console.clear();
}

/* Display the help command */
function help_rss() {
    console.log("\nBienvenue dans la console de gestion");
    console.log("Ici, vous pouvez ajouter, supprimer ou modifier une entrée RSS\n");
    console.log("Commandes : catdb / add / remove / alter / exit\n");
}

/** Add a new RSS feed
* @param {string} key - The name of the feed
* @param {string} username - The name of the webhook
* @param {string} rss_url - The URL of the RSS feed
* @param {string} url_webhook - The URL of the webhook
* @param {string} url_avatar - The URL of the avatar
* */
function new_feed(key, username, rss_url, url_webhook, url_avatar) {
    const guid = `./GUID/${key}.guid`;

    const jsonContent = fs.readFileSync('./db.json', 'utf8');
    const DICO = JSON.parse(jsonContent);

    if (key in DICO['URL']) {
        console.log(`ERROR : Le nom du flux ${key} existe déjà dans le fichier db.json`);
    } else {
        DICO["URL"][key] = rss_url;
        DICO["WEBHOOK"][key] = url_webhook;
        DICO["USERNAME"][key] = username;
        DICO["AVATAR"][key] = url_avatar;
        DICO["GUID"][key] = guid;

        console.log(JSON.stringify(DICO, null, 4));
        console.log(`SUCCESS : Le flux ${key} a bien été enregistré dans le fichier db.json`);

        fs.writeFileSync('./db.json', JSON.stringify(DICO, null, 4));
    }
}

/** Delete a RSS feed
 * @param {string} key - The name of the feed
 * @param {string} check - The confirmation to delete the feed
 * */
function remove_feed(key, check) {
    const jsonContent = fs.readFileSync('./db.json', 'utf8');
    const DICO = JSON.parse(jsonContent);

    if (key in DICO['URL']) {
        delete DICO["GUID"][key];
        delete DICO["URL"][key];
        delete DICO["WEBHOOK"][key];
        delete DICO["AVATAR"][key];
        delete DICO["USERNAME"][key];

        if (check === "y") {
            console.log(JSON.stringify(DICO, null, 4));
            fs.writeFileSync('./db.json', JSON.stringify(DICO, null, 4));
            console.log("SUCCESS : Le flux a bien été supprimé dans le fichier db.json");
        } else {
            console.log("Annulation remove !");
        }
    } else {
        console.log(`ERROR : Le nom du flux (${key}) n'existe pas dans le fichier db.json`);
    }
}

/** Modify a RSS feed
 * @param {string} key - The name of the feed
 * @param {string} value - The name of the value to modify
 * @param {string} change - The new value to change
 * */
function alter_feed(key, value, change) {
    const jsonContent = fs.readFileSync('./db.json', 'utf8');
    const DICO = JSON.parse(jsonContent);

    if (key in DICO['URL']) {
        if (key in DICO['URL']) {
            const valueUpper = value.toUpperCase();
            if (["URL", "WEBHOOK", "USERNAME", "AVATAR"].includes(valueUpper)) {
                value = valueUpper;
                DICO[value][key] = change;
                console.log(JSON.stringify(DICO, null, 4));
                console.log("SUCCESS : Le flux a bien été modifié dans le fichier db.json");
                fs.writeFileSync('./db.json', JSON.stringify(DICO, null, 4));
            } else {
                console.log(`ERROR : La valeur ${value} à modifier n'existe pas`);
            }
        }
    } else {
        console.log(`ERROR : Le nom du flux ${key} n'existe pas dans le fichier db.json`);
    }
}

module.exports = { cls, help_rss, new_feed, remove_feed, alter_feed }