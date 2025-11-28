# New Jersey Web Design System (NJWDS)

The NJ Web Design System is an extension of the [US Web Design System](https://github.com/uswds/uswds/) with a specific theme and components for State of New Jersey digital properties and services.

## How to install and use the NJWDS

### With Node and NPM

Follow the instructions on the [USWDS Documentation - Installation](https://designsystem.digital.gov/documentation/developers/#installation) page starting at "Install using Node and npm." The key difference between these instructions and what you will need to do is that our package name is `@newjersey/njwds` instead of `@uswds/uswds`. Therefore, on Step 4, your installation commmand would be:

```bash
npm install @newjersey/njwds --save
```

Once installed, the NJWDS package name would affect the file path used in `node_modules` as well (i.e. `node_modules/@newjersey/njwds/dist/` instead of `node_modules/@uswds/uswds/dist/`).

### Without Node and NPM

1. On our [GitHub Releases page](https://github.com/newjersey/njwds/releases), on the latest release (at the top of the list), you will see an "Assets" section at the bottom of the release information. Click on the "Source codede (zip)" link to download our package.
2. Follow the instructions on the [USWDS Documentation - Installation](https://designsystem.digital.gov/documentation/developers/#installation) page, starting with Step 2 of "Install the package directly from GitHub." Note that in our case, you would want to replace the `uswds` folder name with `njwds`.

### Using NJWDS files in your project

Follow the instructions on the [USWDS Documentation - Using USWDS](https://designsystem.digital.gov/documentation/developers/#using-uswds-css-and-javascript-in-your-project) page. Note that instead of `uswds.css` or `uswds.min.css`, you will refer to `styles.css` in the `/dist/css` directory. Also, the filepath should have `njwds` instead of `uswds` (i.e. `assets/njwds/dist/js/uswds.min.js` instead of `assets/uswds/dist/js/uswds.min.js`).

For a full list of examples of NJWDS components and their corresponding code, see our [NJWDS Component Gallery](https://newjersey.github.io/njwds/components/detail/layout--docs.html). Note that because the NJWDS is built on top of the USWDS, you can use USWDS [components](https://designsystem.digital.gov/components/overview/) and [utilities](https://designsystem.digital.gov/utilities/) not listed in our docs.

### Customizing NJWDS or compiling your own assets

The NJWDS package also includes pre-compiled files in the `src/` directory. Specifically, we add custom styles to USWDS on `_uswds-theme-custom-styles.scss` and custom theme on `_uswds-theme.scss`. Follow the instructions on the [USWDS Documentation - Compiling SASS into CSS](https://designsystem.digital.gov/documentation/developers/#compiling-uswds-sass-into-css) page to compile your own CSS using SASS.

## Developing the library

### Initial set up

- Clone this repository
- Run `npm install`
- [Optional] Run `npm run import-components` to import new USWDS components. This only needs to be done if new upstream components are developed. This imports the USWDS, pulls in the NJ-specific components and styles, and saves them in a `dist` directory. Note: This option may no longer work, if trying it out, use caution and check for regressions.

## Build the design system assets

- Run `npm run build-njwds` to build the assets into the `dist/` directory

### Build the component library

- Run `npm run build-docs` to build the [Fractal](https://fractal.build/) component gallery for reviewing the component documentation. (This command also copies the `dist` directory to `/public` to be served as static assets for the Fractal site.)

### View component library locally or development

#### Start the local development server
- Run `npm start` to build the component library, launch a web server to host it, and live reload on development changes.

#### Preview the static site
- To view the static site, start a local server within the `/build` directory (e.g. using VSCode's Live Server extension). The server won't live reload on development changes. However, **it's crucial to preview the static site before deployment in order to ensure the Fractal docs site works as expected**, as `npm start` might not catch issues with static asset paths, etc.

### Deploy the component library

- Run `npm run deploy`

This builds NJWDS styles, builds the Fractal docs, and then deploys them to the `gh-pages` branch. The deployed docs can be found [here](https://newjersey.github.io/njwds).

Note: **Do not run `npm run deploy` locally** or push directly to the `gh-pages` branch. This is done automatically through the ["Deploy to GitHub Pages" GitHub Action](https://github.com/newjersey/njwds/actions/workflows/deploy-to-gh-pages.yml) when a new release is published.

## Releasing a new version to NPM

1. Go to the [Draft Release GitHub Action](https://github.com/newjersey/njwds/actions/workflows/draft-release.yml)
2. Click the "Run workflow" dropdown, keep the branch set to `main`, and update the Semver Level based on what has changed since the previous release ([semver documentation](https://semver.org/)). Click the green button to "Run workflow".
3. This should create a new Pull Request bumping the `package.json` file's version according to the level you set to the release (e.g. minor release changes version from 0.1.0 to 0.2.0). Rebase & merge this PR into the `main` branch.
4. Go to the [GitHub Releases page](https://github.com/newjersey/njwds/releases) and confirm that you see a new draft release with this version. (Note that this will automatically happen after Step 2, and is not dependent on Step 3)
5. On the releases page, click the pencil icon on the top right to Edit the release. Document what has changed in this release; be sure to note any breaking changes. Once all looks good, click "Publish release" at the bottom.
6. This will automatically trigger the ["Deploy to GitHub Pages" GitHub Action](https://github.com/newjersey/njwds/actions/workflows/deploy-to-gh-pages.yml) as well as the ["Publish Release" GitHub Action](https://github.com/newjersey/njwds/actions/workflows/publish-release.yml). Confirm the "Publish Release" action succeeded by checking the the [NJWDS package](https://www.npmjs.com/package/@newjersey/njwds) on the NPM registry.
