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
	origin: ['http://localhost:3000','http://192.168.203.194:3000','http://edugiri.cloud'],
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
  database: 'placement_portal',
  multipleStatements: true
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
            return res.status(501).send('USN Already Exist');
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

app.post('/removestudent',(req,res)=>{
  const {usn} = req.body;
  sql = `DELETE from Student where usn='${usn}'`;
  db.query(sql,(err,result)=>{
    // if(err) return res.status(500).send("Failed to remove student");
    if(err) return res.status(500).send(err);
    else{
      return res.status(200).send("Student removed")
    }
  })
})

app.post('/login', (req, res) => {
  const { usn, password } = req.body;
  db.query('SELECT usn,fullname,email,cpassword FROM Student WHERE usn = ?', [usn], (err, results) => {
    if (err) return res.status(500).send('Server error');
    if (results.length === 0) return res.status(404).send('USN Not Registered');

    const user = results[0];
    const passwordIsValid = bcrypt.compareSync(password, user.cpassword);

    if (!passwordIsValid) return res.status(401).send('Incorrect password');
      req.session.user = {
      usn: user.usn,
      fullname: user.fullname,
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

app.get('/iscompany', (req, res) => {
  if (!req.session.company) {
    return res.status(401).send('Not authenticated');
  }
  res.status(200).send(req.session.company);
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

app.post('/companylogin',(req,res)=>{
  const { email, password } = req.body;
  db.query('SELECT cname,password,email FROM Job WHERE email = ?', [email], (err, results) => {
    if (err) return res.status(500).send('Server error');
    if (results.length === 0) return res.status(404).send('Email not found');
    const res2 = results[0];
    const passwordIsValid = bcrypt.compareSync(password, res2.password);

    if (!passwordIsValid) return res.status(401).send('Incorrect password');
      req.session.company = {
      cname: res2.cname,
      cemail: res2.email,
    };
    // console.log(req.session);
    
    res.status(200).send({ message: 'Login successful' });
  });
})

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
app.post('/getusnandname',(req,res)=>{
  db.query(`SELECT usn,fullname FROM Student`,(err,result)=>{
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

app.post('/editstudent',(req,res)=>{
  const {sd} = req.body;

  if(sd.diplomapyear === '' || sd.diplomaper === ''){
    sd.diplomapyear = 0;
    sd.diplomaper = -1;
  }
  else if(sd.twelfthpyear === '' || sd.twelfthper === ''){
      sd.twelfthpyear = 0;
      sd.twelfthper = -1; 
  }
  if(sd.sphno === ''){
    sd.sphno = null;
  }

  const sql = `UPDATE Student SET email=(?),fullname=(?),dob=(?),gender=(?),pphno=(?),sphno=(?),presentaddr=(?),permanentaddr=(?),bepassingyear=(?),ccgpa=(?),branch=(?),syear=(?),ssem=(?),section=(?),etype=(?),twelfthpyear=(?),twelfthper=(?),diplomapyear=(?),diplomaper=(?),tenthpyear=(?),tenthper=(?),backlog=(?) WHERE usn='${sd.usn}'`;
  const value = [sd.email,sd.fullname,sd.dob,sd.gender,sd.pphno,sd.sphno,sd.presentaddr,sd.permanentaddr,sd.bepassingyear,sd.ccgpa,sd.branch,sd.syear,sd.ssem,sd.section,sd.etype,sd.twelfthpyear,sd.twelfthper,sd.diplomapyear,sd.diplomaper,sd.tenthpyear,sd.tenthper,sd.backlog];
  db.query(sql,value,(err,result)=>{
    if(err) return res.status(400).send(err)
    else{
    res.status(201).send("Updated");
    }
  })
})

app.post('/getstudentbranch',(req,res)=>{
  db.query(`select branch from Student where usn='${req.body.usn}'`,(err,result)=>{
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
              // console.error('Job insertion failed:', err);
              res.status(500).send(err);
          });
          return;
      }
      const jobId = jobResult.insertId;
      const value2 = [jobId,branches.AIML,branches.CSE,branches.ISE,branches.ECE,branches.EEE,branches.ME,branches.CV];
      // console.log(jobId);
      db.query(sql2, value2, function(err) {
        if (err) {
            db.rollback(function() {
                // console.error('Branch insertion failed:', err);
                res.status(500).send("Error while adding branches");
            });
        } else {
            db.commit(function(err) {
                if (err) {
                    db.rollback(function() {
                        // console.error('Transaction commit failed:', err);
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

app.post('/editcompany',(req,res)=>{
  const {companydata,branches,arrivaldate,lastdate} = req.body;
  // console.log(companydata);
  // console.log(branches);
  // console.log(arrivaldate);
  // console.log(lastdate);
  const sql = `UPDATE Job SET cname=(?),email=(?),type=(?),role=(?),jd=(?),location=(?),fulltimectc=(?),internship=(?),stipendpm=(?),durationinm=(?),backlogs=(?),becutoff=(?),twelfthcutoff=(?),diplomacutoff=(?),tenthcutoff=(?),info=(?),status=(?),arrivaldate=(?),lastdate=(?) WHERE jid=${companydata.jid}`;
  const value = [companydata.cname,companydata.email,companydata.type,companydata.role,companydata.jd,companydata.location,companydata.fulltimectc,companydata.internship,companydata.stipendpm,companydata.durationinm,companydata.backlogs,companydata.becutoff,companydata.twelfthcutoff,companydata.diplomacutoff,companydata.tenthcutoff,companydata.info,companydata.status,arrivaldate,lastdate];
  const sql2 = `UPDATE Branch SET AIML=(?),CSE=(?),ISE=(?),ECE=(?),EEE=(?),ME=(?),CV=(?) WHERE jid=${companydata.jid}`;
  const value2 = [branches.AIML,branches.CSE,branches.ISE,branches.ECE,branches.EEE,branches.ME,branches.CV];
   
  db.beginTransaction((err) => {
    if(err) return res.status(500).send("bT failed");
    db.query(sql,value,(err,jobResult)=> {
      if (err) {
          db.rollback(function() {
              console.log('Job update failed:', err);
              res.status(500).send("Error while updating company");
          });
          return;
      }
      db.query(sql2, value2, function(err) {
        if (err) {
            db.rollback(function() {
                console.log('Branch update failed:', err);
                res.status(500).send("Error while updating branches");
            });
        } else {
            db.commit(function(err) {
                if (err) {
                    db.rollback(function() {
                        console.log('Transaction commit failed:', err);
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

app.post('/removecompany',(req,res)=>{
  const {jid} = req.body;
  const sql = `DELETE FROM Branch where jid=${jid}`
  const sql2 = `DELETE FROM Job where jid=${jid}`

  db.beginTransaction((err) => {
    if(err) return res.status(500).send("BT failed");
    db.query(sql,(err)=> {
      if (err) {
          db.rollback(function() {
              // console.log('Branch deletion failed:', err);
              res.status(500).send("Error while deleting branch");
          });
          return;
      }
      db.query(sql2,function(err) {
        if (err) {
            db.rollback(function() {
                // console.log('Company deletion failed:', err);
                res.status(500).send("Error while deleting company");
            });
        } else {
            db.commit(function(err) {
                if (err) {
                    db.rollback(function() {
                        // console.log('Transaction commit failed:', err);
                        res.status(500).send("Error committing transaction");
                    });
                } else {
                    res.status(201).send("Company and branches deleted successfully");
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
  db.query(`SELECT jid,cname,email,type,role,jd,location,fulltimectc,backlogs,becutoff,twelfthcutoff,diplomacutoff,tenthcutoff,internship,stipendpm,durationinm,info,status,arrivaldate,lastdate FROM Job where jid=${req.body.jid}`,(err,result)=>{
    if(err) return res.status(500).send("err");
      db.query(`SELECT AIML,CSE,ISE,ECE,EEE,ME,CV FROM Branch where jid = ${req.body.jid}`,(err2,result2)=>{
        if(err2) return res.status(500).send("err");
          res.status(200).send({companydetails : result,branchdetails: result2});
      })
  })
})

app.post('/showcompany',(req,res)=>{
  db.query(`SELECT jid,cname,role,arrivaldate,lastdate FROM Job`,(err,result)=>{
    if(err) return res.status(500).send("err");
    res.status(200).send(result);
  })
})

app.post("/changecpassword",(req,res)=>{
  const {jid} = req.body;
  const hashed = bcrypt.hashSync(req.body.cpassword, 10);
  sql = `UPDATE Job SET password='${hashed}' WHERE jid=${jid}`;
  db.query(sql,(err,result)=>{
    if(err){
      // console.log(err);
     return res.status(500).send("Failed to update");
    }  
    res.status(200).send("Updated Successfully");
  })
})

app.post("/sample",(req,res)=>{
    console.log("Client contacted");
   return res.status(200).send("Server Connected");
})

app.post('/getappliablelist',(req,res)=>{
  const {usn,sbranch} = req.body;
  const sql = `SELECT Job.jid,cname,type,role,fulltimectc,arrivaldate,becutoff,diplomacutoff,twelfthcutoff,tenthcutoff,lastdate,CASE WHEN Job.jid IN(SELECT Applied.jid FROM Applied where usn='${usn}') THEN 'applied' ELSE 'not applied' end as astatus from Job join Branch on Job.jid = Branch.jid where Job.arrivaldate<=now() and Job.lastdate>=now() and Branch.${sbranch}=true ORDER BY Job.arrivaldate`;
  db.query(sql,(err,result)=>{
    if(err){
      // console.log(err);
      return res.status(500).send(err);
    }
    res.status(200).send(result);
  })
})

app.post('/getupcomminglist',(req,res)=>{
  const {branch} = req.body;
  db.query(`SELECT Job.jid,cname,type,role,arrivaldate from Job join Branch on Job.jid=Branch.jid where Branch.${branch}=true and Job.arrivaldate>now() and Job.lastdate>now() order by Job.arrivaldate`,(err,result)=>{
    if(err){
      console.log(err);
      return res.status(500).send(err);
    }
    res.status(200).send(result);
  })
})

app.post('/getpastlist',(req,res)=>{
  const {branch} = req.body;
  db.query(`SELECT Job.jid,cname,type,role,lastdate from Job join Branch on Job.jid=Branch.jid where Branch.${branch}=true and Job.lastdate<now() and Job.arrivaldate<now() order by Job.lastdate desc`,(err,result)=>{
    if(err){
      console.log(err);
      return res.status(500).send(err);
    }
    res.status(200).send(result);
  })
})

app.post('/getappliedlist',(req,res)=>{
  const {usn,sbranch} = req.body;
  db.query(`SELECT * FROM Job JOIN Applied on Job.jid=Applied.jid where Applied.usn='${usn}' order by appliedat`,(err,result)=>{
    if(err){
      // console.log(err);
      return res.status(500).send(err);
    }
    res.status(200).send(result);
  })
})

app.post('/getplaceddetails',(req,res)=>{
  const {usn} = req.body;
  const sql = `select Job.jid,cname,type,role,fulltimectc from Placed JOIN Job on Placed.jid=Job.jid where usn='${usn}'`;
  db.query(sql,(err,result)=>{
    if(err){
      // console.log(err);
      return res.status(500).send("err");
    }
    res.status(200).send(result);
  })
})

app.post('/updatestudentpassword',(req,res)=>{
  const {usn,op,np} = req.body;
  sql = `SELECT cpassword from Student where usn='${usn}'`;
  db.query(sql,(err,result)=>{
    if(err) return res.status(501).send("Failed to check password");
    if(bcrypt.compareSync(op,result[0].cpassword)){
      const hashed = bcrypt.hashSync(np, 10);
      db.query(`UPDATE Student set cpassword='${hashed}' where usn='${usn}'`,(err2,result2)=>{
        if(err2) return res.status(502).send("Failed to update");
        return res.status(200).send("Password changed")
      })
    }
    else{
      return res.status(401).send("Wrong password")
    }
  })


})

app.post('/getresumelink',(req,res)=>{
  const {usn} = req.body;
  const sql = `SELECT resume from Student where usn='${usn}'`;
  db.query(sql,(err,result)=>{
    if(err) return res.status(500).send("Filed to get resume");
    return res.status(200).send(result);
  })
})

app.post('/updateresumelink',(req,res)=>{
  const {usn,resume} = req.body;
  const sql = `UPDATE Student set resume='${resume}' where usn='${usn}'`;
  db.query(sql,(err,result)=>{
    if(err) return res.status(500).send("Filed to update resume");
    return res.status(200).send(result);
  })
})

app.post('/applyforjob',(req,res)=>{
  const {jid,usn} = req.body;
  const sql = `INSERT INTO Applied(usn,jid,appliedat) values('${usn}',${jid},NOW())`;
  db.query(sql,(err,result)=>{
    if(err) return res.status(500).send("Error while applying for job");
    res.status(200).send('Applied');
  })
})

app.post('/geteditcontrols',(req,res)=>{
  const sql = `SELECT value FROM Controls WHERE type = 'studentprofileedit'`;
  db.query(sql,(err,result)=>{
    if(err) return res.status(500).send("Error while getting controls");
    res.status(200).send(result);
  })
})

app.post('/updatecontrols',(req,res)=>{
  const {value}=req.body
  const sql = `update Controls set value=${value} WHERE type = 'studentprofileedit'`;
  db.query(sql,(err,result)=>{
    if(err) return res.status(500).send("Error while updating controls");
    res.status(200).send("Controls updated");
  })
})

app.post('/getstudentforjid',(req,res)=>{
  const {jid} = req.body
  // should exclude password column
  const sql = `SELECT * FROM Student JOIN Applied on Student.usn = Applied.usn WHERE Applied.jid = '${jid}'`;
  db.query(sql,(err,result)=>{
    if(err) return res.status(500).send("Error while getting details");
    res.status(200).send(result);
  })
})

app.post('/addplacedstudent',(req,res)=>{
  const {usn,jid} = req.body
  const sql = `INSERT INTO Placed (usn,jid,placedon) values ('${usn}','${jid}',NOW())`;
  db.query(sql,(err,result)=>{
    if(err) return res.status(500).send(err);
    res.status(200).send(result);
  })
})

app.post('/getplacedstudents',(req,res)=>{
  // should exclude password column
  const sql = `SELECT * FROM Placed Join Student on Placed.usn=Student.usn JOIN Job on Placed.jid=Job.jid`;
  db.query(sql,(err,result)=>{
    if(err) return res.status(500).send(err);
    res.status(200).send(result);
  })
})

app.post('/removeplacedstudent',(req,res)=>{
  const {usn} = req.body;
  const sql = `DELETE FROM Placed where usn='${usn}'`;
  db.query(sql,(err,result)=>{
    if(err) return res.status(500).send("err");
    res.status(200).send(result);
  })
})

app.post('/updatefeedback',(req,res)=>{
  const {usn,feedback} = req.body;
  const sql = `UPDATE Placed set feedback='${feedback}' where usn='${usn}'`;
  db.query(sql,(err,result)=>{
    if(err) return res.status(500).send("err");
    res.status(200).send(result);
  })
})

app.post('/getfeedback',(req,res)=>{
  // should exclude password column
  const sql = `SELECT * FROM Placed JOIN Student on Placed.usn = Student.usn JOIN Job on Placed.jid = Job.jid where Placed.feedback!="" or Placed.feedback!=null`;
  db.query(sql,(err,result)=>{
    if(err) return res.status(400).send("Error while getting details");
    return res.status(200).send(result);
  })
})

app.post('/studentspercompany',(req,res)=>{
  const {jid} = req.body;
  // should exclude password column
  const sql = `SELECT *,Student.email as semail FROM Applied JOIN Student on Applied.usn = Student.usn JOIN Job on Applied.jid = Job.jid WHERE Applied.jid = '${jid}'`;
  db.query(sql,(err,result)=>{
    if(err) return res.status(400).send("Error while getting details");
    return res.status(200).send(result);
  })
})

app.post('/getanalysis',(req,res)=>{
  const sql = `
  SELECT 
    (SELECT count(Student.usn) FROM Student) as studentcount, 
    (SELECT count(Placed.usn) FROM Placed) as placedcount,
    (SELECT count(Job.jid) FROM Job) as jobcount,
    (SELECT max(Job.fulltimectc) FROM Placed join Job on Placed.jid=Job.jid) as maxctc,
    (SELECT avg(Job.fulltimectc) FROM Placed join Job on Placed.jid=Job.jid) as avgctc
  `;
  db.query(sql,(err,result)=>{
    if(err) return res.status(400).send(err);
    const sql2 = `SELECT type,count(Job.type) as typecount FROM Job group by Job.type`;
    db.query(sql2,(err2,result2)=>{
      if(err2) return res.status(400).send(err2);
      const sql3 = `SELECT Student.branch,max(Job.fulltimectc) as max,avg(Job.fulltimectc) as avg from Placed join Job on Placed.jid=Job.jid join Student on Placed.usn=Student.usn GROUP BY branch ORDER BY Student.branch`;
      db.query(sql3,(err3,result3)=>{
        if(err3) return res.status(400).send(err3);
        return res.status(200).send({sql1:result,sql2:result2,sql3:result3});
      })
    })
  })
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
