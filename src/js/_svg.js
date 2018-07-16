/*-------------------------------------------------------------------------------
    SVG Load
-------------------------------------------------------------------------------*/
export default function svgInclude() {
  fetch('images/symbol-defs.svg').then(response => response.text()).then((text) => {
    const div = document.createElement('div');
    div.innerHTML = text;
    document.body.insertBefore(div, document.body.childNodes[0]);
  });
}