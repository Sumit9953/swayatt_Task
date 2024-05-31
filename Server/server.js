const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

var cors = require('cors');
app.use(cors());

const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 4000;

const database = require("./Config/database");

database.connectDB();

const assetsRouter = require('./Router/AssetRouter');
const ticketsRouter = require('./Router/TicketRouter');

app.use('/api/v1', assetsRouter);
app.use('/api/v1', ticketsRouter);

app.get("/" , (req,res) => {
    return res.json({
        success:true,
        message:"Your server is running...."
    })
})

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
