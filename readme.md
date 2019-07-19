# remark-import-code

### Install

```bash
$ npm install remark-import-code
```

### Use

The idea is to transform md/mdx like this:

````md
```js file=./hello-world.js
```
````

Into:

````md
```js
function helloWorld() {
  return "hello world";
}
```
````

But this plugin gets you half way there. You need to use the `remark-import-code/loader` somewhere (maybe in webpack). I use it like this with gatsby:

```jsx
import { MDXRenderer } from "gatsby-plugin-mdx";
import replaceCode from "remark-import-code/loader";

// ...
<MDXRenderer>{replaceCode(post.body)}</MDXRenderer>;
// ...
```

This shouldn't be necessary, but I don't know how to get the file path when the plugin runs. Ideally it should work like [remark-embed-images](https://github.com/remarkjs/remark-embed-images/blob/master/index.js#L30).
