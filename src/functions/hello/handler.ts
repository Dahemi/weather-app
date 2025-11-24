import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import schema from './schema';
import fetch from 'node-fetch';

const weather: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const city = event.queryStringParameters?.city || 'London';
  const apiKey = process.env.WEATHER_API_KEY;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}`;
  
  const response = await fetch(url);
  if (!response.ok) {
    return formatJSONResponse({
      message: `Error fetching weather data for ${city}`,
    });
  }

  const data = await response.json();
  return formatJSONResponse({
    data : data
  });
};

export const main = middyfy(weather);

