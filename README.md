# simple-html-macro

The simplest way to reuse markup in your web page.


## Usage

This library allows you to create custom HTML tags that get replaced by a pre-defined template.
Here's how to use it.

**Step 1: Create your macro template.**

- Use a `template` tag with `type="macro"` as your template.
- The `tag-name` attribute will signify your custom element's name.
- Use `${my-attribute-name}` or `<slot name="my-slot-name"></slot>` as placeholders for argument substitution.
- Any other attributes on your template tag will serve defaults for argument substitution.

In the example below, the tag name is "guest-nametag", its parameters are "fullname", "role", and "color",
and the default color is "black".

```
<template type="macro" tag-name"guest-nametag" color="black">
    <div class="rounded" style="color:${color}">
        <h1>${fullname}</h1>
        <slot name="role">
    </div>
</template>
```

**Step 2: Include `simple-html-macro.js` in your HTML file.**

```
<script src="https://cdn.jsdelivr.net/gh/neilmix/simple-html-macro@1.0.1/simple-html-macro.js"></script>
```

**Step 3: Use your custom HTML tag.**

Arguments can be specified using attributes, or by providing inner content using the `slot` attribute.

```
<body>
    <p>Guests invited to the party:</p>

    <!-- This nametag uses the default color of black. -->
    <guest-nametag fullname="Jane Appleseed" role="CEO"></guest-nametag>

    <!-- This nametag specifies an unordered list as the "roll" argument. -->
    <guest-nametag fullname="Johnny Appleseed" color="red">
      <ul slot="role">
        <li>Marketing</li>
        <li>Web Design</li>
      </ul>
    </guest-nametag>

</body>
```

That's it! The above will render as:

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

  To render HTML, use a `slot`.

- **Though tempting, you'll likely want to avoid using self-closing tags.**

  For example, using `<my-tag />` syntax is best avoided. The reasons for this are complicated and historical. [Read more here.](https://jakearchibald.com/2023/against-self-closing-tags-in-html/)

- **Dynamic modifications to tag definitions are not supported.**

  Once a tag is defined, it cannot be redefined. This is a limitation of the web component API.

## Arcane Details

- **Macros are replaced in-line, with no obtrusive parent container tags.**

  For example, suppose you have this template:
  `<template type="macro" tag-name="my-tag"><span>one</span> <span>two</span></template>`

  And this HTML:
  `<span>before</span> <my-tag></my-tag> <span>after</span>`

  Your content will render as:
  `<span>before</span> <span>one</span> <span>two</span> <span>after</span>`

- **Custom tags and templates via this library are not true web components.**

  This library uses web component APIs, but this library is intended for in-line macro replacement,
  which is at odds with the encapsulation that true web components provide.

  Mostly this isn't a problem. But, be aware that custom tag contents are scoped globally. For example,
  unlike true web components, styles declared within a template will effect ***all*** HTML
  on the page, not just the custom tag's contents.
