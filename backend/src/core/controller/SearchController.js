import Dev from '../models/Dev';
import parseStringAsArray from '../utils/parseStringAsArray';

class DevController {
    async index(req, res) {
        const {techs, latitude, longitude} = req.query;

        const techsArray = parseStringAsArray(techs); 

        const devs = await Dev.find({
            techs:{
                $in: techsArray,
            },
            location: {
                $near: {
                    $geometry:{
                        type:'Point',
                        coordinates:[longitude, latitude]
                    },
                    $maxDistance:10000
                },
            }
        });

        return res.json(devs);
    }
}

export default new DevController();