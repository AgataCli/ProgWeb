const express = require("express");
const morgan = require("morgan");
const router = require(`${__dirname}/src/router/router`);
const handlebars = require("express-handlebars");
const sass = require('node-sass-middleware');

const app = express();
const PORT = 3000;

app.engine('handlebars', handlebars.engine({
    helpers: require(`${__dirname}/src/views/helpers/helpers`),
    layoutsDir: `${__dirname}/src/views/layouts`,
    defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/src/views`);

app.use(sass({
    src: __dirname + '/public/scss',
    dest: __dirname + '/public/css',
    outputStyle: 'compressed',
    prefix: '/css',
}))

app.use("/img", express.static(`${__dirname}/public/img`));
app.use("/css", express.static(`${__dirname}/public/css`));
app.use("/webfonts", express.static(`${__dirname}/node_modules/@fortawesome/fontawesome-free/webfonts`))
app.use("/js",[
    express.static(`${__dirname}/public/js`),
    express.static(`${__dirname}/node_modules/bootstrap/dist/js`)
])

app.use(morgan("short"));
app.use(router);

app.listen(PORT, () => {
    console.log(`Escutando na porta ${PORT}`);
})