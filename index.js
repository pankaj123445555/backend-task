const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const { fetch_data, send_data, update_data , delete_contact } = require("./Controller/getContact");



 app.get('/getContact',fetch_data);
 app.post('/createContact',send_data);
 app.post('/updateContact',update_data);
 app.post('/deleteContact',delete_contact);

 app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });













































































///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Create a new contact in either 'CRM' or 'DATABASE'
// app.post('/createContact', (req, res) => {
//   const { first_name, last_name, email, mobile_number, data_store } = req.body;
//   console.log(req.body);

//   // Check if data_store is 'CRM' or 'DATABASE'
//   if (data_store !== 'CRM' && data_store !== 'DATABASE') {
//     return res.status(400).send({ error: 'Invalid data_store value' });
//   }

//   // Create a new contact object
//   const newContact = {
//     first_name,
//     last_name,
//     email,
//     mobile_number,
//   };

//   // Get a connection from the pool
 
//   pool.getConnection((err, connection) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).send({ error: 'Database connection error' });
//     }
//     // Select the table based on data_store value
//     const table_name = data_store === 'CRM' ? 'crm_contacts' : 'database_contacts';
//     connection.query(`CREATE TABLE ${table_name} (
//         first_name varchar(255),
//         last_name varchar(255),
//         email varchar(255),
//         mobile_number varchar(255)
//     )`)
//     // Insert the new contact into the table
//     connection.query(`INSERT INTO ${table_name} SET ?`, newContact, (err, result) => {
//       // Release the connection back to the pool
//       connection.release();

//       if (err) {
//         console.error(err);
//         return res.status(500).send({ error: 'Database error' });
//       }

//       // Return the newly created contact object
//       newContact.id = result.insertId;
//       return res.send(newContact);
//     });
//   });
// });



