const { book } = require("../models");
const db = require("../models");
const Klien = db.klien;
const Library = db.library;
const Sirkulasi = db.sirkulasi;
const Pengiriman = db.pengiriman;
const Book = db.book;

//for testing purposes only
exports.newBookLibrary = async (req, res) => {
  try {
    await Library.create({
      isbn: req.body.isbn,
      judul: req.body.judul,
      jumlahKetersediaan: req.body.jumlahKetersediaan,
      pengarang: req.body.pengarang,
      penerbit: req.body.penerbit,
      tahunTerbit: req.body.tahunTerbit,
      kategori: req.body.kategori
    });
    res.send({ message: "Book registered successfully!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//for testing purposes only
exports.newBook = async (req, res) => {
  try {
    await Book.create({
      isbn: req.body.isbn,
      statusKetersediaan: req.body.statusKetersediaan
    });
    res.send({ message: "Book registered successfully at Book Table!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getLibrary = async (req, res) => {
  try {
    const library = await Library.findAll();
    //console.log(library);
    res.status(200).send(library);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.pinjamBuku = async (req, res) => {
  try {
    const buku = await Book.findOne({
      where:{
        isbn: req.body.isbn,
        statusKetersediaan: 1 
      }
    })
    console.log(buku);
    await Book.update({
      statusKetersediaan: 0
    },{
      where:{
        id: buku.id
      },
    })
    const library = await Library.findOne({
      where:{
        isbn: req.body.isbn
      },
    })
    await Library.update({
      jumlahKetersediaan: library.jumlahKetersediaan - 1
    },{
      where:{
        isbn: library.isbn
      }
    })
    await Sirkulasi.create({
      email: req.body.email,
      bookId: buku.id,
      isbn: req.body.isbn,
      tanggalPeminjaman: req.body.tanggalPeminjaman,
      durasi: req.body.durasi,
      tanggalPengembalian: req.body.tanggalPengembalian,
      status: req.body.status
    });
    res.status(200).send({ message: "Book borrowed successfully!" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.kembalikanBuku = async (req, res) => {
  try {
    await Sirkulasi.update({
      status: req.body.status
    },{
      where:{
        id: req.body.idPeminjaman
      } 
    })
    const peminjaman = await Sirkulasi.findOne({
      where:{
        id: req.body.idPeminjaman
      },
    });
    await Book.update({
      statusKetersediaan: 1
    },{
      where:{
        id: peminjaman.bookId
      },
    })
    const library = await Library.findOne({
      where:{
        isbn: peminjaman.isbn
      },
    })
    await Library.update({
      jumlahKetersediaan: library.jumlahKetersediaan + 1
    },{
      where:{
        isbn: library.isbn
      }
    })
    await Pengiriman.create({
      noResi: req.body.noResi,
      idPeminjaman: peminjaman.id,
      jasaEkspedisi: req.body.jasaEkspedisi
    })
    res.status(200).send({ message: "Book returned successfully!" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.getRiwayat = async (req, res) => {
  try {
    const riwayat = await Sirkulasi.findAll({
      where:{
        email: req.body.email
      }
    });
    res.status(200).send(riwayat);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.perpanjangPeminjaman = async (req, res) => {
  try {
    await Sirkulasi.update({
      durasi: req.body.durasi,
      tanggalPengembalian: req.body.tanggalPengembalian
    },{
      where:{
        id: req.body.idPeminjaman
      }
    });
    res.status(200).send({ message: "Book borrowing extended successfully!" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.changeProfile = async (req, res) => {
  try {
    await Klien.update({
      nama: req.body.nama,
      alamat: req.body.alamat,
      asalInstitusi: req.body.asalInstitusi,
      telepon: req.body.telepon,
    }, {
      where:{
        email: req.body.email 
      },
    });
    const klien = await Klien.findOne({
      where: {
        email: req.body.email,
      }
    });
    res.status(200).send({
      id: klien.id,
      email: klien.email,
      nama: klien.nama,
      alamat: klien.alamat,
      asalInstitusi: klien.asalInstitusi,
      telepon: klien.telepon
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};