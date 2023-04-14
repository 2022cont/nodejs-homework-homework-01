const contacts = require('./db/contacts')
const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();
// const argv = require("yargs").argv;
// const { hideBin } = require('yargs/helpers')

const invokeAction = async ({ action, id, name, email, phone }) => {
    switch (action) {
        case 'list':
            const list = await contacts.listContacts()
            console.log(list)
            break;

        case 'get':
            const contactById = await contacts.getContactById(id)
            console.log(contactById)
            break;

        case 'add':
            const newContact = await contacts.addContact({ name, email, phone })
            console.log(newContact)
            break;

        case 'remove':
            const removeContact = await contacts.removeContact(id)
            console.log(removeContact)
            break;

        default:
            console.warn("\x1B[31m Unknown action type!");
            break;
    }
}

// invokeAction({ action: 'list' });
// invokeAction({ action: 'get', id: "e6ywwRe4jcqxXfCZOj_1e" });
// invokeAction({ action: 'add', name: "KSS", email: "kss@gmail.com", phone: '(055)555-55-55' })
// invokeAction({ action:'remove',id:"Rs18eS8XA-KteU5zEKR2o"})

invokeAction(argv)
console.log(argv)