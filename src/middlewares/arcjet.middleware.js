import aj from '../config/arcjet.config.js';

const arcjetMiddleware = async (req, res, next) => {
  try {
    const decision = await aj.protect(req,{requested:1});
    // console.log('decision', decision.reason);

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit())
        return res.status(429).json({ error: 'Rate limit exceeded' });
      if (decision.reason.isBot()) {
        return res.status(403).json({ error: 'Bot detected' });
      }
      return res.status(403).json({ error: 'Access denied' });
    }
    next();
  } catch (error) {
    console.log('arcjet middleware error', error);
    next(error);
  }
};

export default arcjetMiddleware;
