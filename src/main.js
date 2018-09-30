const main = document.querySelector('#main')
const headerHeight = document.getElementsByTagName('NAV')[0].offsetHeight
const footerHeight = document.getElementsByTagName('FOOTER')[0].offsetHeight
let userLoggedIn = false
const homeBtn = document.querySelector('.home-btn')
const navAddBike = document.querySelector('.addBike-btn')
const loginTemplate = document.querySelector('#login_template')
const signupTemplate = document.querySelector('#signup_template')
const loginStatusBtn = document.querySelector('.loginStatus-btn')



// Sets main content's vertical margins so it doesn't go under the header and footer.
function setMainMargins() {
    main.style.top = headerHeight + 'px'
    main.style.bottom = footerHeight + 'px'
}
document.addEventListener('DOMContentLoaded', setMainMargins)

navAddBike.addEventListener('click', toggleLogin)
homeBtn.addEventListener('click', () => renderCards(bikeList))
loginStatusBtn.addEventListener('click', toggleLogin)


// Displays the Login form
function toggleLogin(e) {
    e.preventDefault()
    if (!userLoggedIn) {
        const loginClone = loginTemplate.cloneNode(true)
        main.innerHTML = loginClone.innerHTML
        // Places listener on the 'Create an account' button
        const signupBtn = document.querySelector('.login_register_btn')
        signupBtn.addEventListener('click', toggleSignup)

        // Places listener on login button to submit credentials
        const submitLoginBtn = document.querySelector('.login_form_submit')
        submitLoginBtn.addEventListener('click', submitData)
    } else {
        logOut()
    }
}

function submitData(e) {
    e.preventDefault()
    const submitLoginBtn = document.querySelector('.login_form_submit')
    const signupBtn = document.querySelector('.login_register_btn')

    if (e.target === submitLoginBtn) {
        console.log("It is sbmt btn")
        const loginForm = document.querySelector('.login_form');
        const loginButton = loginForm.elements[2];
        const loginCredentials = {
            username: loginForm.elements[0].value,
            password: loginForm.elements[1].value
        }
    
        validateCredentials(loginCredentials, loginForm, loginButton)
    } else if (e.target === signupBtn) {
        console.log("I'm SIGNUP  btn")
        const signupData = {
            firstname: loginForm.elements[0].value,
            lastname: loginForm.elements[1].value,
            email: loginForm.elements[2].value,
            password: loginForm.elements[3].value,
        }

        validateCredentials(loginCredentials, loginForm, loginButton)
    }

}

function toggleSignup(e) {
    e.preventDefault()
    const signupClone = signupTemplate.cloneNode(true)
    main.innerHTML = signupClone.innerHTML
}

function validateCredentials(data, loginForm, loginBtn) {
    let validated = false
    if (Object.keys(data).length === 2) {
        users.forEach(user => {
            if(JSON.stringify(user) === JSON.stringify(data)) { 
                validated = true
                 userLoggedIn = true
                 renderCards(bikeList)
            }
        })
    }

    if (validated) {
        console.log('Yeey! COME ON IN!!')
    } else {
        displayErrorMessage(loginForm, loginBtn, 'No luck, TRY AGAIN!')
    }
}

function displayErrorMessage(parentElement, refferenceElement, message) {
    const div = document.createElement('div')
    div.append(document.createTextNode(message))
    div.className = "error_message"
    parentElement.insertBefore(div, refferenceElement)
    setTimeout(() => div.remove(), 3000)
}

// renderCards takes a bike object array and renders bike cards into main content.
function renderCards(bikes) {
    if (userLoggedIn) {loginStatusBtn.innerText = 'Sign Out'}
    main.innerHTML = `
        <div class="product_list_wrapper">
            <ul class="product_list"></ul>
        </div>
    `
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

function logOut() {
    userLoggedIn = false;
    loginStatusBtn.innerText = 'Login'
}