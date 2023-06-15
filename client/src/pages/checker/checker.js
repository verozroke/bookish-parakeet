import axios from "axios";

const password_checker = document.querySelector('.password-checker');
const password = document.querySelector('#password');
const progress_bar = document.querySelector('.bar');
const showBtn = document.querySelector('#showBtn');
document.querySelector('.closeEye').style.cssText = `display:none;`;


getUser()



password.onkeyup = ()=> {
    checkPasswordStrength(password.value);
}

function checkPasswordStrength(password){
    let strength = 0;
    let lowerCase = document.querySelector('.lower');
    let upperCase = document.querySelector('.upper');
    let number = document.querySelector('.number');
    let specialChar = document.querySelector('.special');
    let size = document.querySelector('.lenght');

    if(password.match(/(?=.*[a-z])/)){ 
        strength++;
        lowerCase.classList.add('valid');
    }
    else{
        lowerCase.classList.remove('valid')
    }

    if(password.match(/(?=.*[A-Z])/)){
         strength++;  
         upperCase.classList.add('valid');
    }
    else{
        upperCase.classList.remove('valid')
    }

    if(password.match(/(?=.*[0-9])/)){
         strength++; 
         number.classList.add('valid');
    }
    else{
        number.classList.remove('valid')
    }
    if(password.match(/(?=.*[!@#$%^&*()])/)){
         strength++; 
         specialChar.classList.add('valid');
    }
    else{
        specialChar.classList.remove('valid')
    }
    if(password.length >= 9){
         strength++; 
         size.classList.add('valid');
        }
        else{
            size.classList.remove('valid')
        }

    console.log(strength);

    switch(strength){

    case 0: 
        progress_bar.style.cssText = `width : ${(strength/5)*100}%; background-color: white; `;
        break;

    case 1: 
       progress_bar.style.cssText = `width : ${(strength/5)*100}%; background-color: red; `; 
       break;

    case 2: 
       progress_bar.style.cssText = `width : ${(strength/5)*100}%; background-color: orangered; `;
       break;

    case 3: 
       progress_bar.style.cssText = `width : ${(strength/5)*100}%; background-color: gold; `;
       break;

    case 4: 
       progress_bar.style.cssText = `width : ${(strength/5)*100}%; background-color: deepskyblue; `;
       break;

    case 5: 
       progress_bar.style.cssText = `width : ${(strength/5)*100}%; background-color: lime; `;
       break;
    
}
}
showBtn.onclick = function(){
    if (password.type === 'password'){
        password.setAttribute('type' , 'text');
        document.querySelector('.openEye').style.cssText = `display:none;`;
        document.querySelector('.closeEye').style.cssText = `display:visible;`;
    }
    else{
        password.setAttribute('type' , 'password');
        showBtn.classList.remove('hide');
        document.querySelector('.openEye').style.cssText = `display:normal;`;
        document.querySelector('.closeEye').style.cssText = `display:none;`;
    }
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
        // link.click()
    }


}
