# rss-discord-notification
Send a notification on Discord when an alert is issued

How to use it ?
1. Clone the repository
2. Install the packages
3. Create a GUID folder at the root of the project
4. Start the console file
5. Start the rss file
5. Enjoy

```bash
git clone
npm install
mkdir GUID
node console.js
node rss.js
```
Create a cron job or a task to start the rss file every x minutes, hours, days, etc.

The code is currently working for the website https://www.cert.ssi.gouv.fr/ and the rss feed https://www.cert.ssi.gouv.fr/feed/
