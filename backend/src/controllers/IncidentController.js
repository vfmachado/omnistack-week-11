const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {

    async index(req, res) {

        const { page = 1}  = req.query;

        const [ count ] = await connection('incidents').count();

        res.header('X-Total-Count', count['count(*)']);

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset(5 * (page -1))
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf',
            ]);

        return res.status(200).json(incidents);    
    },


    async create(req, res) {
        const data = req.body;

        const { title, description, value} = data;
        const ong_id = req.headers.authorization

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });

        res.status(200).json({ msg: "Data received on server", data: data, generatedId: id })
    },


    async delete(req, res) {
        
        const id = req.params.id;
        const ong_id = req.headers.authorization

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        
        if (incident.ong_id != ong_id) {
            return res.status(401).json({error: 'Operation not allowed'})
        }
       
        await connection('incidents').where('id', id).delete();

        return res.status(204).send();
    }


};