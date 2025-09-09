
import axios from 'axios';
// import redisClient from '../../config/redis'; // No longer needed for in-memory cache
import { WeatherResponse } from '../../models/Weather';

const API_KEY = process.env.WEATHER_API_KEY;
const BASE_URL = process.env.WEATHER_API_URL;

/*
// ===================================================================================
// PREVIOUS REDIS-BASED CACHING IMPLEMENTATION
// ===================================================================================
const CACHE_EXPIRATION_SECONDS_REDIS = 600; // Cache for 10 minutes

export const fetchWeatherRedis = async (location: string): Promise<WeatherResponse> => {
  const cacheKey = `weather:${location}`;

  // 1. Check cache first
  try {
    // const cachedData = await redisClient.get(cacheKey);
    // if (cachedData) {
    //   console.log('Cache hit!');
    //   return JSON.parse(cachedData.toString());
    // }
  } catch (error) {
    console.error('Redis error:', error);
    // If Redis fails, proceed to fetch from API without caching
  }

  console.log('Cache miss! Fetching from API.');
  // 2. If not in cache, fetch from API
  if (!API_KEY || API_KEY === 'YOUR_API_KEY') {
    throw new Error('Weather API key is not configured. Please set it in your .env file.');
  }

  const requestUrl = `${BASE_URL}${location}`;

  try {
    const response = await axios.get<WeatherResponse>(requestUrl, {
      params: {
        unitGroup: 'metric',
        key: API_KEY,
        contentType: 'json'
      },
    });
    const weatherData = response.data;

    // 3. Store in cache for future requests
    try {
      // await redisClient.set(cacheKey, JSON.stringify(weatherData), { EX: CACHE_EXPIRATION_SECONDS_REDIS });
    } catch (error) {
      console.error('Redis error:', error);
      // If caching fails, the function still returns the data
    }

    return weatherData;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('Error from Weather API:', error.response.data);
      throw new Error(`Failed to fetch weather data: ${error.response.data.error?.message || 'Unknown API error'}`);
    }
    console.error('Error fetching weather data:', error);
    throw new Error('An unexpected error occurred while fetching weather data.');
  }
};
*/


// ===================================================================================
// NEW IN-MEMORY CACHING IMPLEMENTATION
// ===================================================================================

interface CacheEntry {
  data: WeatherResponse;
  timestamp: number;
}

// Simple in-memory cache object
const memoryCache: Record<string, CacheEntry> = {};
const CACHE_EXPIRATION_MS = 600 * 1000; // 10 minutes in milliseconds

export const fetchWeather = async (location: string): Promise<WeatherResponse> => {
  const cacheKey = `weather:${location}`;
  const now = Date.now();

  // 1. Check cache first
  const cachedEntry = memoryCache[cacheKey];
  if (cachedEntry && (now - cachedEntry.timestamp < CACHE_EXPIRATION_MS)) {
    console.log('In-memory cache hit!');
    return cachedEntry.data;
  }

  console.log('In-memory cache miss! Fetching from API.');
  // 2. If not in cache or expired, fetch from API
  if (!API_KEY || API_KEY === 'YOUR_API_KEY') {
    throw new Error('Weather API key is not configured. Please set it in your .env file.');
  }

  const requestUrl = `${BASE_URL}/${location}`;

  try {
    const response = await axios.get<WeatherResponse>(requestUrl, {
      params: {
        unitGroup: 'metric',
        key: API_KEY,
        contentType: 'json'
      },
    });
    const weatherData = response.data;

    // 3. Store in cache for future requests
    memoryCache[cacheKey] = {
      data: weatherData,
      timestamp: now
    };

    return weatherData;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('Error from Weather API:', error.response.data);
      throw new Error(`Failed to fetch weather data: ${error.response.data.error?.message || 'Unknown API error'}`);
    }
    console.error('Error fetching weather data:', error);
    throw new Error('An unexpected error occurred while fetching weather data.');
  }
};
