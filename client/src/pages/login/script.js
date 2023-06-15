import axios from 'axios'

document.querySelector('#login-button').addEventListener('click', () => {
    login()
})

async function login() {
    const passwordInput = document.querySelector('#Password')
    const loginInput = document.querySelector('#name')

    const body = {
        login: loginInput.value,
        password: passwordInput.value
    }

    try {
        const response = await axios.post('http://localhost:3010/api/user/login', body, {
            headers: { 'Content-Type': 'application/json' }
        })

        console.log(response.data)

        if(!response.data.success) {
            alert('Not correct login or password!')
            loginInput.value = ''
            passwordInput.value = ''
        }

        localStorage.setItem('token', response.data.token)

        alert('User successfully logged in')

        const link = document.createElement('a')

        link.href = '../checker/checker.html'
  
        link.click()
    } catch(e) {
        alert('Not correct login or password')
        loginInput.value = ''
        passwordInput.value = ''
    }
    
}