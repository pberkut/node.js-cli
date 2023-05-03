const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.join('db', 'contacts.json');

const readFile = async () => {
  const data = await fs.readFile(contactsPath, 'utf-8');
  const parseData = JSON.parse(data);
  return parseData;
};

const writeFile = async data => {
  const text = JSON.stringify(data);
  await fs.writeFile(contactsPath, text);
};

const addText = async text => {
  await fs.appendFile(contactsPath, text);
};

async function listContacts() {
  try {
    const contacts = await readFile();
    console.log(contacts);
  } catch (error) {
    console.log(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await readFile();
    const contactById = contacts.filter(contact => contact.id === contactId);
    console.log(contactById);
  } catch (error) {
    console.log(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await readFile();
    const newContacts = contacts.filter(contact => contact.id !== contactId);

    await writeFile(newContacts);
  } catch (error) {
    console.log(error.message);
  }
}

async function addContact(name, email, phone) {
  const id = Date.now().toString();

  const newContact = {
    id,
    name,
    email,
    phone,
  };

  const contacts = await readFile();

  contacts.push(newContact);

  await writeFile(contacts);
}

const contacts = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

module.exports = contacts;
