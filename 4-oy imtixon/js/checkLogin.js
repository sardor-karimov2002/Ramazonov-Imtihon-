let token = localStorage.getItem('token')

if(!token){
    window.location.replace('loginPage.html')
}