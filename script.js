let formItem = document.getElementById('form-item');
let listItem = document.getElementById('list-item');
let inputField = document.getElementById('input-field');
let clearBtn = document.getElementById('clear');
let filter = document.getElementById('filter');


function displayItem(){
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach(item => addItemToDOM(item));
}
function onAddItemSubmit(e){
    e.preventDefault();
    let newItem = inputField.value;
    if(newItem === ''){
        alert("Please add item");
        return;
    }

    addItemToDOM(newItem);
    addItemToStorage(newItem);

    checkUI();
}

function addItemToDOM(item){
    let li = document.createElement('li');
    li.appendChild(document.createTextNode(item));
    listItem.appendChild(li);
    let button = createButton('remove-item text-red');
    li.appendChild(button);
    inputField.value = '';
    inputField.focus();

    checkUI();
}

function filterItems(e){
    let items = listItem.querySelectorAll('li');
    let text = e.target.value.toLowerCase();
    items.forEach((items) =>{
        let itemName = items.firstChild.textContent.toLowerCase();
        if(itemName.indexOf(text)!= -1){
            items.style.display = 'flex';
        }else{
            items.style.display = 'none';
        }
    })
    checkUI();
}

function createButton(classes){
    let button = document.createElement('button');
    button.className = classes;
    let icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon)
    return button;
}

function createIcon(classes){
    let icon = document.createElement('i');
    icon.className = classes;
    return icon;
}

function removeItem(item) {
    item.remove();
    removeItemFromStorage(item.textContent);
    // if(e.target.parentElement.classList.contains('remove-item')){
    //     e.target.parentElement.parentElement.remove();
    // }
    checkUI();
}

function clearItems(){
    while(listItem.firstChild){
        listItem.firstChild.remove(listItem.firstChild);
    }
    localStorage.removeItem('items');
    checkUI();
}

function addItemToStorage(item){
    const itemsFromStorage = getItemsFromStorage()
    itemsFromStorage.push(item);
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage() {
    let itemsFromStorage;
    if(localStorage.getItem('items') === null){
        itemsFromStorage = [];
    }else{
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }
        return itemsFromStorage;
}

function removeItemFromStorage(item){
    let itemsFromStorage = getItemsFromStorage();
    itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function onClickItem(e) {
    if(e.target.parentElement.classList.contains('remove-item')){
        removeItem(e.target.parentElement.parentElement);
    }
    checkUI();
}

function checkUI(){
    let items = listItem.querySelectorAll('li');
    if(items.length === 0){
        clearBtn.style.display = 'none';
        filter.style.display = 'none';
    }else{
        clearBtn.style.display = 'block';
        filter.style.display = 'block';
    }
}


formItem.addEventListener('submit', onAddItemSubmit);
listItem.addEventListener('click', onClickItem);
clearBtn.addEventListener('click', clearItems);
filter.addEventListener('input', filterItems);
document.addEventListener('DOMContentLoaded', displayItem);

checkUI();