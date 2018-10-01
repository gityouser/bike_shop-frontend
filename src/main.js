const main = document.querySelector('#main')
const headerHeight = document.getElementsByTagName('NAV')[0].offsetHeight
const footerHeight = document.getElementsByTagName('FOOTER')[0].offsetHeight
const homeButtons = document.querySelectorAll('.home-btn')
const searchBox = document.querySelector('.searchBox')
const contactBtn = document.querySelector('.contact_btn')
const navAddBike = document.querySelector('.addBike-btn')
const loginTemplate = document.querySelector('#login_template')
const signupTemplate = document.querySelector('#signup_template')
const addBikeTemplate = document.querySelector('#addBike_template')
const contactTemplate = document.querySelector('#contact_template')
const loginStatusBtn = document.querySelector('.loginStatus-btn')
let userLoggedIn = false

// Sets main content vertical margins and loads initial event listeners 
document.addEventListener('DOMContentLoaded', () => {
    setMainMargins()
    navAddBike.addEventListener('click', addBike)
    homeButtons.forEach(homeBtn => homeBtn.addEventListener('click', () => renderCards(bikeList)))
    loginStatusBtn.addEventListener('click', toggleLoginPage)
    contactBtn.addEventListener('click', toggleContactPage)
    searchBox.addEventListener('keyup', onSearchChange)
})

// Re-renders the cards with the filtered bikes
function onSearchChange(e) {
    const searchedValue = e.target.value;
    const filteredBikes = bikeList.filter(bike => bike.title.toLowerCase().includes(searchedValue.toLowerCase()))
    renderCards(filteredBikes)
}

// Sets main content's vertical margins so it doesn't go under the header and footer.
function setMainMargins() {
    main.style.top = headerHeight + 'px'
    main.style.bottom = footerHeight + 'px'
}

// Pushes data submitted via signup and addBike forms, into the original storage arrays
function pushBikeData(e) {
    e.preventDefault()
    const form = e.target.parentElement
    const bikeData = {
        id: bikeList.length + 1,
        title: form.elements[1].value,
        url: form.elements[0].value,
    }
    validateSubmittedData(bikeData, form, e.target)
}

// Pushes to users array the signup object submitted by the user
function pushUserData(data) {
    users.push(data)
    renderCards(bikeList)
}

//If user is logged in, it displays the add bike page, else - pops up the login page
function addBike(e) {
    e.preventDefault()
    if (userLoggedIn) {
        const addBikeClone = addBikeTemplate.cloneNode(true)
        main.innerHTML = addBikeClone.innerHTML;
        const addBikeBtn = document.querySelector('.addBike_form_submit')
        addBikeBtn.addEventListener('click', pushBikeData)
        return;
    }
    toggleLoginPage(e)
}

// Displays the Login form
function toggleLoginPage(e) {
    e.preventDefault()
    if (!userLoggedIn) {
        const loginClone = loginTemplate.cloneNode(true)
        main.innerHTML = loginClone.innerHTML
        // Places listener on the 'Create an account' button
        const signupBtn = document.querySelector('.login_register_btn')
        signupBtn.addEventListener('click', toggleSignupPage)

        // Places listener on login button to submit credentials
        const submitLoginBtn = document.querySelector('.login_form_submit')
        submitLoginBtn.addEventListener('click', submitDataForValidation)
    } else {
        logOut()
    }
}

// Submits Login and SignUp form data for validation
function submitDataForValidation(e) {
    e.preventDefault()
    const submitLoginBtn = document.querySelector('.login_form_submit')
    const signupBtn = document.querySelector('.signup_form_submit')

    if (e.target === submitLoginBtn) {
        const loginForm = document.querySelector('.login_form');
        const loginButton = loginForm.elements[2];
        const loginCredentials = {
            username: loginForm.elements[0].value,
            password: loginForm.elements[1].value
        }
    
        validateSubmittedData(loginCredentials, loginForm, loginButton)
    } else if (e.target === signupBtn) {
        const signupForm = document.querySelector('.signup_form');
        const signupData = {
            username: signupForm.elements[0].value,
            name: signupForm.elements[1].value,
            email: signupForm.elements[2].value,
            password: signupForm.elements[3].value,
        }

        validateSubmittedData(signupData, signupForm, signupBtn)
    }

}

// Displays the Sign Up page
function toggleSignupPage(e) {
    e.preventDefault()
    const signupClone = signupTemplate.cloneNode(true)
    main.innerHTML = signupClone.innerHTML
    const signupBtn = document.querySelector('.signup_form_submit')
    signupBtn.addEventListener('click', submitDataForValidation)
}

// Displays the contact page
function toggleContactPage(e) {
    e.preventDefault(e)
    const contactClone = contactTemplate.cloneNode(true)
    main.innerHTML = contactClone.innerHTML
}

// Validates the input received from login, signup and addBike forms.
// Depending on the validation result, it can push the data to the data arrays, change the userLoggedIn state or display error messages, via displayErrorMessage.
function validateSubmittedData(data, parentForm, targetButton) {
    // Check if it's signup data
    if (Object.keys(data).length === 4) {
        if (data.username.length  && data.password.length) {
            console.log("Coolio, you're signed up")
            pushUserData(data)
        } else {
            displayErrorMessage(parentForm, targetButton, 'Minimum USERNAME and password')
        }
        return
    }
    // Check if it's login data
    else if ('username' in data) {
        const index = users.findIndex(user => user.username === data.username && user.password === data.password)

        if(index !== -1) { 
                userLoggedIn = true
                renderCards(bikeList)
        } else {
            console.log('here')
            displayErrorMessage(parentForm, targetButton, 'No luck, TRY AGAIN!')
        }
    } 
    // Check if it's addBike data
    else if ('title' in data) { 
        if (data.url && data.title) {
            bikeList.push(data)
            renderCards(bikeList)
        } else {
            displayErrorMessage(parentForm, targetButton, 'Add URL and Title')
        }
    } 
}

// Displays a custome message, in a div, positioned before a refferenced element
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
    renderCards(bikeList)
}