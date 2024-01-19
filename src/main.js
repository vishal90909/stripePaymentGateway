import express from 'express';
import routes from './route.js';
import mongoose from 'mongoose';
const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}))
app.use(routes)
mongoose
  .connect('mongodb+srv://vishal:vishalashu@cluster0.stnhlbo.mongodb.net/BooksManagement?authSource=admin&replicaSet=atlas-ll6abd-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true')
  .then(() => {
    console.log('mongodb is connected')
  })
  .catch((err) => {
    console.log('err', err.message)
  })
app.listen(9000, () => {
  console.log('server is started at port 9000');
})