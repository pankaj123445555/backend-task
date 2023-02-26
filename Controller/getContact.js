// const db = require('../models/db');


const pool = require('../models/db')();

 
const fetch_data = (req,res)=>{
   
     
    const { contact_id,data_store } = req.body;
    
  
    // Check if data_store is 'CRM' or 'DATABASE'
    if (data_store !== 'CRM' && data_store !== 'DATABASE') {
      return res.status(400).send({ error: 'Invalid data_store value' });
    }
  
   
      
  
      // Select the table based on data_store value
      const table = data_store === 'CRM' ? 'crm_contacts' : 'database_contacts';
  
      // Get the contact with the specified ID
      pool.query(`SELECT * FROM ${table} WHERE contact_id = ${contact_id}`, (err, results) => {
        
        if (err) {
          console.error(err);
          return res.status(500).send({ error: 'Database error' });
        }
  
        // Check if the contact exists
        if (results.length === 0) {
          return res.status(404).send({ error: 'Contact not found' });
        }
  
        // Return the contact object
        const contact = results[0];
        return res.send(contact);
      });
    
}

const send_data =  (req,res) => {

      const { first_name, last_name, email, mobile_number, data_store } = req.body;
  
  console.log(req.body)

  // Check if data_store is 'CRM' or 'DATABASE'
  if (data_store != 'CRM' && data_store != 'DATABASE') {
    return res.status(400).send({ error: 'Invalid data_store value' });
  }

  // Create a new contact object
  const newContact = {
    first_name,
    last_name,
    email,
    mobile_number,
  };

  
    // Select the table based on data_store value
    const table_name = data_store === 'CRM' ? 'crm_contacts' : 'database_contacts';
    pool.query(`CREATE TABLE IF NOT EXISTS ${table_name} (
        first_name varchar(255),
        last_name varchar(255),
        email varchar(255),
        mobile_number varchar(255),
        contact_id int AUTO_INCREMENT PRIMARY KEY
    )`)
    // Insert the new contact into the table
    pool.query(`INSERT INTO ${table_name} SET ?`, newContact, (err, result) => {
     
      if (err) {
        console.error(err);
        return res.status(500).send({ error: 'Database error' });
      }

      // Return the newly created contact object
      newContact.id = result.insertId;
      return res.send(newContact);
    });

}


// this is for updating the data 

const update_data = (req,res) =>{

  const { contactId,new_email,new_number , data_store } = req.body;
    console.log(req.body);
  
  // Check if data_store is 'CRM' or 'DATABASE'
  if (data_store !== 'CRM' && data_store !== 'DATABASE') {
    return res.status(400).send({ error: 'Invalid data_store value' });
  }
  const table = data_store === 'CRM' ? 'crm_contacts' : 'database_contacts';

  // write a query to update the email and phone number
  const sql = `UPDATE ${table} SET email='${new_email}', mobile_number =${new_number} WHERE contact_id=${contactId}`;

  pool.query(sql, (err, result) => {
    if (err) throw err;

    // return an updated data using the same contact id
    return  (
      pool.query(`SELECT * FROM ${table} WHERE contact_id = ${contactId}`, (err, results) => {
        
      
       
        if (results.length === 0) {
          return res.status(404).send({ error: 'Contact not found' });
        }
  
        // Return the contact object
        const contact = results[0];
        return res.send(contact);
      })
    )
  });

}
const delete_contact = (req,res) =>{
  
  const {contact_id , data_store} = req.body;

  // Check if data_store is 'CRM' or 'DATABASE'
  if (data_store !== 'CRM' && data_store !== 'DATABASE') {
    return res.status(400).send({ error: 'Invalid data_store value' });
  }
  const table = data_store === 'CRM' ? 'crm_contacts' : 'database_contacts';

// sql command to delete the contact using contact_id
const sql = `DELETE FROM ${table} WHERE contact_id = ${contact_id}`;
pool.query(sql, (err, result) => {
  if (err) {
    console.error('Error deleting contact: ' + err);
    return;
  }
   return res.send(result);
});
}

module.exports = {fetch_data,send_data,update_data, delete_contact}