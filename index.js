const express = require('express');
app = express();
require("dotenv").config();
const port = process.env.PORT;

const route=require("./routes/client/index.route");
const routeAdmin=require("./routes/admin/index.route");
const database=require("./config/database");
const systemConfig=require("./config/system");


database.connect();

app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.static("public"));
app.locals.prefixAdmin=systemConfig.prefixAdmin;

route(app);
routeAdmin(app);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})