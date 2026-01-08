# Lit vs. Stencil Running Notes

## Shadow DOM Exploration

- Autocomplete attribute
    - According to the [chromium issue](https://issues.chromium.org/issues/41276841), this bug was fixed
    - The autocomplete attribute works in my personal tests with chromium browser and Safari
        - `<input type="text" autocomplete="street-address" name="address" />`
- Accessibility 
    - [Cross-root ARIA delegation](https://leobalter.github.io/cross-root-aria-delegation/) is not currently supported - it’s not possible to associate elements in the shadow DOM and the light DOM using ARIA attributes. This is because element IDs are scoped to their respective DOM trees. 
        - I don’t foresee this being an issue in any of the components we’re planning on implementing yet. We can get around issues like not being able to associate labels and input elements by placing them in the shadow DOM together. 
    - Here’s a really good explainer on [Shadow DOM and accessibility](https://nolanlawson.com/2022/11/28/shadow-dom-and-accessibility-the-trouble-with-aria/)
- Tentative conclusions
    - I think shadow DOM is reasonable to use, multiple blog posts said design systems are a use case that benefit from shadow DOM 
    - If we come across a component where we truly cannot implement appropriate a11y using the shadow DOM, I think it’s reasonable to turn off shadow DOM on a per-component basis
        - We can work around losing slot functionality by inserting slotted children into the HTML using querySelector, which is what we were leaning towards anyways (vs. using ::slotted, which would require us replicate USWDS styles)

### Further Reading

- [Pros and cons of using Shadow DOM and style encapsulation](https://www.matuzo.at/blog/2023/pros-and-cons-of-shadow-dom/)
- [How Shadow DOM and accessibility are in conflict](https://alice.pages.igalia.com/blog/how-shadow-dom-and-accessibility-are-in-conflict/)
- [Shadow DOM and the problem of encapsulation](https://nolanlawson.com/2023/12/30/shadow-dom-and-the-problem-of-encapsulation/)

## Summary of Lit Exporation

- Lit works as an option, if we buy into using the shadow DOM
    - It’s possible to disable the shadow DOM, but doing so disables slots. And Implementing a workaround for non-shadow API slots will be too hacky (especially when it works natively in Stencil)
        - [This GitHub thread](https://github.com/lit/lit-element/issues/42#issuecomment-387408219) discusses the slot limitation + some workarounds
    - Note: there are still certain components that may require disabling the shadow DOM. 
        - For example, the [shadow DOM doesn’t play well with autocomplete](https://www.thisdot.co/blog/a-tale-of-form-autofill-litelement-and-the-shadow-dom)
- Using the shadow DOM requires us to alter how we approach styling
    - The main concern is styling slots, which exist in the light DOM and thus aren’t (generally) affected by shadow DOM styling. There are two options here:
        1. Use the [::slotted() pseudo-element](https://developer.mozilla.org/en-US/docs/Web/CSS/::slotted), which allows us to style slotted children from the shadow DOM
        2 Instead of using the `<slot>` tag, insert slotted children directly into the HTML. This places the children in the shadow DOM so they can be affected by the DOM styling (See table on next page)
    - To access the USWDS styles is possible, two options here
        - Add a `<link>` tag in the component code (this is not recommend)
            - The stylesheet should be cached by the browser, so it won’t be duplicated for every component instance
    - Directly import the external stylesheet
        - `import styles from * . ./node_modules/@newjersey/njwds/dist/css/styles.css'with { type: 'css' };`
        - This better for polyfill support, but we’re not sure if it’s going to construct an individual stylesheet for each component instance
    - Our tentative styling approach: combine the USWDS external stylesheet with component-specific CSS (for styling slots using ::slotted)
        - Using ::slotted might require us to replicate a lot of styles (e.g. to replicate usa-button) — this could be strong reason for us to insert slotted children into the shadow DOM instead

### Further reading

- [8 Ways to Style the Shadow DOM](https://jordanbrennan.hashnode.dev/8-ways-to-style-the-shadow-dom)

## Specific Lit Questions

- [Lit React integration](https://lit.dev/docs/frameworks/react/)
    - What is the difference compared to the Stencil integration?
        - Seems like in Lit, we have to individually define each React component (as opposed to Stencil which automatically creates a React component for each web component in the package) 
- How do we add styles into a component in Lit? 
    - Right now, putting in an `<link>` referencing the USWDS stylesheet within the component

## Lit vs. Stencil Broadly

- We generally lean towards switching to Lit, contingent on the fact there aren’t blockers that prevent us from developing web components 
    - Switching to Lit means we’re more aligned, better from the perspective of developers creating the design system
    - We can learn more from USWDS, they can help foresee problems we might run into, we can draw from their implementations directly
- How can we use USWDS web components? 
    - Can we leverage the USWDS components directly? Is there any way to compose or extend Lit components? 
    - Ideally, keep things as close to the upstream as possible, advocate to minimize differences between USWDS and NJWDS specs
    - Example: Link component has classes attributes that we could use for custom NJWDS styling
        - Seems less ideal to create our own copy of the USWDS implementation, then we’re responsible for keeping it in sync
- Potential blockers
    - Like Stencil, Lit implements web components using the shadow DOM by default. However, it seems like we can’t really turn off the Shadow DOM when using Lit because it turns off our ability to use slots. This means we have to explore two questions related to shadow DOM styling
        - Importing styles into components in general
        - Styling slotted children
- SSR - some Lit support but experimental (note from Lizzy: SSR with Stencil isn’t great either, they have a more mature API but I felt it was convoluted when I looked into it)