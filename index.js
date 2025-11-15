import menuArray from "./data.js"

const orderItemsSection = document.getElementById('order-items-section')
let orderedItemsArr = []

// clickfinder
document.addEventListener('click',(e)=>{
    if(e.target.dataset.addItem){
        storeAddItemInArr(Number(e.target.dataset.addItem))
    }

    if(e.target.dataset.removeItem){
        removeItemFromArr(Number(e.target.dataset.removeItem))
    }

    if(e.target.id === 'complete-order'){
        renderPaymentModal()
    }
    
    if(e.target.id==='pay-btn'){
        e.preventDefault()
        renderSuccessMessage()
    }
})

// add item in array
function storeAddItemInArr(itemId){
    orderItemsSection.classList.remove('hidden')
    menuArray.forEach(item=>{
        if(item.id===itemId){
            orderedItemsArr.push(item)
        }
    })
    updateOrederSection()
}

//remove item from array
function removeItemFromArr(itemId){
    orderedItemsArr.splice(itemId,1)
    updateOrederSection()
}

//update-totalprice-and-ordersection
function updateOrederSection(){
    renderOrderSection()
    totalPriceItems()
}

//render-success-message
function renderSuccessMessage(){
    document.getElementById('payment-section').classList.add('hidden')
    orderItemsSection.classList.add('hidden')
    const customerName=document.getElementById('name').value
    document.getElementById('success-message').innerHTML=`
    <p>Thanks, ${customerName}! Your order is on its way!</p>
    `
    document.getElementById('payment-form').reset()
    orderedItemsArr.length = 0
}

//render-payment-section
function renderPaymentModal(){
    document.getElementById('payment-section').classList.remove('hidden')
}

// renderOrderSection
function renderOrderSection(){
    document.getElementById('success-message').innerHTML=''
    const orderedItems = document.getElementById('ordered-items')
    let htmlStr = ''
    orderedItemsArr.forEach((item,index)=>{
            htmlStr += `
            <div class="ordered-item" id="${item.id}">
                <div class="flex-name-btn">
                    <h2>${item.name}</h2>
                    <button class="remove-btn" data-remove-item="${index}">remove</button>
                </div>
                <p id="ordered-item-price">$${item.price}</p>
            </div> 
            `
        })
    return orderedItems.innerHTML = htmlStr
}

// rendertotalprice
function totalPriceItems(){
    const prices = orderedItemsArr.map(item=>{
        return item.price
    })
   let totalPrice = prices.reduce((total,current)=>total+current,0)
   if(totalPrice===0){
    orderItemsSection.classList.add('hidden')
   }
   return document.getElementById('total-items-price').textContent = `$${totalPrice}`
}

// renderMenuList
function renderMenuList(){
    const listMenu = document.getElementById('list-menu')
    let htmlStr = ''
    menuArray.forEach(item=>{
     htmlStr +=`
        <div class="each-items">
            <div class="data-style">
                <p class="item-img">${item.emoji}</p>
                <div class="item-properties">
                    <h2 class="item-name">${item.name}</h2>
                    <p class="item-ingredients">${item.ingredients}</p>
                    <p class="item-price">$${item.price}</p>
                </div>
            </div>
            <button class="add-item-btn" data-add-item="${item.id}">+</button>
        </div>
    `
    })
    return listMenu.innerHTML = htmlStr
}

renderMenuList()

