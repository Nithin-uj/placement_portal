const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const util = require('util');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors({
  origin: ['http://localhost:3000','http://192.168.201.100:3000'],
  credentials: true
}));

app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Note: For production, use secure: true
}));

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Nithin@20',
  database: 'placement_portal'
});

db.query = util.promisify(db.query);
db.execute = util.promisify(db.execute);
// db.beginTransaction = util.promisify(db.beginTransaction);
// db.commit = util.promisify(db.commit);
// db.rollback = util.promisify(db.rollback);

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to database.');
});

const objecttostring = (date)=>{
          const year = date['$y'];
          const month = ('0' + (date['$M'] + 1)).slice(-2);
          const day = ('0' + date['$D']).slice(-2);
          let newDate = "";
          newDate = `${year}-${month}-${day}`;
          return newDate;
}

app.post('/register', (req, res) => {
  const {formdata,newDate} = req.body;
//   console.log(formdata)
//   console.log("newdata "+newDate)
  const hashedPassword = bcrypt.hashSync(formdata.cpassword, 10);
//   console.log(hashedPassword);
if(formdata.diplomapyear === '' || formdata.diplomaper === ''){
    formdata.diplomapyear = 0;
    formdata.diplomaper = -1;
}
else if(formdata.twelfthpyear === '' || formdata.twelfthper === ''){
    formdata.twelfthpyear = 0;
    formdata.twelfthper = -1; 
}
if(formdata.sphno === ''){
  formdata.sphno = null;
}
const sql = "INSERT INTO Student (usn,email,fullname,dob,gender,pphno,sphno,presentaddr,permanentaddr,bepassingyear,ccgpa,branch,syear,ssem,section,etype,twelfthpyear,twelfthper,diplomapyear,diplomaper,tenthpyear,tenthper,backlog,cpassword) values(?)";
const value = [formdata.usn,formdata.email,formdata.fullname,newDate,formdata.gender,formdata.pphno,formdata.sphno,formdata.presentaddr,formdata.permanentaddr,formdata.bepassingyear,formdata.ccgpa,formdata.branch,formdata.syear,formdata.ssem,formdata.section,formdata.etype,formdata.twelfthpyear,formdata.twelfthper,formdata.diplomapyear,formdata.diplomaper,formdata.tenthpyear,formdata.tenthper,formdata.backlog,hashedPassword];
  db.query(sql, [value], (err, result) => {
    if (err) {
        if(err.code === "ER_DUP_ENTRY"){
            return res.status(500).send('USN Already Exist');
        }
        // console.log(err);
        return res.status(500).send('Server down failed to register');
    }
    res.status(201).send({ message: 'Student Successfully registered' });
  });
});

app.post('/adminregister',(req,res)=>{
  // const data = req.body;
  // console.log(data.email);
  // console.log(data.password);

  const hashed = bcrypt.hashSync(req.body.cpassword, 10);
  const sql = "INSERT INTO Admin (name,email,phno,type,password) values (?)";
  const value = [req.body.name,req.body.email,req.body.phno,req.body.type,hashed]
  db.query(sql,[value],(err,result)=>{
    if(err) return res.status(500).send(err)
    return res.status(201).send("Admin added successfully")
  })
  // res.status(200).send({ message: 'Sent' });
})


app.post('/login', (req, res) => {
  const { usn, password } = req.body;
  db.query('SELECT usn,email,cpassword FROM Student WHERE usn = ?', [usn], (err, results) => {
    if (err) return res.status(500).send('Server error');
    if (results.length === 0) return res.status(404).send('USN Not Registered');

    const user = results[0];
    const passwordIsValid = bcrypt.compareSync(password, user.cpassword);

    if (!passwordIsValid) return res.status(401).send('Incorrect password');
      req.session.user = {
      usn: user.usn,
      email: user.email
    };
    // console.log(req.session);
    
    res.status(200).send({ message: 'Login successful' });
  });
});

// Verify User
app.get('/me', (req, res) => {
  if (!req.session.user) {
    return res.status(401).send('Not authenticated');
  }
  res.status(200).send(req.session.user);
});

app.get('/isadmin', (req, res) => {
  if (!req.session.admin) {
    return res.status(401).send('Not authenticated');
  }
  res.status(200).send(req.session.admin);
});

// Logout User
app.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send('Could not log out');
    }
    res.status(200).send({ message: 'Logout successful' });
  });
});

app.post('/adminlogin', (req, res) => {
  const { email, password } = req.body;
  db.query('SELECT * FROM Admin WHERE email = ?', [email], (err, results) => {
    if (err) return res.status(500).send('Server error');
    if (results.length === 0) return res.status(404).send('Email not found');

    const admin = results[0];
    const passwordIsValid = bcrypt.compareSync(password, admin.password);

    if (!passwordIsValid) return res.status(401).send('Incorrect password');
      req.session.admin = {
      adminname: admin.name,
      adminemail: admin.email,
      admintype: admin.type,
    };
    // console.log(req.session);
    
    res.status(200).send({ message: 'Login successful' });
  });
});

app.post('/adminlist',(req,res)=>{
  db.query("SELECT name,email,type,phno FROM Admin order by name",(err,result)=>{
    if(err) return res.status(500).send('Server error');
    res.status(200).send(result);
  })
})
app.post('/admingetedit',(req,res)=>{
  db.query(`SELECT name,email,type,phno FROM Admin where email = '${req.body.email}'`,(err,result)=>{
    if(err) return res.status(500).send('Server error');
    res.status(200).send(result);
  })
})
app.post('/adminprofileedit',(req,res)=>{
  // console.log(req.body);
  const {email,name,phno} = req.body;
  db.query(`UPDATE Admin SET name = '${name}',phno = ${phno} where email = '${email}'`,(err,result)=>{
    if(err) return res.status(500).send('Server error');
    res.status(200).send(result);
  })
})
app.post('/adminemailedit',(req,res)=>{
  // console.log(req.body);
  const {oldemail,email} = req.body;
  db.query(`UPDATE Admin SET email ='${email}' where email = '${oldemail}'`,(err,result)=>{
    if(err) return res.status(500).send('Server error');
    res.status(200).send(result);
  })
})
app.post('/adminpasswordedit',(req,res)=>{
  console.log(req.body);
  const {email,oldpassword,cpassword} = req.body;
  db.query(`SELECT password from Admin where email = '${email}'`,(err,result)=>{
    if(err) return res.status(500).send('Failed to update');
    else{
      // console.log(result[0].password);
      if(bcrypt.compareSync(oldpassword,result[0].password)){
        const hashed = bcrypt.hashSync(cpassword, 10);
        db.query(`UPDATE Admin SET password = '${hashed}' where email = '${email}'`,(err2,result2)=>{
          if(err2){return res.status(500).send('Failed to update')};
          return res.status(200).send("Password Updated");
        })
      }
      else{
        return res.status(500).send('Incorrect Current password')
      }
    }
  })

})
app.post('/adminedit',(req,res)=>{
  console.log(req.body);
  const hashed = bcrypt.hashSync(req.body.admindata.cpassword, 10);
  const {name,email,type,phno} = req.body.admindata;
  const oldemail = req.body.adminemail;
  // const sql = "INSERT INTO Admin (name,email,phno,type,password) values (?)";
  const sql = `UPDATE Admin SET name = '${name}',email='${email}',type='${type}',phno='${phno}',password='${hashed}' where email = '${oldemail}'`
  // const value = [req.body.name,req.body.email,req.body.phno,req.body.type,hashed]
  db.query(sql,(err,result)=>{
    if(err) return res.status(500).send(err);
    return res.status(201).send("Admin details updated");
  })
})
app.post('/removeadmin',(req,res)=>{
  db.query(`DELETE from Admin where email = '${req.body.email}'`,(err,result)=>{
    if(err) return res.status(500).send("err");
    res.status(200).send("Admin removed");
  })
})
app.post('/getbranchdetails',(req,res)=>{
  db.query(`select branch,count(USN) as value from Student group by branch`,(err,result)=>{
    if(err) return res.status(500).send("err");
    res.status(200).send(result);
  })
})

app.post('/getgenderdetails',(req,res)=>{
  db.query(`select gender,count(USN) as value from Student group by gender`,(err,result)=>{
    if(err) return res.status(500).send("err");
    res.status(200).send(result);
  })
})

app.post('/getstudentdetails',(req,res)=>{
  db.query(`SELECT usn,fullname,email,dob,gender,pphno,sphno,presentaddr,permanentaddr,bepassingyear,ccgpa,branch,syear,ssem,section,etype,twelfthpyear,twelfthper,diplomapyear,diplomaper,tenthpyear,tenthper,backlog,resume
  FROM Student WHERE usn='${req.body.usn}'`,(err,result)=>{
    if(err) return res.status(500).send("err");
    res.status(200).send(result);
  })
})

app.post('/getstudentlist',(req,res)=>{
  db.query(`SELECT usn,fullname,email,dob,gender,pphno,sphno,presentaddr,permanentaddr,bepassingyear,ccgpa,branch,syear,ssem,section,etype,twelfthpyear,twelfthper,diplomapyear,diplomaper,tenthpyear,tenthper,backlog,resume
  FROM Student`,(err,result)=>{
    if(err) return res.status(500).send("err");
    res.status(200).send(result);
  })
})

app.post('/addcompany',async (req,res)=>{
  const companydata = req.body.companydata;
  const {arrivaldate,lastdate,branches } = req.body;
  // console.log(req.body);
  const hashed = bcrypt.hashSync(companydata.cpassword, 10);
  const sql = "INSERT INTO Job (cname,email,type,role,jd,location,fulltimectc,internship,stipendpm,durationinm,backlogs,becutoff,twelfthcutoff,diplomacutoff,tenthcutoff,info,status,arrivaldate,lastdate,password) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const value = [companydata.cname,companydata.email,companydata.type,companydata.role,companydata.jd,companydata.location,companydata.fulltimectc,companydata.internship,companydata.stipend,companydata.duration,companydata.backlogs,companydata.becutoff,companydata.twelfthcutoff,companydata.diplomacutoff,companydata.tenthcutoff,companydata.info,companydata.status,arrivaldate,lastdate,hashed];
  const sql2 = "INSERT INTO Branch (jid,AIML,CSE,ISE,ECE,EEE,ME,CV) values(?,?,?,?,?,?,?,?)";
     
  db.beginTransaction((err) => {
    if(err) return res.status(500).send("bT failed");
    db.query(sql, value,(err,jobResult)=> {
      if (err) {
          db.rollback(function() {
              console.error('Job insertion failed:', err);
              res.status(500).send("Error while adding company");
          });
          return;
      }
      const jobId = jobResult.insertId;
      const value2 = [jobId,branches.AIML,branches.CSE,branches.ISE,branches.ECE,branches.EEE,branches.ME,branches.CV];
      // console.log(jobId);
      db.query(sql2, value2, function(err) {
        if (err) {
            db.rollback(function() {
                console.error('Branch insertion failed:', err);
                res.status(500).send("Error while adding branches");
            });
        } else {
            db.commit(function(err) {
                if (err) {
                    db.rollback(function() {
                        console.error('Transaction commit failed:', err);
                        res.status(500).send("Error committing transaction");
                    });
                } else {
                    res.status(201).send("Company and branches added successfully");
                }
            });
        }
    });
  })
})

})

app.post('/getjobidandname',(req,res)=>{
  db.query(`SELECT jid,cname FROM Job`,(err,result)=>{
    if(err) return res.status(500).send("err");
    res.status(200).send(result);
  })
})

app.post('/getcompanydetails',(req,res)=>{
  // console.log(req.body);
  db.query(`SELECT * FROM Job where jid=${req.body.cid}`,(err,result)=>{
    if(err) return res.status(500).send("err");
    console.log(result);
    res.status(200).send(result);
  })
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
