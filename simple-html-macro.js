(() => {
  const macros = document.querySelectorAll("template[type=macro]");
  macros.forEach((macro) => {
    const tag = macro.getAttribute("tag-name");
    const newcl = class extends HTMLElement {
      connectedCallback() {
        let interpolate = (attr, setText, setHTML) => {
          let value = this.getAttribute(attr);
          if (value !== null) {
            setText(value);
            return true;
          }
          value = this.getAttribute(attr + "-html");
          if (value !== null) {
            setHTML(value);
            return true;
          }
          return false;
        };
        let frag = macro.content.cloneNode(true);
        for (let tag of frag.querySelectorAll("slot")) {
          if (
            interpolate(
              tag.getAttribute("name"),
              (value) => tag.insertAdjacentText("beforebegin", value),
              (value) => tag.insertAdjacentHTML("beforebegin", value),
            )
          ) {
            tag.parentNode.removeChild(tag);
          }
        }
        for (let attrs of frag.querySelectorAll("[slot]")) {
          interpolate(
            attrs.getAttribute("slot"),
            (value) => (attrs.innerText = value),
            (value) => (attrs.innerHTML = value),
          );
        }
        this.parentNode.replaceChild(frag, this);
      }
    };
    customElements.define(tag, newcl);
  });
})();
