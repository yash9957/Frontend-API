const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const knex = require('knex')
const port = 3000
const app = express()


const db = knex({
    client:'pg',
    connection:{
        host:'localhost',
        user:'postgres',
        password:'password',
        database:'project',
    }
})

/*db.select('*').from('register').then(data => {
    console.log(data)
})
*/
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('')
})

app.post('/register', async (req, res) => {
    const {roll, name, phone, email, password, branch, div } = req.body;
    try {
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)
        //console.log(salt)
        //console.log(hashedPassword)
        db('register').insert({
            rollno: roll,
            name: name,
            phoneno: phone,
            email: email,
            branch: branch,
            division: div,
            password: hashedPassword,
            //permissioncode: nextval('permissioncode_seq'),
        }).then(console.log)
        res.status(201).send('Registered')
    }
    catch{
        res.status(500).send('Error')
    }
})

app.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    db.select("email", "password")
      .from('register')
      .where("email", "=", email)
      .then( data => {
        const isValid = await bcrypt.compare(password, data.password);
        if (isValid) {
          res.send("Success")
          //.catch((err) => res.status(400).json("unable to get user"));
        } else {
          res.status(400).json("wrong credentials");
        }
      })
      .catch((err) => res.status(400).json("wrong credentials"));
});

app.listen(port, () => {
  console.log(`App listening on port ${port}!`)
})

/*app.post ('/groupform', (req, res) => {
  const {roll1, roll2, roll3, permissioncode1, permissioncode2, permissioncode3} = req.body;
  const text = `SELECT * FROM register WHERE rollno = ${roll1}`
        app.query(text, (err, res) => {
          if(err){
            console.log(err)
          }
          else{
            console.log(res)
          }
        })
  /*if(isvalid1){
    if(isvalid2){
      if(isvalid3){
        db('group').insert({
          rollno1: roll1,
          rollno2: roll2,
          rollno3: roll3,
          permissioncode1: permissioncode1,
          permissioncode2: permissioncode2,
          permissioncode3: permissioncode3,
        }).then(console.log)
        res.status(201).send('Form filled successfully!')
      }
      res.status(404).send('Wrong Credentials')
    }
    res.status(404).send('Wrong Credentials')
  }
  */


/*app.post("/signin/groupformationform", async (req, res) => {
    db.select("email", "password")
      .from("login")
      .where("email", "=", req.body.email)
      .then((data) => {
        const isValid = bcrypt.compareSync(req.body.password, data[0].password);
        if (isValid) {
          return db
            .select("*")
            .from("users")
            .where("email", "=", req.body.email)
            .then((user) => {
              res.json(user[0]);
            })
            .catch((err) => res.status(400).json("unable to get user"));
        } else {
          res.status(400).json("wrong credentials");
        }
      })
      .catch((err) => res.status(400).json("wrong credentials"));
});
*/
