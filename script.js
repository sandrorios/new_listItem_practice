let formItem = document.getElementById('form-item');
let listItem = document.getElementById('list-item');
let inputField = document.getElementById('input-field');
let clearBtn = document.getElementById('clear');
let filter = document.getElementById('filter');

function onAddItemSubmit(e){
    e.preventDefault();
    let newItem = inputField.value;
    if(newItem === ''){
        alert("Please add item");
        return;
    }

    addItemToDOM(newItem);
    addItemToStorage(newItem);

}

function addItemToDOM(item){
    let li = document.createElement('li');
    li.appendChild(document.createTextNode(item));
    listItem.appendChild(li);

    inputField.value = '';
    inputField.focus();
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



formItem.addEventListener('submit', onAddItemSubmit);