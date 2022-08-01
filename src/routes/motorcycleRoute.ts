import { Router } from 'express';
import MotorcycleController from '../controllers/Motorcycle';
import MotorcycleModel from '../models/Motorcycle';
import MotorcycleService from '../services/Motorcycle';

const route = Router();

const routeID = '/motorcycles/:id';

const motorcycle = new MotorcycleModel();
const motorcycleService = new MotorcycleService(motorcycle);
const motorcycleController = new MotorcycleController(motorcycleService);

route.post('/motorcycles', (req, res) => motorcycleController.create(req, res));
route.get('/motorcycles', (req, res) => motorcycleController.read(req, res));
route.get(routeID, (req, res) => motorcycleController
  .readOne(req, res));
route.put(routeID, (req, res) => motorcycleController
  .update(req, res));
route.delete(routeID, (req, res) => motorcycleController
  .delete(req, res));

export default route;