<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your portfolio app

This is an interactive 3D developer portfolio built with React, TypeScript, Vite, and Three.js.

View your app in AI Studio: https://ai.studio/apps/fa47e94c-6f78-4804-afff-4b9cf6918371

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Run the app:
   `npm run dev`

## Deploy to Netlify

The repository includes [netlify.toml](./netlify.toml), which configures Netlify to run
`npm run build` and publish the generated `dist` directory.

To deploy from GitHub:

1. In Netlify, choose **Add new project** > **Import an existing project**.
2. Select `nalluri-sys/kauisk`.
3. Keep the detected build settings and deploy.

If the app is later updated to use Gemini API calls in the browser, add
`GEMINI_API_KEY` under the Netlify project's environment variables. Do not commit
`.env` files or API keys.
