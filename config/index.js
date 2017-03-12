require('dotenv').config();

var CONFIG_PORT = parseInt((process.env.CONFIG_PORT || 3000), 10);
if (isNaN(CONFIG_PORT)) {
  console.log('invalid port:', CONFIG_PORT);
  process.exit(1);
}

module.exports = {
  GOOGLE_API_KEY:     process.env.CONFIG_GOOGLE_API_KEY,
  PORT:               CONFIG_PORT,
  SESSION_SECRET:     process.env.CONFIG_SESSION_SECRET || 'secret'
}