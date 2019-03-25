# game-of-drones-back

```sh
$ npm install
$ sequelize db:create
$ npm start
```
- DB cofig is under /config/config.json, you can change the DB credentials there for your development enviroment
- This app uses mysql, in order for this app to work you must have mysql installed on your system
- To test this app with the Game of Drones Back app in development you should change the value of URL_API to value http://localhost:8000 under /general/constants.js, otherwise it is going to use the production api host 
