import axios from "axios"

getUser()


async function getUser() {

    try {
        const { data } = await axios.get('http://localhost:3010/api/user/', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        if(data.message === 'Bad token') {
            throw new Error('User not authenticated')
        }
        document.querySelector('#navbar-authorized').style.display = 'flex'
        document.querySelector('#navbar-unauthorized').style.display = 'none'
        document.querySelector('#nickname').innerHTML = data.login

    } catch(e) {
        document.querySelector('#navbar-authorized').style.display = 'none'
        document.querySelector('#navbar-unauthorized').style.display = 'flex'
    }


}