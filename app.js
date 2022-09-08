const yargs = require("yargs");
const { saveData, listContact, detailContact, updateContact, deleteContact } = require("./function");

yargs.command({
    command: "add",
    describe: "add new contact",
    builder: {
        name: {
            describe: "Contact Name",
            demandOption: true,
            type: "string",
        },
        email: {
            describe: "Contact Email",
            demandOption: false,
            type: "string",
        },
        mobile: {
            describe: "Contact Mobile Phone",
            demandOption: true,
            type: "string",
        },
    },
    handler(argv) {
        saveData(argv.name, argv.email, argv.mobile);
    },
});

yargs.command({
    command: "list",
    describe: "See contact list",
    handler() {
        listContact();
    },
});

yargs.command({
    command: "detail",
    describe: "Get detail contact",
    builder: {
        name: {
            describe: "Contact Name",
            demandOption: true,
            type: "string",
        },
    },
    handler(argv) {
        detailContact(argv.name);
    },
});

yargs.command({
    command: "update",
    describe: "Update contact",
    builder: {
        oldName: {
            describe: "Nama kontak sebelumnya",
            demandOption: true,
            type: "string",
        },
        newName: {
            describe: "Nama kontak yang baru",
            demandOption: false,
            type: "string",
        },
        newEmail: {
            describe: "Email kontak yang baru",
            demandOption: false,
            type: "string",
        },
        newMobile: {
            describe: "Nomor telepon kontak yang baru",
            demandOption: false,
            type: "string",
        },
    },
    handler(argv) {
        updateContact(argv.oldName, argv.newName, argv.newEmail, argv.newMobile);
    },
});

yargs.command({
    command: "delete",
    describe: "Delete contact",
    builder: {
        name: {
            describe: "Contact Name",
            demandOption: true,
            type: "string",
        },
    },
    handler(argv) {
        deleteContact(argv.name);
    },
});

yargs.parse();
