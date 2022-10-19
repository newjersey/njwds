# NJ Web Design Standards

The NJ Web Design Standards are an extension of the [US Web Design Standards](https://github.com/uswds/uswds/) with a specific theme and components for State of New Jersey digital properties and services.

## How to install and use the NJWDS

### With Node and NPM

Follow the instructions on the [USWDS Documentation - Installation](https://designsystem.digital.gov/documentation/developers/#installation) page starting at "Install using Node and npm." The key difference between these instructions and what you will need to do is that our package name is `@newjersey/njwds` instead of `@uswds/uswds`. Therefore, on Step 4, your installation commmand would be:

```bash
npm install @newjersey/njwds --save
```

Once installed, the NJWDS package name would affect the file path used in `node_modules` as well (i.e. `node_modules/@newjersey/njwds/dist/` instead of `node_modules/@uswds/uswds/dist/`).

### Without a package manager

1. On our [Github Releases page](https://github.com/newjersey/njwds/releases), on the latest release (at the top of the list), you will see an "Assets" section at the bottom of the release information. Click on the "Source codede (zip)" link to download our package.
2. Follow the instructions on the [USWDS Documentation - Installation](https://designsystem.digital.gov/documentation/developers/#installation) page, starting with Step 2 of "Install the package directly from GitHub." Note that in our case, you would want to replace the `uswds` folder name with `njwds`.

### Using NJWDS files in your project

Follow the instructions on the [USWDS Documentation - Using USWDS](https://designsystem.digital.gov/documentation/developers/#using-uswds-css-and-javascript-in-your-project) page. Note that instead of `uswds.css` or `uswds.min.css`, you will refer to `styles.css` in the `/dist/css` directory. Also, the filepath should have `njwds` instead of `uswds` (i.e. `assets/njwds/dist/js/uswds.min.js` instead of `assets/uswds/dist/js/uswds.min.js`).

For a full list of examples of NJWDS components and their corresponding code, see our [NJWDS Component Gallery](https://newjersey.github.io/njwds/components/detail/layout--docs.html). Note that because the NJWDS is built on top of the USWDS, you can use USWDS [components](https://designsystem.digital.gov/components/overview/) and [utilities](https://designsystem.digital.gov/utilities/) not listed in our docs.

### Customizing NJWDS or compiling your own assets

The NJWDS package also includes pre-compiled files in the `src/` directory. Specifically, we add custom styles to USWDS on `_uswds-theme-custom-styles.scss` and custom theme on `_uswds-theme.scss`. Follow the instructions on the [USWDS Documentation - Compiling SASS into CSS](https://designsystem.digital.gov/documentation/developers/#compiling-uswds-sass-into-css) page to compile your own CSS using SASS.

### Without build tools

If you’re using a framework or package manager that doesn’t support npm, you can find the source files in this repository and use them in your project. Otherwise, we recommend that you follow the steps outlined in this section.

## Developing the library

### Initial set up

- Clone this repository
- Run `npm install`
- [Optional] Run `npm run import-components` to important new USWDS components. This only needs to be done if new upstream components are developed

This imports the USWDS, pulls in the NJ-specific components and styles, and saves them in a `dist` directory.

### Build the component library

- Run `npm run build-docs` to general a [Fractal]() component gallery for reviewing the style guide

### View component library locally or development

- Run `npm start` to build the component library, launch a web server to host it, and live reload on development changes.

### Deploy the component library

- Run `npm run deploy`

This builds USWDS styles, builds the Fractal docs, and then deploys them to the gh-pages branch.

Note: do not push directly to the gh-pages branch.
