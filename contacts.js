const fs = require('fs/promises');
const path = require('path');
const { randomUUID } = require('crypto');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

const getAllContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const writeFile = async data => {
  const text = JSON.stringify(data);
  await fs.writeFile(contactsPath, text);
};

async function listContacts() {
  try {
    const contacts = await getAllContacts();
    return contacts;
  } catch (error) {
    console.log(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await getAllContacts();
    const contactById = contacts.find(contact => contact.id === contactId);
    if (!contactById) {
      // throw new Error('Contact not found.');
      return 'Contact not found.';
    }
    return [contactById];
  } catch (error) {
    console.log(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await getAllContacts();
    // const removedContact = await getContactById(contactId);
    // const newContacts = contacts.filter(contact => contact.id !== contactId);
    const index = contacts.findIndex(item => item.id === id);
    if (index === -1) {
      return null;
    }
    const [result] = contacts.splice(index, 1);
    // await writeFile(newContacts);
    await writeFile(contacts);
    return result;
  } catch (error) {
    console.log(error.message);
  }
}

async function addContact(name, email, phone) {
  // const id = Date.now().toString();

  const newContact = {
    id: randomUUID(),
    name,
    email,
    phone,
  };

  const contacts = await getAllContacts();

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
