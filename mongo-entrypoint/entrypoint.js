let db = connect("mongodb://root:secret@localhost:27017/admin");

db = db.getSiblingDB('store'); // we can not use "use" statement here to switch db

db.createUser(
    {
        user: "root",
        pwd: "secret",
        roles: [ { role: "readWrite", db: "store"} ],
        passwordDigestor: "server",
    }
)