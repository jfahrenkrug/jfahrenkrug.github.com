import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: 'https://springenwerk.com',
  integrations: [tailwind(), mdx()],
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark'
      },
      wrap: true,
      langs: ['javascript', 'typescript', 'swift', 'python', 'bash', 'json', 'html', 'css', 'sql']
    }
  }
});
