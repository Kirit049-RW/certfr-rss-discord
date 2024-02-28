const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');

const filePath = "./db.json";

const jsonContent = fs.readFileSync(filePath, 'utf8');
const DICO = JSON.parse(jsonContent);

/**
 * Get the RSS feed and send it to the webhook
 * @param {string} URL The URL of the RSS feed
 * @param {string} WEBHOOK The URL of the webhook
 * @param {string} USERNAME The name of the webhook
 * @param {string} AVATAR_URL The URL of the avatar
 * @param {string} GUID The path of the GUID file
 */
function code(URL, WEBHOOK, USERNAME, AVATAR_URL, GUID) {
    fetch(URL)
        .then(response => response.text())
        .then(async (feed) => {
			const parser = new xml2js.Parser();
			const xml = await parser.parseStringPromise(feed);

            let count = 0;
            
			for (const entry of xml.rss.channel[0].item) {
                const fileContent = fs.readFileSync(GUID, 'utf8');
                const fileIndex = fileContent.indexOf(entry.guid[0]._);
                
                if (fileIndex === -1) {
                    count++;
                    
                    fs.appendFileSync(GUID, `\n${entry.guid[0]._}`);

                    const data = {
                        content: `\n# [${entry.title}](${entry.link})\n> *${entry.description[0].replaceAll('<p>', '').replaceAll('</p>', '')}*`,
                        username: USERNAME,
                        avatar_url: AVATAR_URL
                    };

                    fetch(WEBHOOK, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    });

                    setTimeout(() => {}, 1000);
                }
            }

            console.log(`[${USERNAME}]`)

            if (count !== 0 ) {
                console.log(`${count} ${count > 1 ? 'posts' : 'post'} sent!`);
            }
            else {
                console.log('No new post!');
            }
        })
        .catch(error => console.error(error));

    console.log('\n');
}

for (const [k] of Object.entries(DICO['URL'])) {
    const guidFilePath = path.join(__dirname, DICO['GUID'][k]);
    
    if (!fs.existsSync(guidFilePath)) {
        fs.writeFileSync(guidFilePath, '', 'utf8');
    }

    code(DICO['URL'][k], DICO['WEBHOOK'][k], DICO['USERNAME'][k], DICO['AVATAR'][k], DICO['GUID'][k]);
}
