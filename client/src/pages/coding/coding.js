import axios from "axios";

var enc_file = document.querySelectorAll('.encoding input')[0];
var enc_text = document.querySelectorAll('.encoding input')[1]; 
var enc_button = document.querySelectorAll('input[value="Encode"]')[0]


getUser()


var base64Output = document.querySelector('.encoding .base64-output')

var dec_text = document.querySelector('.decoding textarea')
var dec_button = document.querySelector('input[value="Decode"]')



// for encoding
enc_button.onclick = () => {
    if(enc_file.value !== '' || enc_text.value !== ''){
        if(enc_file.value !== ''){
            base64Encoder(enc_file.files[0])
        }

        else {
            const http = new XMLHttpRequest();
            http.onload = () => {
                base64Encoder(http.response)
            }
            http.responseType = 'blob';
            http.open('GET', enc_text.value, true)
            http.send()
            }
         
        }
    }

// encode function
function base64Encoder(blob){
    const reader = new FileReader();
    reader.readAsDataURL(blob)
    reader.onloadend = () => {
        base64Output.innerHTML = reader.result
    }
}

dec_button.onclick = () => {
    if(dec_text.value !== ''){
        base64Decoder(dec_text.value)
    }
}

//decode function
function base64Decoder(base64){
    const http = new XMLHttpRequest();
     http.onload = () => {
        const url = window.URL.createObjectURL(http.response)
        const fileFormat = http.response.type.split('/')[1]
        const link = document.createElement('a')
        link.href = url
        link.download = `image-from-base64.${fileFormat}`
        link.click();
     }
     http.responseType = 'blob';
     http.open('GET', base64, true) 
     http.send();
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
