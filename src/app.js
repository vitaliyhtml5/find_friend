const path = require('path');
const express = require('express');

const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());


app.use(express.static(path.join(__dirname, '../public'), {
    extensions: ['html']
}));

const loginRouter = require('./login');
app.use(loginRouter);

const logoutRouter = require('./logout');
app.use(logoutRouter);

const tokenRouter = require('./token_access');
app.use(tokenRouter);

const showAllRouter = require('./get_friends');
app.use(showAllRouter);

const searchRouter = require('./search_friend');
app.use(searchRouter);

const addRouter = require('./add_friend');
app.use(addRouter);

const updateRouter = require('./update_friend');
app.use(updateRouter);

const deleteRouter = require('./delete_friend');
app.use(deleteRouter);

const profileRouter = require('./get_profile');
app.use(profileRouter);

const profileUpdateRouter = require('./update_profile');
app.use(profileUpdateRouter);


app.listen(port, () => console.log(`Server is running on ${port} port`));