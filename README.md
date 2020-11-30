# NJ Web Design Standards

The NJ Web Design Standards are an extension of the [US Web Design Standards](https://github.com/uswds/uswds/) with a specific theme and components for State of New Jersey digital properties and services.

## Initial set up

* Clone this repository
* Run `npm install`
* [Optional] Run `npm run import-components` to important new USWDS components. This only needs to be done if new upstream components are developed

This imports the USWDS, pulls in the NJ-specific components and styles, and saves them in a `dist` directory.



## Build the component library

* Run `npm run build-docs` to general a [Fractal]() component gallery for reviewing the style guide


## View component library locally or development

* Run `npm start` to build the component library, launch a web server to host it, and live reload on development changes.

## Deploy the component library

* Run `npm run deploy`

This builds USWDS styles, builds the Fractal docs, and then deploys them to the gh-pages branch.

Note: do not push directly to the gh-pages branch.
