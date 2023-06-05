// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = "Springenwerk";
export const SITE_DESCRIPTION =
  "Johannes Fahrenkrug, Freelance iOS Developer and Consultant";
export const TWITTER_HANDLE = "@jfahrenkrug";
export const MY_NAME = "Johannes Fahrenkrug";

// setup in astro.config.mjs
const BASE_URL = new URL(import.meta.env.SITE);
export const SITE_URL = BASE_URL.origin;
