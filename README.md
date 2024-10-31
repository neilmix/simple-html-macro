# simple-html-macro

The simplest way to reuse markup in your web page.

## Usage

**Step 1: Create your macro template.**

```
<template type="macro" tag-name"name-tag" color="black">
    <div class="rounded" style="color:${color}">
        <h1>${fullname}</h1>
        <slot name="role">
    </div>
</template>
```

**Step 2: Include `simple-html-macro.js` in your HTML file.**

```
<script src="simple-html-macro.js"></script>
```

**Step 3: Use your custom HTML tag.**

```
<body>
    <p>Guests invited to the party:</p>
    <name-tag fullname="Jane Appleseed" role="CEO"></name-tag>
    <name-tag fullname="Johnny Appleseed" color="red">
      <ul slot="role">
        <li>Marketing</li>
        <li>Web Design</li>
      </ul>
    </name-tag>
</body>
```

That's it!

## In-depth explanation

* `template` tags with `type="macro"` declare your custom tag. The `tag-name` attribute is the name of your custom tag.
* Any other attributes of your `template` tag will define default attribute values for your custom tags. (In the example
  above, the `color` attribute is set to "black" by default.)
* Use `${<attribute-name>}` to insert attribute values from the custom tag into your template. They can be inserted into
  attribute values or text content.
* Use `slot` tags to insert HTML content from the custom tag into your template. The `name` attribute of the `slot` tag must
  match the `slot` attribute used within the custom tag.

Putting it all together, the above will render as:

```
<body>
    <p>Guests invited to the party:</p>
    <div class="rounded" style="color:black">
        <h1>Jane Appleseed</h1>
        CEO
    </div>
    <div class="rounded" style="color:red">
        <h1>Johnny Appleseed</h1>
        <ul>
            <li>Marketing</li>
            <li>Web Design</li>
        </ul>
    </div>
</body>
```

## Valuable Details

- **The tag name must contain a hyphen.**

  This is a requirement of DOM APIs to prevent future conflicts with standard HTML tags.

- **Attribute values are HTML-escaped.**

  To render HTML, use a `slot` tag in your template and a corresponding `slot` reference in your tag.

- **Though tempting, you'll likely want to avoid using self-closing tags.**

  For example, using `<my-tag />` syntax is best avoided. The reasons for this are complicated and historical. [Read more here.](https://jakearchibald.com/2023/against-self-closing-tags-in-html/)

## Arcane Details

- **Macros are replaced in-line, with no obtrusive parent container tags.**

  For example, supposed you have this template:  
  `<template type="macro" tag-name="my-tag"><span>one</span> <span>two</span></template>`

  And this HTML:  
  `<span>before</span> <my-tag></my-tag> <span>after</span>`

  Your content will render as:  
  `<span>before</span> <span>one</span> <span>two</span> <span>after</span>`

- **Custom tags and templates via this library are not true web components.**

  This library uses web component APIs, but this library is intended for in-line macro replacement,
  which is at odds with the encapsulation that true web components provide.

  Mostly this isn't a problem. But, be aware that custom tag contents are scoped globally. For example,
  unlike true web components, styles declared via style tag within a template will effect ***all*** HTML
  on the page, not just the custom tag's contents.
