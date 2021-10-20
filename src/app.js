const path = require('path');
const express = require('express');

const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());


app.use(express.static(path.join(__dirname, '../public'), {
    extensions: ['html']
}));

const showAllRouter = require('./get_friends');
app.use(showAllRouter);

const addRouter = require('./add_friend');
app.use(addRouter);

const updateRouter = require('./update_friend');
app.use(updateRouter);

const deleteRouter = require('./delete_friend');
app.use(deleteRouter);


app.listen(port, () => console.log(`Server is running on ${port} port`));