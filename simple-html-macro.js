(() => {
  const macros = document.querySelectorAll("template[type=macro]");
  macros.forEach((macro) => {
    const tag = macro.getAttribute("tag-name");
    const newcl = class extends HTMLElement {
      connectedCallback() {
        requestAnimationFrame(() => {
          // clone our template, an HTMLDocumentFragment that eventually replaces `this` in the DOM
          let frag = macro.content.cloneNode(true);

          // find all slots in our instance content
          let slots = {};
          for (let el of this.querySelectorAll("[slot]")) {
            slots[el.getAttribute("slot")] = el;
          }

          // replace all slots in the template with the corresponding slot in the instance content (if present)
          for (let tag of frag.querySelectorAll("slot")) {
            let attr = tag.getAttribute("name");
            if (slots[attr]) {
              tag.replaceWith(slots[attr].cloneNode(true));
            } else {
              let value = this.getAttribute(attr);
              if (value !== null) {
                tag.insertAdjacentText("beforebegin", value);
                tag.remove();
              }
            }
          }

          let interpolate = (value) => {
            return value.replace(/\${([^}]+)}/g, (_, attr) => {
              return (
                (slots[attr] && slots[attr].textContent) ||
                this.getAttribute(attr) ||
                macro.getAttribute(attr) ||
                ""
              );
            });
          };

          // crawl our fragment DOM and interpolate any ${} macros
          for (let el of frag.querySelectorAll("*")) {
            for (let attr of el.getAttributeNames()) {
              let value = el.getAttribute(attr);
              if (value !== null) {
                el.setAttribute(attr, interpolate(value));
              }
            }
          }

          (function interpolateText(node) {
            if (node.nodeType === Node.TEXT_NODE) {
              node.nodeValue = interpolate(node.nodeValue);
            } else {
              for (let child of node.childNodes) {
                interpolateText(child);
              }
            }
          })(frag);

          this.replaceWith(frag);
        });
      }
    };
    customElements.define(tag, newcl);
  });
})();
