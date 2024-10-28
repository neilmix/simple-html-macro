# simple-html-macro

A drop-in library for creating simple custom macro tags in HTML.

## Usage

**Step 1: Create your macro template.**

>```
><template type="macro" tag-name"name-tag">
>    <div class="rounded">
>        <h1 slot="fullname"></h1>
>        <h2><slot name="role"></h2>
>    </div>
></template>
>```

**Step 2: Include `simple-html-macro.js` in your HTML file.**

>```
><script src="simple-html-macro.js"></script>
>```

**Step 3: Use your custom HTML tag.**

>```
><body>
>    <p>Guests invited to the party:</p>
>    <name-tag fullname="Johnny Appleseed" role="Chief Architect"></name-tag>
>    <name-tag fullname="Jane Appleseed" role="CEO"></name-tag>
></body>
>```

That's it!

## Valuable Details

- **The tag name must contain a hyphen.**

>This is a requirement of DOM APIs to prevent future conflicts with standard HTML tags.

- **By default, attribute values are HTML-escaped.**

>To render attribute values as HTML, append -html to the attribute name:  
>`<name-tag fullname-html="Ferris <b><i>Bueller</i></b>" role="Sausage King"></name-tag>`

- **Though tempting, you'll likely want to avoid using self-closing tags.**

>For example, using `<my-tag />` syntax is best avoided.
>The reasons for this are complicated and historical. 
>[Read more here.](https://jakearchibald.com/2023/against-self-closing-tags-in-html/)

## Arcane Details

- **Macros are replaced in-line, with no obtrusive parent container tags.**

>For example, supposed you have this template:  
>`<template type="macro" tag-name="my-tag"><span>one</span> <span>two</span></template>`  
>  
>And this HTML:  
>`<span>before</span> <my-tag></my-tag> <span>after</span>`  
>  
>Your content will render as:  
>`<span>before</span> <span>one</span> <span>two</span> <span>after</span>`  
  
- **Custom tags and templates via this library are not true web components.**  

> This library uses some web component APIs, but this library is intended for in-line
> macro replacement, which is at odds with the encapsulation that true web components provide.
>
> Mostly this isn't a problem. But, be aware that custom tag contents are scoped globally.
> For example, unlike true web components, styles declared via style tag within a 
> template will effect ***all*** HTML on the page, not just the custom tag's contents.

