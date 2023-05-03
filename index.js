const { Command } = require('commander');
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require('./contacts');

const program = new Command();

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

const messageToConsoleLog = text => {
  const magentaColor = '\x1b[35m';
  const resetColor = '\x1b[0m';

  console.log(magentaColor, `\n${text}`, resetColor);
};

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const allContacts = await listContacts();
      messageToConsoleLog('You contacts:');
      console.table(allContacts);
      break;

    case 'get':
      const contactById = await getContactById(id);
      messageToConsoleLog('You get contact:');
      console.table(contactById);
      break;

    case 'add':
      const newContact = await addContact(name, email, phone);
      messageToConsoleLog('You add new contact:');
      console.table(newContact);
      break;

    case 'remove':
      //   const removedContact = await getContactById(id);
      const removedContact = await removeContact(id);
      messageToConsoleLog('You remove contact:');
      console.table(removedContact);
      break;

    case 'help':
      messageToConsoleLog(
        'This program the manager contacts. You can list, get, add, remove contacts.'
      );
      break;

    default:
      console.log('\x1B[31m', '\nUnknown action type!');
      messageToConsoleLog('Use command:');
      messageToConsoleLog('Get all contacts: "node index --action list"');
      messageToConsoleLog(
        'Get contact by id: "node index --action get --id 05olLMgyVQdWRwgKfg5J6"'
      );
      messageToConsoleLog(
        'Add contact: "node index --action add --name Petro --email email@mail.com --phone 1-800-111-22-33"'
      );
      messageToConsoleLog(
        'Remove contact: "node index --action remove --id 05olLMgyVQdWRwgKfg5J6"'
      );
      messageToConsoleLog('Help and about program: "node index --action help"');
  }
}

invokeAction(argv);
