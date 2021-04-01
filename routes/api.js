const route = require('express').Router();

var validator = require('express-validator');

var mongojs = require('mongojs');
var db = mongojs('placements', ['placements']);

route.use(validator());

///For index.html*/
route.post('/student_reg', (req, res) =>{
    
    req.checkBody('student_department', 'student_department is required in alphabets').isAlpha();
    req.checkBody('student_name', 'student_name is required in alphabets').isAlpha();
    req.checkBody('rollno', 'student roll number is required in integer format').isInt();
    req.checkBody('cgpa', 'CGPA is required in integer format').isInt();

    db.tblstudent.insert(req.body, function(err, doc)
    {
        res.redirect('/');
    });
});
route.post('/company_reg', (req, res) =>{
    
    req.checkBody('company_name', 'Company_name is required in alphabets').isAlpha();
    req.checkBody('department', 'Department is required in alphabets').isAlpha();
    req.checkBody('ctc', 'CTC is required in number').isInt();
    req.checkBody('type', 'TYPE is required in alphabets').isAlpha();
    req.checkBody('estabYear', 'Establishment Year is required in alphabets').isAlpha();
    req.checkBody('country', 'Country is required in alphabets').isAlpha();
    req.checkBody('natureOfBusiness', 'Nature of Business is required in alphabets').isAlpha();
    req.checkBody('cgpaCutOff', 'CGPA cutoff is required in number').isInt();
    req.checkBody('contact', 'Contact is required in number').isMobilePhone();
    db.tblcompany.insert(req.body, function(err, doc)
    {
        res.redirect('/');
    });
});

route.get('/student_details', (req, res) => {
    
    db.tblstudent.find().toArray((err, result) => {
        if (err) return console.log(err)
        // renders index.ejs
        res.render('index.ejs', {quotes: result})
    });
});
route.get('/company_details', (req, res) => {
    
    db.tblcompany.find().toArray((err, result) => {
        if (err) return console.log(err)
        // renders index.ejs
        res.render('company_index.ejs', {quotes: result})
    });
});
route.get('/unregister_company', (req, res) => {
    
    res.render('unregister_company.ejs');
    
});

///to do here
route.post('/company_unreg', (req, res) => {
    
    res.render('company_unregistered.ejs');
    //res.render('company_unregistered.ejs');  
    db.tblcompany.remove({'company_name': req.body.company_name})
               
});

///start here pyush
route.get('/unregister_student', (req, res) => {
    res.render('unregister_student.ejs');
});

route.post('/student_unreg', (req, res) => {
        res.render('student_unregistered.ejs');
        //res.render('company_unregistered.ejs');  
    db.tblstudent.remove({
        'student_name': req.body.student_name, 
        'student_department': req.body.student_department,
        'rollno': req.body.rollno
    })
});

///student_update
route.get('/update_student', (req, res) => {
        res.render('update_student.ejs');
        
});

route.post('/student_upd', (req, res) => {
    db.tblstudent.update({rollno: req.body.rollno},{
        'student_name': req.body.student_name, 
        'student_department': req.body.student_department,
        'cgpa':req.body.cgpa,
        'rollno': req.body.rollno
    },{upsert: true})
    res.render('update_student.ejs');
});

route.get('/search', (req, res) => {
    res.render('search.ejs');
    
});
route.post('/search/company', (req, res) => {
    
    db.tblcompany.find({ $or: [ {department: req.body.department}, {company_name: req.body.company_name}, {ctc: req.body.ctc} ] }).toArray((err, result) => {
        if (err) return console.log(err)
        // renders index.ejs
        res.render('company_index.ejs', {quotes: result})
    });
});

route.post('/search/student', (req, res) => {
    
    db.tblstudent.find({ $or: [{student_department: req.body.student_department}, {student_name: req.body.student_name}, {cgpa: req.body.cgpa}] }).toArray((err, result) => {
        if (err) return console.log(err)
        // renders index.ejs
        res.render('index.ejs', {quotes: result})
    });
    
});


module.exports=route;
