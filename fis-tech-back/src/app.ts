import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
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

// Handle 404 errors
app.use(notFoundHandler);

// Handle unsupported methods
app.use(methodNotAllowedHandler);

// Global error handler (must be last)
app.use(errorHandler);

export default app;