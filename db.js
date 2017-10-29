const {Client} = require('pg');
const connect = 'postgre://dp0613:dp0613ishandsomeguy@localhost/gyit-post-publisher';

//Connect database
const client = new Client({
  connectionString: connect,
});
client.connect();

module.exports = client;
