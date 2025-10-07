const mysql = require('mysql');
const db = require('../db/connection');

const Train = {
    create: (trainData, callback) => {
        const query = 'INSERT INTO trains (train_number, name, schedule_id) VALUES (?, ?, ?)';
        db.query(query, [trainData.train_number, trainData.name, trainData.schedule_id], callback);
    },

    getAll: (callback) => {
        const query = 'SELECT * FROM trains';
        db.query(query, callback);
    },

    getById: (trainId, callback) => {
        const query = 'SELECT * FROM trains WHERE id = ?';
        db.query(query, [trainId], callback);
    },

    update: (trainId, trainData, callback) => {
        const query = 'UPDATE trains SET train_number = ?, name = ?, schedule_id = ? WHERE id = ?';
        db.query(query, [trainData.train_number, trainData.name, trainData.schedule_id, trainId], callback);
    },

    delete: (trainId, callback) => {
        const query = 'DELETE FROM trains WHERE id = ?';
        db.query(query, [trainId], callback);
    }
};

module.exports = Train;