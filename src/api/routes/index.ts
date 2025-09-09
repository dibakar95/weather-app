import { Router } from 'express';
import weatherRouter from './weather.route';

const router = Router();

// All routes from weather.route.ts will be prefixed with /weather
router.use('/weather', weatherRouter);

// As you add more features (e.g., users, products), you can add their routers here.
// import userRouter from './user.route';
// router.use('/users', userRouter);

export default router;
