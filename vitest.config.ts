// import path from 'node:path';
// import { fileURLToPath } from 'node:url';

// import { defineConfig } from 'vitest/config';
// import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
// import { playwright } from '@vitest/browser-playwright';

// const dirname = path.dirname(fileURLToPath(import.meta.url));

// // More info at:
// // https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
// export default defineConfig({
//   test: {
//     projects: [
//       {
//         name: 'storybook',
//         extends: true,
//         plugins: [
//           storybookTest({
//             configDir: path.join(dirname, '.storybook'),
//           }),
//         ],
//         browser: {
//           enabled: true,
//           headless: true,
//           provider: playwright(),
//           instances: [{ browser: 'chromium' }],
//         },
//         setupFiles: ['.storybook/vitest.setup.ts'],
//       },
//     ],
//   },
// });
