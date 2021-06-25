import axios from 'axios'
import Noty from 'noty'

let addToCart = document.querySelectorAll('.add-to-cart')
let cartCounter = document.querySelector('#cartCounter')

function updateCart(item){
    // also we can use fetch api 
    // for ajax call by taking the data element from the client side we are sending it to the server
    // by using famous library axios
    axios.post('/update-cart',item).then(function (res){
        console.log(res)
        console.log(res.data.totalQty)
        cartCounter.innerText = res.data.totalQty
        new Noty({
            type: 'success',
            timeout: 1000,
            text: 'Item added to cart',
            progressBar: false,
        }).show();
    }).catch(err => {
        new Noty({
            type: 'error',
            timeout: 1000,
            text: 'Something went wrong',
            progressBar: false,
        }).show();
    })
}
addToCart.forEach((btn)=>{
    btn.addEventListener('click',(e)=>{
        console.log(e);
        let item = JSON.parse(btn.dataset.item)
        console.log(item)

        updateCart(item)
    })
})

// Remove alert message after X seconds
const alertMsg = document.querySelector('#success-alert')
if(alertMsg) {
    setTimeout(() => {
        alertMsg.remove()
    }, 2000)
}
