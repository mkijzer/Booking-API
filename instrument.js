import * as Sentry from "@sentry/node";
import "dotenv/config"; // Make sure to import dotenv if not done already

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
});

export default Sentry;
