import {Router} from 'express';
import DevController from './core/controller/DevController';
import SearchController from './core/controller/SearchController';

const routes = new Router();

routes.post('/devs', DevController.store);
routes.get('/devs', DevController.index);

routes.get('/search', SearchController.index);

export default routes;