const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.words');
const randButton = document.querySelector('#randomWord');
const activeWord = document.querySelector('#activeWord');
const activeWordDiv = document.querySelector('.wrap2');
const teamRedresults = document.querySelector('#red-res')
const teamBlueresults = document.querySelector('#blue-res')
const activeWordContainer = document.querySelector('#active-word-container')
let items = JSON.parse(localStorage.getItem('items')) || [];  

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}

function addItem(e) {
    e.preventDefault();
    const item = (this.querySelector('[name=item]')).value;
    items.push(item);
    populateList(items, itemsList);
    localStorage.setItem('items', JSON.stringify(items));
    this.reset();
}

function populateList(items, wordList) {
    wordList.innerHTML = items.map((item, i) => {
        return `
        <li>
            <p data-index=${i} id="item${i}">${item}</p>
        </li>
        `;
    }).join('');
}

function resetWords(){
    try{teamRedresults.innerHTML = '';}catch{}
    try{teamBlueresults.innerHTML = '';}catch{}
    try{activeWordContainer.innerHTML = ''}catch{}
    items = JSON.parse(localStorage.getItem('items')) || [];
    populateList(items, itemsList);
}

function clearWords(){
    try{teamRedresults.innerHTML = '';}catch{}
    try{teamBlueresults.innerHTML = '';}catch{}
    try{activeWordContainer.innerHTML = ''}catch{}
    localStorage.clear();
    items = [];
    populateList(items, itemsList);
}

function getRandWord(){
    var item = items[Math.floor(Math.random() * items.length)];
    var index = items.indexOf(item);
        if (index !== -1) {
            items.splice(index, 1);
        }
    activeWordContainer.innerHTML += `<p id="activeWord-${item}" class="active-word-container" draggable="true" ondragstart="drag(event)" >${item}</p>`
    populateList(items, itemsList);
}

addItems.addEventListener('submit', addItem);

populateList(items, itemsList);