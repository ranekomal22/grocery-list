// Data for stores and lists
const stores = [
    {
      name: "Costco",
      lists: [
        {
          name: "General",
          items: ["Egg", "Milk", "Ginger","Garlic","Rice","Oats"]
        },
        {
            name: "Salad",
            items: ["celary", "Carot", "Ginger","Garlic","Rice","Oats"]
          },
        {
          name: "Fruits",
          items: ["Apple", "Grape", "Blueberry", "Strawberry", "Pear", "Orange", "Cutie", "Watermelon","Banana","Cherry","Pineapple","Cantaloupe"]
        }
      ]
    },
    {
      name: "Miramar",
      lists: [
        {
          name: "General",
          items: ["Onion", "Tomato","Chilli","Coconut","Paneer"]
        },
        {
            name: "General2",
            items: ["Peanut", "Poha","Suji","Tup"]
          },
          {
            name: "Masale",
            items: ["Kitchen King", "Sambar","Pav Bhaji","Jaljira"]
          },
        {
            name: "Bhaji",
            items: ["Palak", "Methi","Bhendi","Bharit Vange","Vange","Tinde"]
          },
        {
          name: "Flour",
          items: ["Jawari", "Bajari","Chapati","Nachani","Besan","Rice Flour"]
        }
      ]
    }
  ];
  
  let selectedItems = {};
  
  // Function to create and display stores and lists
  function displayStores() {
    const storesContainer = document.getElementById('stores-container');
  
    stores.forEach(store => {
      const storeDiv = document.createElement('div');
      storeDiv.className = 'store';
  
      const storeName = document.createElement('h2');
      storeName.textContent = store.name;
      storeDiv.appendChild(storeName);
  
      const listsContainer = document.createElement('div');
      listsContainer.className = 'lists-container';
  
      store.lists.forEach(list => {
        const listDiv = document.createElement('div');
        listDiv.className = 'list';
  
        const listName = document.createElement('h3');
        listName.textContent = list.name;
        listDiv.appendChild(listName);
  
        const itemList = document.createElement('ul');
        list.items.forEach(item => {
          const listItem = document.createElement('li');
          const checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.id = `${store.name}-${list.name}-${item}`;
          checkbox.addEventListener('change', () => toggleItemSelection(store.name, list.name, item, checkbox.checked));
          listItem.appendChild(checkbox);
  
          const label = document.createElement('label');
          label.htmlFor = checkbox.id;
          label.textContent = item;
          listItem.appendChild(label);
  
          itemList.appendChild(listItem);
        });
  
        listDiv.appendChild(itemList);
        listsContainer.appendChild(listDiv);
      });
  
      storeDiv.appendChild(listsContainer);
      storesContainer.appendChild(storeDiv);
    });
  }
  
  // Function to handle item selection
  function toggleItemSelection(storeName, listName, itemName, isSelected) {
    if (!selectedItems[storeName]) {
      selectedItems[storeName] = {};
    }
    if (!selectedItems[storeName][listName]) {
      selectedItems[storeName][listName] = new Set();
    }
  
    if (isSelected) {
      selectedItems[storeName][listName].add(itemName);
    } else {
      selectedItems[storeName][listName].delete(itemName);
      if (selectedItems[storeName][listName].size === 0) {
        delete selectedItems[storeName][listName];
      }
    }
  
    if (Object.keys(selectedItems[storeName]).length === 0) {
      delete selectedItems[storeName];
    }
  
    displaySelectedItems();
  }
  
  // Function to display selected items
  function displaySelectedItems() {
    const selectedItemsContainer = document.getElementById('selected-items-container');
    selectedItemsContainer.innerHTML = '';
  
    for (const storeName in selectedItems) {
      const storeDiv = document.createElement('div');
      storeDiv.className = 'selected-store';
  
      const storeTitle = document.createElement('h3');
      storeTitle.textContent = storeName;
      storeDiv.appendChild(storeTitle);
  
      for (const listName in selectedItems[storeName]) {
        const listDiv = document.createElement('div');
        listDiv.className = 'selected-list';
  
        const listTitle = document.createElement('h4');
        listTitle.textContent = listName;
        listDiv.appendChild(listTitle);
  
        const itemList = document.createElement('ul');
        selectedItems[storeName][listName].forEach(item => {
          const listItem = document.createElement('li');
          listItem.textContent = item;
          itemList.appendChild(listItem);
        });
  
        listDiv.appendChild(itemList);
        storeDiv.appendChild(listDiv);
      }
  
      selectedItemsContainer.appendChild(storeDiv);
    }
  }
  
  // Call the function to display stores
  displayStores();
  