const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {

    async index(req, res) {
        const ongs = await connection('ongs').select('*');
        return res.status(200).json(ongs);    
    },


    async create(req, res) {
        const data = req.body;

        const { name, email, whatsapp, city, uf } = data;

        const id = crypto.randomBytes(4).toString('HEX');

        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        });

        res.status(200).json({ msg: "Data received on server", data: data, generatedId: id })
    }

};