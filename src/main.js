const main = document.querySelector('#main')
const headerHeight = document.getElementsByTagName('NAV')[0].offsetHeight;
const footerHeight = document.getElementsByTagName('FOOTER')[0].offsetHeight;
console.log(headerHeight);
console.log(footerHeight);

function setMainMargins() {
    main.style.marginTop = headerHeight + 'px';
    main.style.marginBottom = footerHeight + 'px';
}
document.addEventListener('DOMContentLoaded', setMainMargins);