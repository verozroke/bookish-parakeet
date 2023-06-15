import axios from 'axios'

document.getElementById('Register').addEventListener('click', () => {
  matchPassword()
})


async function matchPassword() {
    const loginInput = document.getElementById('name')
    const pw1 = document.getElementById("Password");  
    const pw2 = document.getElementById("PasswordRep");  
    if(pw1.value !== pw2.value) {
      alert('Password not match')
      return
    }

    const body = {
      login: loginInput.value,
      password: pw1.value
    }
    
    try {
      const response = await axios.post('http://localhost:3010/api/user/register', body, {
        headers: { 'Content-Type': 'application/json' }
      })

      alert('Successfully registered')

      const link = document.createElement('a')

      link.href = '../login/login.html'

      link.click()
    }
    catch(error) {
      pw1.value = ''
      pw2.value = ''
      loginInput.value = ''
      alert('Enter your login and password again')
      return
    }

}  