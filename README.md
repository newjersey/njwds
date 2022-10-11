# NJ Web Design Standards

The NJ Web Design Standards are an extension of the [US Web Design Standards](https://github.com/uswds/uswds/) with a specific theme and components for State of New Jersey digital properties and services.

## Using the library

- If you are using Node and npm in your project, then you can install the package in the root of your project directory with the following command in your terminal:

```bash
npm install @newjersey/njwds --save
```

If this worked successfully, you should see `@newjersey/njwds` listed as a new dependency in your `package.json` file.

- In the root JavaScript file of your project's frontend, import the CSS for this designs system with the following line:

```js
import "@newjersey/njwds/dist/css/styles.css";
```

- Use the CSS classes in your frontend code (HTML or JS) to render certain NJWDS components. For a full list of examples and the corresponding code, see here: https://newjersey.github.io/njwds/components/detail/layout--docs.html. Note that the NJWDS is built on top of the USWDS. Components and utilities included in the USWDS can be used with this same package, only they will have certain themed styling included: https://designsystem.digital.gov.

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
