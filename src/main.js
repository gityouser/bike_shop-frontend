const main = document.querySelector('#main');
const headerHeight = document.getElementsByTagName('NAV')[0].offsetHeight;
const footerHeight = document.getElementsByTagName('FOOTER')[0].offsetHeight;
console.log(headerHeight);
console.log(footerHeight);

function setMainMargins() {
    main.style.marginTop = headerHeight + 'px';
    main.style.marginBottom = footerHeight + 'px';
}
document.addEventListener('DOMContentLoaded', setMainMargins);

function renderCatalog(bikes) {
    const productList = document.querySelector('.product_list')
    const altImg = 'http://michaelscycles-mn.com/wp-content/uploads/2015/09/BB-Logo-No-Background-300W.png'

    productList.innerHTML = bikes.map( bike => {
      return `
        <li class="product_list_item">
            <div>
                <img 
                    src="${bike.url}" 
                    onerror="this.src='${altImg}'"
                >
            </div>
            <p>${bike.title}</p>
        </li>
      `
    }).join('')
}

renderCatalog(bikeList)