const next = require('next');
const Koa = require('koa');
const app = new Koa();

const nextApp = next({dev: process.env.NODE_ENV !== 'production'});

const port = process.env.PORT || 3000 ;

require('./handlers/01-favicon').init(app);
require('./handlers/02-static').init(app);
require('./handlers/03-errors').init(app);


nextApp
.prepare()
.then(()=>{
        require('./handlers/04-routes').init(app, nextApp);
        app.listen(port, () => console.log(`App running on port ${port}`));
    })
    .catch(err => {
        console.log('An error occurred, unable to start the server')
        console.log(err)
      })



