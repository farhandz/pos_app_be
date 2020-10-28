const db = require('../connection/db');
const { reject } = require('lodash');

module.exports = {
  insertMaster: (invoices, orders, amount) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO history (invoices, orders, amount) VALUES('${invoices}', '${orders}', '${amount}')`,
        (err, result) => {
          if (err) {
            reject(new Error(err));
          } else {
            resolve(result);
          }
        }
      );
    });
  },
  insertDetail: (id_transaksi, id_product, id_category, qty, price, image, nama_kategory, title) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO history_detail (id_transaksi, id_product, id_category, qty, price, image, nama_kategory, title) VALUES('${id_transaksi}' ,'${id_product}', '${id_category}', ${qty},  ${price}, '${image}', '${nama_kategory}', '${title}' )`,
        (err, result) => {
          console.log(result)
          if (err) {
            reject(new Error(err));
          } else {
            resolve(result);
          }
        }
      );
    });
  },
  getHistoryDetails: (id) => {
   return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM history_detail WHERE id_transaksi = ${id}`, (err, result) => {
        if(err) {
          reject(err)
        } else {
          resolve  (result)
        }
      });
   })
  },
  getCountThisDay: (tanggal) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT SUM(amount) as totalhariini FROM history WHERE Date BETWEEN '${tanggal} 00:00:00' AND '${tanggal} 23:59:59'`, (err, result) => {
        if(err) {
          reject(err)
        } else {
          resolve(result)
        }
      });
    })
  }
};