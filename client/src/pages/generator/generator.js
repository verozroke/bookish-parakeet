import axios from 'axios';



const password_el = document.querySelector('#password');
const length_el = document.querySelector('#length');
const upperCase_el = document.querySelector('#uppercase');
const lowerCase_el = document.querySelector('#lowercase');
const numbers_el = document.querySelector('#numbers');
const symbols_el = document.querySelector('#symbols');

getUser()





const generate_btn = document.querySelector('#generate');
generate_btn.addEventListener('click', generatePassword);

const copy_btn = document.querySelector('#copy');
copy_btn.addEventListener('click', copyPassword);

const upperCase_chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCase_chars = "abcdefghijklmnopqrstuvwxyz";
const numbers_chars = "0123456789";
const symbols_chars = "!@#$%^&*()"

function generatePassword(){
    let password = "";
    let length = length_el.value;
    let chars = "";

    chars += upperCase_el.checked ? upperCase_chars : "";
    chars += lowerCase_el.checked ? lowerCase_chars : "";
    chars += numbers_el.checked ? numbers_chars : "";
    chars += symbols_el.checked ? symbols_chars : "";

    for(let i = 0; i <= length - 1; i++){
        let rand = Math.floor(Math.random() * chars.length);
        password += chars.substring(rand, rand + 1);
    }

    password_el.value = password;
}

async function  copyPassword(){
    if(navigator.clipboard){
    await navigator.clipboard.writeText(password_el.value);
    }
}

async function fetchData() {
    const response = await axios.get('http://localhost:3010/api/user/', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODQ0MmJmNWM1MDBlM2EzNmJjYTQwMyIsImxvZ2luIjoiYXJ0ZW1sb3giLCJpYXQiOjE2ODYzODk4NTQsImV4cCI6MTY4NjQzMzA1NH0.AdWpnzjy1MKCV4FahMpttal-6e1I74tiB7xsxjHSGIU",
        } 
    })

    console.log(response)
}




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
        document.querySelector('#nickname').innerHTML = data.login
        
    } catch(e) {
        const link = document.createElement('a')
        link.href = '../login/login.html'
        link.click()
    }


}