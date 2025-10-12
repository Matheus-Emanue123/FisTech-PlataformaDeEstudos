import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import assuntoRoutes from './routes/assunto.routes';
import topicoRoutes from './routes/topico.routes';
import nivelDificuldadeRoutes from './routes/nivelDificuldade.routes';
import { errorHandler, notFoundHandler, methodNotAllowedHandler } from './middlewares/errorHandler';

const app = express();

// Security middleware
app.use(cors());

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/assuntos', assuntoRoutes);
app.use('/topicos', topicoRoutes);
app.use('/niveisDificuldade', nivelDificuldadeRoutes);

// Handle 404 errors
app.use(notFoundHandler);

// Handle unsupported methods
app.use(methodNotAllowedHandler);

// Global error handler (must be last)
app.use(errorHandler);

export default app;