var sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database("test.db3", (err) => {
    if (err) {
        console.error(err.message)
        throw err
    } else {
        console.log("Connected to the user table.")
        db.run(`CREATE TABLE user (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text,
            username text,
            password text)`,
            (err) => {});
    }
});

module.exports = db;
