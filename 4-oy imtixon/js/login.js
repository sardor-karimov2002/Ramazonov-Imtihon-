var formEl = document.querySelector('.form')
var loginInputEl = document.getElementById('login-input')
var passwordInputEl = document.querySelector('#login-password')

// window.localStorage.setItem('token','undefined')

formEl.addEventListener('submit', event => {
    event.preventDefault()
    // window.localStorage.setItem('token', undefined)
    const body = {
        email: loginInputEl.value,
        password: passwordInputEl.value
    }
    try {
        loginUser(body).then(res => res.json())
        .catch(err => alert('Ooops Something went wrong'))
    } catch (error) {
        alert(error)
    }
    // if(localStorage.getItem('token') != 'undefined'){
    //     window.location.replace('index.html')
    //     console.log(localStorage.getItem('token'))
    // }
    // else{
    //     alert('Ooops Something went wrong')
    //     console.log(localStorage.getItem('token'))
    // }
})

async function loginUser(credentials) {

    return new Promise((resolve, reject) => {
        fetch(`https://reqres.in/api/login`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(credentials)
    }).then(res => {
        if(res.status === 400)reject(res)
        return res.json()
    })
    .then(res => {
        if(res.token){
            window.localStorage.setItem('token',res.token)
            window.location.replace('index.html')
        }
        const response = JSON.parse(JSON.stringify(res))
        // alert(response.error)
    })
    .catch(err => reject(res ))
    })

    

    // return new Promise((resolve, reject) => { 
    //     fetch(`https://reqres.in/api/login`, {
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         method: 'POST',
    //         body: JSON.stringify(credentials)
    //     })
    //     .then(res => res.json())
    //     .then(res => {
    //             console.log(res)
    //             window.localStorage.setItem('token', res.token)
    //             resolve(res)
    //         })
    //     .catch(err => {
    //         reject(err)
    //             console.log(err)
    //             // alert(err)
    //         })
    // })
}