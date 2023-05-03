const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.join('db', 'contacts.json');

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    const parseData = JSON.parse(data);
    console.log(parseData);
  } catch (error) {
    console.log(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const data = listContacts();
    // const parseData = JSON.parse(data);
    const contactById = data.filter(contact => contact.id === contactId);
    console.log(contactById);
  } catch (error) {
    console.log(error.message);
  }
}

async function removeContact(contactId) {
  try {
  } catch (error) {
    console.log(error.message);
  }
}

function addContact(name, email, phone) {}

const contacts = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

module.exports = contacts;
