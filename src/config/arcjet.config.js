import arcjet, { detectBot, shield, tokenBucket } from '@arcjet/node';
import { ARCJET_API_KEY } from '../../env.js';

const aj = arcjet({
  key: ARCJET_API_KEY,
  characteristics: ['ip.src'], // Track requests by IP
  rules: [
    shield({ mode: 'LIVE' }),
    // Create a bot detection rule
    detectBot({
      mode: 'LIVE',
      allow: ['CATEGORY:SEARCH_ENGINE'],
    }),
    tokenBucket({
      mode: 'LIVE',
      refillRate: 5, // Refill 5 tokens per interval
      interval: 20, // Refill every 10 seconds
      capacity: 5, // Bucket capacity of 10 tokens
    }),
  ],
});

export default aj;
