import payment from './payment.controller.js';
import express from 'express';
const routes = express.Router()

const api = routes.use(payment);

export default routes.use('/', api);