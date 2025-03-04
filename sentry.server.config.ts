import * as Sentry from "@sentry/nuxt";
 
Sentry.init({
  dsn: "https://9699715cdb7e7a87623817a917b2127e@o4508919679287296.ingest.de.sentry.io/4508919685054544",

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
  
  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});
