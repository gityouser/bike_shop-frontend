const main = document.querySelector('#main')
const headerHeight = document.getElementsByTagName('NAV')[0].offsetHeight
const footerHeight = document.getElementsByTagName('FOOTER')[0].offsetHeight
const userLoggedIn = false
const navAddBike = document.querySelector('.addBike-btn')
const loginTemplate = document.querySelector('#login_template')
const signupTemplate = document.querySelector('#signup_template')



// Sets main content's vertical margins so it doesn't go under the header and footer.
function setMainMargins() {
    main.style.top = headerHeight + 'px'
    main.style.bottom = footerHeight + 'px'
}
document.addEventListener('DOMContentLoaded', setMainMargins)

navAddBike.addEventListener('click', toggleLogin)

function toggleLogin(e) {
        e.preventDefault()
        if (!userLoggedIn) {
            const loginClone = loginTemplate.cloneNode(true)
            main.innerHTML = loginClone.innerHTML
    
            const signupBtn = document.querySelector('.login_register_btn')
            signupBtn.addEventListener('click', (e) => {
                e.preventDefault()
                const signupClone = signupTemplate.cloneNode(true)
                main.innerHTML = signupClone.innerHTML
        })
    }
}

// renderCards takes a bike object array and renders bike cards into main content.
function renderCards(bikes) {
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

renderCards(bikeList)