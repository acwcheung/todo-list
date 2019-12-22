//local storage
//check items and strikethrough
//change items
//delete items

const items = [];
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
	input.value = "";
}

function populateList(itemList) {
	const html = itemList.map((item, i)=> {
		return `
			<li>
				<input type='checkbox' index=${i} />
				${item.text}
			</li>
		`
	}).join('');
	ul.innerHTML = html;
	//add event listener to the updated list of items
	const li = document.querySelectorAll('li');
	li.forEach(li => li.addEventListener('click', changeItem, true));
}

function changeItem(e) {
	//li contains input tag with checkbox, need to exclude the checkbox being clicked
	if(e.target.tagName.toLowerCase() !== 'li') { return };
	//avoid the li being clicked to call the changeItem 
	this.removeEventListener('click', changeItem, true);
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
			populateList(items);
		} else if(e.keyCode === 13) {
			items[index].text = inputText.value;
			populateList(items);
		} 
	})
}

addItems.addEventListener('click', addItem);


