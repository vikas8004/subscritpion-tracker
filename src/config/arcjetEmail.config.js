import arcjet, { validateEmail } from '@arcjet/node';
import { ARCJET_API_KEY } from '../../env.js';

const validateEmailUsingArcjet = arcjet({
  key: ARCJET_API_KEY,
  rules: [
    validateEmail({
      mode: 'LIVE',
      deny: ['DISPOSABLE', 'INVALID', 'NO_MX_RECORDS'],
    }),
  ],
});

export default validateEmailUsingArcjet;
