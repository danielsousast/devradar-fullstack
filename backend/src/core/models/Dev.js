import {Schema, model} from 'mongoose';
import PointSchema from '../utils/PointSchema';

const DevSchema = new Schema({
    name:String,
    github:String,
    bio:String,
    avatar:String,
    techs:[String],
    location:{
        type: PointSchema,
        index: '2dsphere'
    }
});

export default model('Dev', DevSchema);