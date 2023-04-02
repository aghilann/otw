import express from 'express';
import cors from 'cors';
const app = express();
const PORT = 3000;
// cors
app.use(cors({ origin: '*' }));

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
