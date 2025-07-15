const sql = require(`mysql`);

const db = sql.createConnection({
    host:'localhost',
    port:3306,
    user:'root',
    password:`letmein`,
    database:`Orbit`
})



db.connect((err)=>{
    if (err){
        console.error(err);
        return;
    }
    console.log(`Connected to database`);
})

module.exports = db;

