var router = require("express").Router();
var db = require("../database/user");

router.get("/", (req, res) => {
    let username = ` and username = '${req.query.username}'`
    let password = ` and password = '${req.query.password}'`
    let stmt = `select * from user where id > 0${username}${password}`
    db.all(stmt, (err, row) => {
        if (row) {
            console.log('GET user \'/\' : ' + row.length);
            console.log(stmt, row)
            res.json(row);
        } else {
            console.log('GET user \'/\' : ');
            console.log(err);
            res.write(err);
            res.status(500);
            res.end();
        }
    });
});

router.post("/", (req, res) => {
    let name = req.body.name;
    let username = req.body.username;
    let password = req.body.password;
    db.run(
        "insert into user (name, username, password) values (?, ?, ?)",
        [name, username, password],
        (err, row) => {
            if (err) {

                console.log('POST user \'/\' : ');
                console.log(err);
                res.write(err);
                res.status(500);
                res.end();
            } else {
                console.log('POST user \'/\' : ', row);
                res.status(201);
                res.end();
            }
        }
    );
});

router.put("/:id", (req, res) => {
    let id = req.params.id;
    let name = req.body.name;
    let username = req.body.username;
    let password = req.body.password;
    db.run(
        "update user set name = ?, username = ?, password = ? where id = ?",
        [name, username, password, id],
        (err, row) => {
            if (err) {
                console.log('PUT user \'/\' : ');
                console.log(err);
                res.write(err);
                res.status(500);
                res.end();
            } else {
                console.log('PUT user \'/\' : ', id);
                res.status(201);
                res.end();
            }
        }
    );
});

router.delete("/:id", (req, res) => {
    let id = req.params.id;
    db.run("delete from user where id = ?", id, (err, row) => {
        if (err) {
            console.log('DELETE user \'/:id\' : ');
            res.write(err);
            res.status(500);
            res.end();
        } else {
            console.log('DELETE user \'/:id\' : ', id);
            res.status(200);
            res.end();
        }
    });
});

module.exports = router;