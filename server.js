const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const knex = require('knex')
//const cors = require('cors')
const port = 3000

const db = knex({
    client:'pg',
    connection:{
        host:'localhost',
        user:'postgres',
        password:'password',
        database:'project',
    }
})

db.select('*').from('student').then(data => {
    console.log(data)
})

const app = express()


//app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('')
})


app.post('/', (req, res) => {
    const {rollno, name, phone, email, domain_and_preference } = req.body;
    db('student').insert({
        rollno: rollno,
        name: name,
        phone: phone,
        email: email,
        domain_and_preference: domain_and_preference,
    }).then(console.log)
    res.json(db.database)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})