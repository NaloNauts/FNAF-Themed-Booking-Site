//INCLUDING NEEDED APIS AND MODULES
const express = require("express"); // imports express
const Workshop = require("../Models/Workshop"); //imports workshop Models
const workshoprouter = express.Router(); // imports express router
const router = express() //sets app to be the express engine
const mongoose = require("mongoose"); // imports mongoose API
const bodyParser = require("body-parser"); //imports body parser middelware
router.use(express.json()); //allows json files
router.use(bodyParser.urlencoded({extended: true})); //used for form submissions

//route to workshop page
workshoprouter.get("/", (req,res)=>{ 
    res.render("workshops")
})

//this sends data to the database from a html form and redirects to the homepage
workshoprouter.post('/register', (req, res) => {
    const { fname, lname, email, phNo, dateOfWorkshop, timeofWorkshop, card_number, card_expiry_date, card_cvv} = req.body;
  
    if (!fname || !lname || !email || !phNo || !dateOfWorkshop || !timeofWorkshop || !card_number || !card_expiry_date || !card_cvv ) {
        return res.status(400).json({ error: 'A required field is not being supplied' });
    }
  
    const newWorkshop = new Workshop({
        fname,
        lname,
        email,
        phNo,
        dateOfWorkshop,
        timeofWorkshop,
        card_number,
        card_expiry_date,
        card_cvv,
  
    });
  
    newWorkshop.save()
        .then(savedWorkshop => {
          res.redirect('/workshops/display');
        })
        .catch(error => {
            res.status(400).json({ error: error. message });
        });
    });

// Route to render the page with a form to edit entries
workshoprouter.get('/chooseedit', async (req, res) => {
    try {
      const entries = await Workshop.find();
      res.render('chooseedit', { entries });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });



  // Route that renders the selected Workshop to edit
workshoprouter.get('/edit', async (req, res) => {
    const entryID = req.query.WorkshopID;
    res.redirect(`/workshops/edit/${entryID}`);
    
});

workshoprouter.get('/edit/:id', async (req,res) => {
  try {
    const workshop = await Workshop.findById(req.params.id);
    res.render('edit', { workshop });
} catch (err) {
    console.error(err);
}
});

workshoprouter.post('/update/:id', async (req, res) => {
  const workshopId = req.params.id; 
  console.log(workshopId);


  const updatedWorkshopDetails = {
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      phNo: req.body.phNo,
      dateOfWorkshop: req.body.dateOfWorkshop,
      timeofWorkshop: req.body.timeofWorkshop,
      card_number: req.body.card_number,
      card_cvv: req.body.card_cvv,
      card_expiry_date: req.body.card_expiry_date,
  };

  try {
      // Use findByIdAndUpdate to update 
      const updatedWorkshop = await Workshop.findByIdAndUpdate(workshopId, updatedWorkshopDetails, { new: true });
      res.redirect('/workshops/display'); 
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
});

//this gets all the entries in workshops model and renders them on the choosedelete page to be chosen from
workshoprouter.get('/choosedelete', async (req, res) => {
    try {
      const entries = await Workshop.find();
      res.render('choosedelete', { entries });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });


//this takes the objectID from the choosedelete page and then deletes the respective entry from the database
workshoprouter.post('/delete', async (req, res) => {
    const entryID = req.body.WorkshopID;
  
    try {
      const deletedItem = await Workshop.findByIdAndDelete(entryID);
  
      if (!deletedItem) {
        return res.status(404).send('Workshop not found');
      }
  
      res.redirect('/workshops/display');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  


  //This displays workshop info on the viewbookings page
workshoprouter.get('/display', async (req, res) => {
    try {
      const bookings = await Workshop.find();
      res.render('viewbookings', { bookings });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  });

  //search page for workshops
workshoprouter.get('/report', async (req, res) => {
  try {
    const bookings = await Workshop.find();
    res.render('search', { bookings });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});



//renders workshops within specified criteria 
workshoprouter.post('/reportEntries', async (req, res) => {
  const { fname, lname, startDate, endDate } = req.body;
  try {
    const workshops = await Workshop.find({
      fname: new RegExp(fname, 'i'), // searches for firstname ignoring case
      lname: new RegExp(lname, 'i'), // searches for lastname ignoring case
      dateOfWorkshop: { $gte: new Date(startDate), $lte: new Date(endDate) },
    });
    res.render('report', { workshops });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = workshoprouter;