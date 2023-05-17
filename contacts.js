const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

const getAllContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const writeAllContacts = async text =>
  await fs.writeAllContacts(contactsPath, JSON.stringify(text, null, 2));

async function listContacts() {
  try {
    return await getAllContacts();
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

async function addContact(name, email, phone) {
  const id = Date.now().toString();

  const newContact = {
    id,
    name,
    email,
    phone,
  };

  const contacts = await getAllContacts();
  contacts.push(newContact);
  await writeAllContacts(contacts);
  return [newContact];
}

const updateContactById = async (contactId, data) => {
  const contacts = await getAllContacts();
  const index = contacts.findIndex(contact => contact.id === contactId);
  contacts[index] = { ...contacts[index], ...data };
  await writeAllContacts(contacts);
  return contacts[index];
};

async function removeContact(contactId) {
  try {
    const contacts = await getAllContacts();
    const index = contacts.findIndex(item => item.id === contactId);
    if (index === -1) {
      return null;
    }
    const [result] = contacts.splice(index, 1);
    await writeAllContacts(contacts);
    return [result];
  } catch (error) {
    console.log(error.message);
  }
}

const contacts = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
};

module.exports = contacts;
