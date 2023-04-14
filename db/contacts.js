const fs = require('fs/promises')
const { nanoid } = require('nanoid')

const updateContacts = async (contacts) => fs.writeFile('contacts.json', JSON.stringify(contacts, null, 2))


const listContacts = async () => {
    const list = await fs.readFile('contacts.json')
    return JSON.parse(list)
}

async function getContactById(contactId) {
    const contacts = await listContacts()
    const result = contacts.find((item) => item.id === contactId)
    return result || null
}

const addContact = async ({ name, email, phone }) => {
    const contacts = await listContacts()
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone
    }
    contacts.push(newContact)
    await updateContacts(contacts)
    return newContact
}

const removeContact = async (contactId) => {
    const contacts = await listContacts()
    const index = contacts.findIndex((item) => item.id === contactId)
    if (index === -1) { return null }
    const [result] = contacts.splice(index, 1)
    await updateContacts(contacts)
    return result
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}