# gatsby-remark-import-code

### Install

```bash
$ npm install gatsby-remark-import-code
```

### Use

Use it together with [gatsby-plugin-mdx](https://www.gatsbyjs.org/packages/gatsby-plugin-mdx/). In `gatsby-config.js`:

```js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [`gatsby-remark-import-code`]
      }
    }
  ]
};
```

It transforms md/mdx code blocks from this:

````md
```js file=./hello-world.js
```
````

into:

````md
```js
function helloWorld() {
  return "hello world";
}
```
````

### Related

- [gatsby-remark-embed-snippet](https://www.gatsbyjs.org/packages/gatsby-remark-embed-snippet/)
