var express = require('express');
var app = express();
var cors = require('cors');
var PORT = process.env.PORT || 8000;
var bodyParser = require('body-parser');
var router = require('./src/route/index');
var swaggerUi = require('swagger-ui-express');
var swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use(cors());
app.use(bodyParser.json());

// Test route
app.get("/", (req, res, next) => {
    res.json({ "message": "ok" });
});

app.use("/api", router);

// Default Response
app.use((req, res) => {
    res.status(400);
    res.end();
});


app.listen(PORT, () => {
    console.log('test server start on :' + PORT);
});

