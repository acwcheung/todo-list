//place to store the list items
//each items include text and completed boolean
//add items
//populateList
//local storage
//check items and strikethrough
//change items
//delete items

const items = [];
let li = [];
const ul = document.querySelector('ul');
const addItems = document.querySelector('.add-items');
const input = document.querySelector('[name=item]');

function addItem(e) {
	//form tag will auto-refresh the page
	e.preventDefault();
	text = input.value;
	const item = {
		text: text,
		completed: false
	}
	items.push(item);
	populateList(items);
	input.value = "";
}

function populateList(itemList) {
	const html = items.map((item, i)=> {
		return `
			<li><input type='checkbox' index=${i} />${item.text}</li>
		`
	}).join('');
	ul.innerHTML = html;
	li = Array.from(document.querySelectorAll('li'));
	li.forEach(li => li.addEventListener('click', changeItem, true));
}

function changeItem(e) {
	this.removeEventListener('click', changeItem, true);
	const inputIndex = this.querySelector('input')
	const index = inputIndex.getAttribute('index');

	text = this.innerText;
	const input = document.createElement('input');
	input.setAttribute('type', 'text');
	this.appendChild(input);
	
	window.addEventListener('keydown', function(e) {
		if(e.keyCode === 13) {
			items[index].text = input.value;
			populateList(items);			
		}
	})
}

addItems.addEventListener('click', addItem);


