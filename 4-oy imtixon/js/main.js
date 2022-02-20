var bookList = document.querySelector('.list')
var bookTemplate = document.querySelector('#book-item-temp').content
var bookmarkTemplate = document.querySelector('.bookmark-temp').content
var countPerPage = document.getElementById('book-count=per-page')
var logoutBtn = document.querySelector('.logoutBtn')
var pagTemp = document.querySelector('.pagTemp').content
var searchForm = document.querySelector('.searchForm')
var searchInput = document.querySelector('.searchingInput')
var modalTemp = document.querySelector('.modalTemp').content
var bookMArkList = document.querySelector('.markbook-list')
const API = 'https://www.googleapis.com/books/v1/volumes?q=search+'
const APIvalue = 'terms'

async function getBooks(APIvalue = 'terms', currentPage = 1){
    const resProm = await fetch(`${API}+${APIvalue}=page=${currentPage}`).then(res => res.json())

    const another = resProm

    renderBooks(another, bookList)

    console.log(another)    

}

logoutBtn.addEventListener('click', () => {
    localStorage.setItem('token', 'undefined')
    window.location.replace('loginPage.html')
})


searchInput.addEventListener('change', (event) => {
    event.preventDefault()
    let myAPIvalue = searchInput.value

    if(myAPIvalue = ''){
        bookList.innerHTML = ''
        bookList.textContent = 'No result found'
    }
    else{
        getBooks(myAPIvalue, 1)
    }

})


// function searchBook(){

// }


// var modalBtn = document.querySelectorAll('[data-toggle=modal]')

// modalBtn.forEach((button) => {
//     button.addEventListener('click', event => {
//         let targetId = event.target.dataset.target
//         let targetEl = document.querySelector(targetId)
//         console.log(targetEl)
//         console.log(targetId)
//         targetEl.classList.toggle('myModal--open')
//     })
// })


function renderBooks(data, node){
    node.innerHTML = ''
    let frag = document.createDocumentFragment()

    countPerPage.textContent = data.items.length
    

    for(let i = 0; i < 10; i++){
        let temp = data.items[i].volumeInfo
        let tempItem = document.importNode(bookTemplate, true)
        tempItem.querySelector('.book-title').textContent = temp.title 
        tempItem.querySelector('.book-author').textContent = temp.publisher 
        let yearItem = new Date(temp.publishedDate)
        tempItem.querySelector('.book-year').textContent = yearItem.getFullYear()
        
        tempItem.querySelector('.book-img').setAttribute('src', temp.imageLinks.thumbnail) 

        let bookId = data.items[i].id

        let moreBtn = tempItem.querySelector('.more-btn')
        moreBtn.dataset.bookId = bookId

        moreBtn.addEventListener('click', () => {
            console.log('moreBtn clicced')
            window.localStorage.setItem('modalId', bookId)

            let myModal = document.createElement('div')
            myModal.setAttribute('class', 'myModal overlay modal--open')

            document.body.appendChild(myModal)


            let modalIn = document.createElement('div')
            modalIn.setAttribute('class', 'myModal__content')
            myModal.appendChild(modalIn)

            let bookTitle = document.createElement('div')
            bookTitle.setAttribute('class', 'bookTitle')
            modalIn.appendChild(bookTitle)

            let bookTitleName = document.createElement('h3')
            bookTitleName.setAttribute('class', 'bookTitleName')
            bookTitleName.textContent = temp.title
            bookTitle.appendChild(bookTitleName)

            let closeModal = document.createElement('a')
            bookTitle.appendChild(closeModal)

            let closeModImg = document.createElement('img')
            closeModImg.setAttribute('src', './img/cencel modal.png')
            closeModal.appendChild(closeModImg)

            let bookImg = document.createElement('div')
            bookImg.setAttribute('class', 'bookImg')
            modalIn.appendChild(bookImg)

            let bookImgUrl = document.createElement('img')
            bookImgUrl.setAttribute('src', temp.imageLinks.thumbnail)
            bookImg.appendChild(bookImgUrl)

            let bookText = document.createElement('div')
            bookText.setAttribute('class', 'bookText')
            modalIn.appendChild(bookText)

            let bookTextT = document.createElement('p')
            bookTextT.textContent = temp.description
            bookText.appendChild(bookTextT)

            let bookData = document.createElement('div')
            bookData.setAttribute('class', 'bookData')
            modalIn.appendChild(bookData)

            let bookDataItem = document.createElement('div')
            bookDataItem.setAttribute('class', 'bookDataItem')
            bookDataItem.textContent = "Publisher"
            bookData.appendChild(bookDataItem)

            let bookDataItemPublisher = document.createElement('span')
            bookDataItemPublisher.setAttribute('class', 'bookDataItemPublisher')
            bookDataItemPublisher.textContent = temp.publisher
            bookData.appendChild(bookDataItemPublisher)


            closeModImg.addEventListener('click', () => {
                myModal.style.opacity = '0'
                myModal.style.visibility = 'hidden'
            })








            // let modalTempItem = document.importNode(modalTemp, true)

            // modalTempItem.querySelector('.bookTitleName').textContent = temp.title
            // modalTempItem.querySelector('.bookImgUrl').setAttribute('src', temp.imageLinks.thumbnail)



        })

        let bookMarkBtn = tempItem.querySelector('.bookmark-btn')
        bookMarkBtn.dataset.bookId = data.items[i].id

        bookMarkBtn.addEventListener('click', () => {
            console.log('clicced markbook id : '+bookId)
            let bookmarkItem = document.importNode(bookmarkTemplate,true)
            let cont = bookmarkItem.querySelector('.markbook-item')
            bookmarkItem.querySelector('.bookmark-name').textContent = temp.title
            bookmarkItem.querySelector('.bookmark-publisher').textContent = temp.publisher
            bookMArkList.appendChild(bookmarkItem)

            let deleteBookMark = bookmarkItem.querySelector('.deleteBtn')

            deleteBookMark.addEventListener('click', () => {
                cont.style.opacity ='0'
                cont.style.visibility ='hidden'
            })

        })



        // moreBtn.addEventListener('click', () => {
        //     moreBtn.dataSet = data.items[i].id
        //     console.log('Clicced more btn :')
        //     console.log(data.items[i].id)

        //     // console.log(moreBtn.dataSet.id)
        // })

        // bookMarkBtn.addEventListener('click', () => {
        //     bookMarkBtn.dataSet = data.items[i].id
        //     console.log('Clicced bookMark btn :')
        //     console.log(data.items[i].id)

        //     if(!localStorage.getItem('bookmark')){
                
        //         localStorage.setItem('bookmark', data.items[i].id)
        //     }
        //     else{
        //         let marr = localStorage.getItem('bookmark')
        //         marr = marr.concat(data.items[i].id)
        //     }
        //     console.log('changed')

        //     // console.log(moreBtn.dataSet.id)
        // })

        frag.appendChild(tempItem)
        
    }
    // const pag = renderPag(currentPage)
    frag.appendChild(renderPag())
    node.appendChild(frag)

}
let currentPage = 1

function renderPag(){
    
    let pagTEmpItem = document.importNode(pagTemp, true)

    let prevBtn = pagTEmpItem.querySelector('.prevBtn') 
    let currentBtn = pagTEmpItem.querySelector('.currentBtn') 
    let nextBtn = pagTEmpItem.querySelector('.nextBtn') 

    currentBtn.textContent = currentPage

    prevBtn.addEventListener('click', event => {
        if(currentPage != 1){
            // event.classList.remove("disabled")
            currentPage=currentPage-1
            currentBtn.textContent = currentPage
            try {
            getBooks(currentPage, APIvalue)
                
            } catch (error) {
                console.log(error)
            }
            // console.log('page : '+currentPage)
        }else{
            // event.classList.add("disabled")
        }
    })
    nextBtn.addEventListener('click', () => {
        if(currentPage != 10){
            currentPage=currentPage+1
            currentBtn.textContent = currentPage
            try {
                getBooks(currentPage, APIvalue)
                    
                } catch (error) {
                    console.log(error)
                }
            console.log('page : '+currentPage)

        }
    })

    return pagTEmpItem

}


// function renderBookMark(node, name, publisher){
//     let markItem = document.importNode(bookmarkTemplate, true)

//     let bookmarksArr = localStorage.getItem('bookmark')
    

//     markItem.querySelector('.bookmark-name').textContent = name
//     markItem.querySelector('.bookmark-publisher').textContent = publisher

    
// }



try {
    getBooks(currentPage)
        
    } catch (error) {
        console.log(error)
    }









// var modalBtn = document.querySelectorAll('[data-toggle=modal]')

// modalBtn.forEach((button) => { 
//     button.addEventListener('click', openModal)
// })

// function openModal(el){
//     let targetId = el.dataset.target
//     let targetEl = document.querySelector(targetId)
//     console.log('targetEl.classList'+ targetEl.classList)
//     targetEl.classList.add('modal--open')
//     targetEl.addEventListener('click', event => {
//         if(event.target.matches(targetId)){
//             console.log(event.target.classList)
//             event.target.classList.remove('modal--open')
//         }
//     })
// }

// bookList.addEventListener('click', event => {
//     let targetEl = event.target
//     if(targetEl.dataset.task === 'more-task'){
//         // console.log('hello everybody')
//         openModal(event.target)
//     }
// })


// window.localStorage.removeItem('modalId')