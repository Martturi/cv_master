const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL
});

var text = ''

client.connect();

client.query('SELECT text FROM cv_table WHERE id = $1;', [id], (err, res) => {
  if (err) throw err;
    JSON.parse(JSON.stringify(res.rows[0]), (key, value) => {
      if (key == "text") {
      text = value;
    }
    });
});

var load = () => {
  return text;
};

var save = (input) => {
  text = input
  var q = "UPDATE cv_table SET text=\'"+text+"\' WHERE id = $1;"
  client.query(q, [id], (err, res) => {
    if (err) {
      return err;
    } else {
      return res;
    }
  });
};

module.exports = {load, save};
