# todo-list

I want to do a minimalist to-do list, i.e. everything there is msut-have, no more no less.

When **change or delete** the item, you just need to click the item itself. It will turn into an input box with placeholder being the existing item. If you want to **delete** it, just leave it and press enter; if you want to make a **change**, type whatever you like and then press enter. The list will be updated. 

The local storage also works fine. It can store the existing items whenever you add a new one, change or delete an old one. It also store the items **checked** when you do any other changes.

### The key challenges

1. `removeEventListener()` is used to overcome the multiple clicks on the item. First click to indicate you want to change or delete the item. Second is to go into the input box to do the change.

2. `index=${i}` is used to number the list of items such that the correct index of the array items can be identified.

3. `appendChild()` is used so that the input value is stored and pushed into the item array.
