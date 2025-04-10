import express, { Request, Response } from 'express';

const app = express();
const port = 5000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to the API' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});