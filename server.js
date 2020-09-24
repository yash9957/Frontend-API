const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const knex = require('knex')
//const cors = require('cors')
const port = 3000
const salt = bcrypt.genSalt()

const db = knex({
    client:'pg',
    connection:{
        host:'localhost',
        user:'postgres',
        password:'password',
        database:'project',
    }
})

db.select('*').from('formdata').then(data => {
    console.log(data)
})

const app = express()


//app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('')
})

/*app.post('/register', (req, res) => {
    const {email, rollno, password} = req.body;
    db('register').insert({
        email: email,
        rollno: rollno,
        password: password,
    }).then(console.log)
})*/

app.post('/register', async (req, res) => {
    const {email, rollno, password} = req.body;
    try {
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)
        console.log(salt)
        console.log(hashedPassword)
        db('register').insert({
            email: email,
            rollno: rollno,
            password: hashedPassword,
        }).then(console.log)
        res.status(201).send('Registered')
    }
    catch{
        res.status(500).send('Error')
    }
})

app.post('/', (req, res) => {
    const {rollno1, rollno2, rollno3, 
            name1, name2, name3,
            phone1, phone2, phone3,
            email1, email2, email3,
            password1, password2, password3,
            domain_and_preference1, domain_and_preference2, domain_and_preference3 } = req.body;
            db.select('password').from('register').where('rollno', 'rollno1').then(data)
        if (bcrypt.compare(password1, salt, function(err, isMatch) {})) {
            try{
                db('formdata')
                .insert({
                rollno1: rollno1,
                rollno2: rollno2,
                rollno3: rollno3,
                name1: name1,
                name2: name2,
                name3: name3,
                phone1: phone1,
                phone2: phone2,
                phone3: phone3,
                email1: email1,
                email2: email2,
                email3: email3,
                password1:password1,
                password2:password2,
                password3:password3,
                domain_and_preference1: domain_and_preference1,
                domain_and_preference2: domain_and_preference2,
                domain_and_preference3: domain_and_preference3,
                }).then(console.log)
                //res.json(db.database)
                res.status(201).send(Applied)  
            }    
            catch{
                res.status(500).send('Error')
            }
        } 
        else {
            res.status(500).send('Err')
        }
})

//bcrypt.compare(password1, g, function(err, isMatch) {})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})