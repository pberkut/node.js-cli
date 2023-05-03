const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

const readFile = async () => {
  const data = await fs.readFile(contactsPath);
  const parseData = JSON.parse(data);
  return parseData;
};

const writeFile = async data => {
  const text = JSON.stringify(data);
  await fs.writeFile(contactsPath, text);
};

async function listContacts() {
  try {
    const contacts = await readFile();
    return contacts;
  } catch (error) {
    console.log(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await readFile();
    const contactById = contacts.find(contact => contact.id === contactId);
    if (!contactById) {
      return 'Not find contact.';
    }
    return [contactById];
  } catch (error) {
    console.log(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await readFile();
    const removedContact = await getContactById(contactId);
    const newContacts = contacts.filter(contact => contact.id !== contactId);
    await writeFile(newContacts);
    return removedContact;
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

  return [newContact];
}

const contacts = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

module.exports = contacts;
