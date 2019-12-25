//get items from the local storage!
const items = JSON.parse(localStorage.getItem('items')) || [];
const ul = document.querySelector('ul');
const addItems = document.querySelector('.add-items');
const input = document.querySelector('[name=item]');

function addItem(e) {
	//form tag will auto-refresh the page
	e.preventDefault();
	if(input.value === '') { return };
	text = input.value;
	const item = {
		text: text,
		completed: false
	}
	items.push(item);
	populateList(items);
	//'items' is the field key, you can call it whatever you like
	localStorage.setItem('items', JSON.stringify(items));
	input.value = "";
}

function populateList(itemList) {
	const html = itemList.map((item, i)=> {
		return `
			<li style="${item.completed? 'text-decoration:line-through': 'text-decoration:none'}">
				<input type='checkbox' index=${i} ${item.completed? 'checked': ''}/>
				<label for='item${i}'>${item.text}</label>
			</li>
		`
	}).join('');
	ul.innerHTML = html;
	//add event listener to the updated list of items
	const li = document.querySelectorAll('li');
	li.forEach(li => li.addEventListener('click', changeItem, true));
	li.forEach(li => li.addEventListener('click', completeItem, true));
}

function changeItem(e) {
	//li contains input tag with checkbox, need to exclude the checkbox being clicked
	if(!e.target.matches('label')) { return };
	//avoid the li being clicked to call the changeItem 
	this.removeEventListener('click', changeItem, true);
	this.removeEventListener('click', completeItem, true);
	//get the index of the item
	const itemIndex = this.querySelector('input');
	const index = itemIndex.getAttribute('index');
	text = items[index].text;
	//remove text from the li but it remmovs everything!
	this.textContent = '';
	
	//rebuild the li, append to keep the inputText working
	const inputCheckbox = document.createElement('input');
	inputCheckbox.setAttribute('type', 'checkbox');
	const inputText = document.createElement('input');
	inputText.setAttribute('type', 'text');
	inputText.setAttribute('placeholder', text);
	this.appendChild(inputCheckbox);
	this.appendChild(inputText);

	this.addEventListener('keydown', function(e) {
		//the value is taken only if enter key is pressed
		if(e.keyCode === 13 && inputText.value === '') {
			items.splice(index, 1);
			localStorage.setItem('items', JSON.stringify(items));
			populateList(items);
		} else if(e.keyCode === 13) {
			items[index].text = inputText.value;
			localStorage.setItem('items', JSON.stringify(items));
			populateList(items);
		} 
	})
}

function completeItem(e) {
	if(!e.target.matches('input')) { return };
	const index = e.target.getAttribute('index');
	items[index].completed = !items[index].completed;
	items[index].completed? 
		this.style.setProperty('text-decoration', 'line-through'):
		this.style.setProperty('text-decoration', 'none');
	//need to store the items checked before re-list again	
	localStorage.setItem('items', JSON.stringify(items));
	populateList(items);	
}

function initial() {
	items.length === 0? 
		ul.innerHTML = `<li><input type="checkbox">Your list is currently empty!</li>`:
		populateList(items);		
}

initial();
addItems.addEventListener('click', addItem);

 



