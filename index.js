require('dotenv').config(); // once you create a config file, need to install dotenv, then import it here in index

const server = require('./api/server.js');

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n** Running on port ${port} **\n`));
