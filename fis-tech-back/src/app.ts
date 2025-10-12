import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import assuntoRoutes from './routes/assunto.routes';
import topicoRoutes from './routes/topico.routes';
import nivelDificuldadeRoutes from './routes/nivelDificuldade.routes';
import anotacaoRoutes from './routes/anotacao.routes';
import conteudoRoutes from './routes/conteudo.routes';
import { errorHandler, notFoundHandler, methodNotAllowedHandler } from './middlewares/errorHandler';

const app = express();

// Security middleware
app.use(cors());

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/assuntos', assuntoRoutes);
app.use('/api/topicos', topicoRoutes);
app.use('/api/niveisDificuldade', nivelDificuldadeRoutes);
app.use('/api/anotacoes', anotacaoRoutes);
app.use('/api/conteudos', conteudoRoutes);
// Handle 404 errors
app.use(notFoundHandler);

// Handle unsupported methods
app.use(methodNotAllowedHandler);

// Global error handler (must be last)
app.use(errorHandler);

export default app;