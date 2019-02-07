# node-mongo-scraper-api-vue
A node.js scraper that saves data to a mongo database, and an express API that feeds a Vue.js Front end

#Scraper and API Requirements
mongodb running on localhost:27017
a database named 'naruto_characters' with a collection named 'characters'. (The web scraper will search all wiki pages on https://naruto.fandom.com/wiki/Category:Characters and populate table from the html text and images);

#Vue.js Frontend Requirements
The node express api must be running on local port 3000
you can run the vue.js frontend on any other local port like 8080

#To run the node.js express api and scrapper:
```sh
$ cd /express_api_demo
$ npm install
$ node index.js
```

#To scrape contents of naruto.fandom.com wiki pages:
In your browser, with express_api_demo running... go to
http://localhost:3000/parser/get-all-character-links?url=https://naruto.fandom.com/wiki/Category:Characters
It will automatically search for more pages and parse each character's html for data to create or update the character in the database. You can view the progress of the import in the terminal.

#To run the vue.js frontend:
in another terminal window:
```sh
$ cd /vue-project
$ npm install
$ npm run dev
```
