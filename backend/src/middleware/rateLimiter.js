import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
    // per user => fikri ramdani
  try {
    const { success } = await ratelimit.limit("my-rate-limit");

    if (!success) {
      return res.status(429).json({
        message: "Too many requests, please try again later.",
      });
    }

    next(); // lanjut ke controller
  } catch (error) {
    console.error("Rate limit error:", error);
    next(error); // lempar error ke error handler Express
  }
};

export default rateLimiter;
