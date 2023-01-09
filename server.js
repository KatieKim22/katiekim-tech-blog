const express = require('express');
const session = require('express-session');
const methodOveriide = require('method-override')

const routes = require('./Controllers');
const path = require('path');



// handlebars
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

const sequelize = require('./config/connection');
// const exp = require('constants');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3002;

app.use(session({
    secret: "highsecurity",
    cookie: { expires: 20 * 10 * 1000 },
    resave: true,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOveriide('_method'))

app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now Listening'))
})
