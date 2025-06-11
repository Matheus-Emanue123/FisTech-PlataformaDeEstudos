import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

// Por enquanto nenhuma rota ainda

export default app;

app.get('/', (req, res) => {
    res.send('API está no ar 🚀');
  });
  
