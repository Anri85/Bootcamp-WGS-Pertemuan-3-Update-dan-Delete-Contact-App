const fs = require("fs");
const validator = require("validator");

// menentukan lokasi file disimpan (folder dan nama file)
const path = "./data";
const file = "./data/contact.json";
// jika file tidak ada maka buat baru
if (!fs.existsSync(path)) fs.mkdirSync(path);
if (!fs.existsSync(file)) fs.writeFileSync(file, "[]");

// fungsi membaca file contact.json
const loadContact = () => {
    const data = fs.readFileSync(file, "utf-8");
    const contacts = JSON.parse(data);
    return contacts;
};

// fungsi menyimpan data pada file contact.json
const saveData = (name, email, mobile) => {
    const errDump = [];
    const contact = { name, email, mobile };
    const contactList = loadContact();
    const duplicate = contactList.find((cl) => cl.name.toLowerCase() === name.toLowerCase());

    // validasi input data
    if (duplicate) {
        errDump.push("Nama sudah digunakan. Tolong pilih yang lain");
    }
    if (email) {
        if (!validator.isEmail(email)) {
            errDump.push("Tolong masukan email yang valid");
        }
    }
    if (!validator.isMobilePhone(mobile, "id-ID")) {
        errDump.push("Tolong masukan nomor yang valid");
    }
    if (errDump.length > 0) {
        console.log(errDump);
        return false;
    }
    // simpan data kedalam file contact.json
    contactList.push(contact);
    fs.writeFileSync(file, JSON.stringify(contactList));
    console.log("Terima kasih informasinya");
};

// fungsi melakukan list kontak
const listContact = () => {
    const contactList = loadContact();
    console.log("Daftar Kontak: ");
    contactList.forEach((cl, i) => {
        console.log(`${i + 1}. ${cl.name}: ${cl.mobile}`);
    });
};

// fungsi mengambil detail sebuah kontak
const detailContact = (name) => {
    const contacts = loadContact();
    const detailContact = contacts.find((dc) => dc.name.toLowerCase() === name.toLowerCase());
    if (detailContact) {
        if (detailContact.name) {
            console.log(detailContact.name);
        }
        if (detailContact.email) {
            console.log(detailContact.email);
        }
        if (detailContact.mobile) {
            console.log(detailContact.mobile);
        }
    } else {
        console.log("Kontak tidak ditemukan");
    }
};

// fungsi melakukan update contact
const updateContact = (oldName, newName, newEmail, newMobile) => {
    // ambil data kontak
    const contacts = loadContact();
    // cari index item kontak yang ingin diupdate berdasarkan oldName
    const index = contacts.findIndex((c) => c.name.toLowerCase() === oldName.toLowerCase());
    // jika index tersedia maka lakukan validasi
    if (index > -1) {
        // jika newName kontak sudah terdaftar oleh kontak lain maka berikan error
        if (newName) {
            const duplicate = contacts.find((c) => c.name.toLowerCase() === newName.toLowerCase());
            if (duplicate) {
                console.log("Nama sudah digunakan. Tolong pilih yang lain");
                return false;
            }
            contacts[index].name = newName;
        }
        // validasi email
        if (newEmail) {
            if (!validator.isEmail(newEmail)) {
                console.log("Tolong masukan email yang valid");
                return false;
            }
            contacts[index].email = newEmail;
        }
        // validasi  nomor telepon
        if (newMobile) {
            if (!validator.isMobilePhone(newMobile, "id-ID")) {
                console.log("Tolong masukan nomor yang valid");
                return false;
            }
            contacts[index].mobile = newMobile;
        }
    } else {
        // jika kontak tidak ditemukan
        console.log("Maaf kontak tidak ditemukan");
        return false;
    }
    // tulis ulang file contact.json dengan data baru
    fs.writeFileSync(file, JSON.stringify(contacts));
    console.log("Kontak berhasil dirubah");
};

// fungsi menghapus kontak
const deleteContact = (name) => {
    // ambil data kontak
    const contacts = loadContact();
    // cari index item kontak yang ingin dihapus berdasarkan name
    const index = contacts.findIndex((c) => c.name.toLowerCase() === name.toLowerCase());
    // jika index tersedia maka lakukan penghapusan dengan metode splice
    if (index > -1) {
        contacts.splice(index, 1);
        // tulis ulang file contact.json
        fs.writeFileSync(file, JSON.stringify(contacts));
    } else {
        // jika kontak tidak ditemukan
        console.log("Kontak tidak ditemukan");
        return false;
    }
    console.log("Kontak berhasil dihapus");
};

module.exports = { saveData, listContact, detailContact, updateContact, deleteContact };
