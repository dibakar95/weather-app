import { Request, Response } from 'express';
import { fetchWeather } from '../services/weather.service';

export const getWeather = async (req: Request, res: Response) => {
    try {
        const { location } = req.params;
        const weatherData = await fetchWeather(location);
        res.json(weatherData);
    } catch (error) {
        if(error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};
 