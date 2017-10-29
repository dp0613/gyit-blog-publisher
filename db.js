const {Client} = require('pg');
const connectLocal = 'postgre://dp0613:dp0613ishandsomeguy@localhost/gyit-post-publisher';
const connectHeroku = 'postgres://jcgmrripmntmcb:19c789bf00003b4e648dba946897fbf3dfcba0ae4d1e528f7d759eab90af7cb8@ec2-174-129-227-116.compute-1.amazonaws.com:5432/d2fgou03np12to';

//Connect database
const client = new Client({
  connectionString: connectHeroku,
});
client.connect();

module.exports = client;
