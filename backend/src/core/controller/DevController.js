import Dev from '../models/Dev';
import axios from 'axios';
import parseStringAsArray from '../utils/parseStringAsArray';
import { findConnections, sendMessage } from '../../websocket';

class DevController {
    async index(req, res) {
        const devs = await Dev.find({});

        return res.json(devs)
    }

    async store(req, res) {
        const {github, techs, longitude, latitude} = req.body;

        const response = await axios.get(`https://api.github.com/users/${github}`);

        const { avatar_url:avatar, bio, name = login} = response.data;

        const devExists = await Dev.findOne({name});

        if(devExists) {
            return res.status(400).json({error: 'Dev already exists'});
        }

        const techsArray = parseStringAsArray(techs);

        const location = {
            type: 'Point',
            coordinates:[longitude, latitude]
        }

        const dev = await Dev.create({
            name,
            bio,
            avatar,
            techs:techsArray,
            location
        });

        const sendSocketMessageTo = findConnections(
            {latitude, longitude}, techsArray
        )

        sendMessage(sendSocketMessageTo, 'new-dev', dev);
        
        return res.json(dev);
    }
}

export default new DevController();