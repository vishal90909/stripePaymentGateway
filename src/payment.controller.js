import express from 'express';
import stripe from 'stripe';
import { paymentModel } from './payment.model.js';
import { environment } from './environment/environment.js';

const route = express.Router();
const stripeInstance = stripe(environment.secret_token);

route.post('/createPayment', async (req, res) => {
  try {
    const { amount, currency, paymentMethod, description, userName, email } = req.body
    console.log('userName', userName);
    const createPayment = await stripeInstance.paymentIntents.create({
      amount: amount,
      currency: currency,
      payment_method: paymentMethod,
      description: description,
      confirm: true,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never',
      },
      metadata: {
        userName: userName,
        email: email,
      },
    });

    if (!createPayment) {
      res.json({ error: 'no payment is created' })
    }
    console.log('createPayment', createPayment);
    const data = {
      email: createPayment.metadata.email,
      userName: createPayment.userName,
      amount: createPayment.amount,
      currency: createPayment.currency,
      paymentMethod: createPayment.payment_method_types[0],
      description: createPayment.description,
      paymentId: createPayment.id,
    }

    const paymentCreated = await paymentModel.create(data);
    res.status(201).send(paymentCreated);
  } catch (err) {
    console.log('err', err.message);
  }
})

route.get('/retrievePayment/:id', async(req,res) => {
  const paymentId = req.params.id;
  const retrievePayment = await stripeInstance.paymentIntents.retrieve(paymentId);

  res.status(200).json(retrievePayment);
})

route.get('/ListOfPayment', async(req, res) => {
  const { limits } = req.query.limits;
  const listOfPayment = await stripeInstance.paymentIntents.list(limits);
  
  res.status(200).send(listOfPayment.data);
})

route.delete('/cancelPayment/:id', async(req, res) => {
  try {
  const paymentId = req.params.id;
  const cancelPayment = await stripeInstance.paymentIntents.cancel(paymentId);
  
  const deletePayment = await paymentModel.deleteOne({
    paymentId: cancelPayment.id
  })
  res.status(200).send(deletePayment);
  }catch(err) {
    res.status(404).json({message: err.message});
  }
})

route.patch('/confirmPayment/:id', async(req,res) => {
  try {
    const paymentId = req.params.id;
    const confirmPayment = await stripeInstance.paymentIntents.confirm(paymentId);

    res.status(200).send(confirmPayment);
  }catch(err) {
    res.json({message: err.message});
  }
})

export default route;