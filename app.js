// Data for stores and lists
const stores = [
    {
      name: "Costco",
      lists: [
        {
          name: "General",
          items: ["Ginger","Garlic","Rice","Oats"]
        },
        {
            name: "Dairy",
            items: ["Egg", "Milk"]
          },
        {
            name: "Salad",
            items: ["Celary", "Carot","Salad"],
          },
        {
          name: "Fruits",
          items: ["Apple", "Avocado","Grape", "Blueberry", "Strawberry", "Pear", "Orange", "Cutie", "Watermelon","Banana","Cherry","Pineapple","Cantaloupe"]
        }
      ]
    },
    {
      name: "Miramar",
      lists: [
        {
          name: "General",
          items: ["Onion","Ginger", "Tomato","Chilli","Coconut","Paneer"]
        },
        {
            name: "General2",
            items: ["Peanut", "Poha","Suji","Tup","Pani Puri"]
          },
          {
            name: "Masale",
            items: ["Kitchen King", "Sambar","Pav Bhaji","Jaljira","Cumin Powder","Coriander Powder"]
          },
        {
            name: "Bhaji",
            items: ["Palak", "Methi","Bhendi","Kairi","Paan","Coriander","Red Radish","Spring Onion","Bharit Vange","Vange","Tinde","Capsicum",]
          },
        {
          name: "Flour",
          items: ["Jwari", "Bajari","Chapati","Nachani","Besan","Rice Flour"]
        },
        {
            name: "Chutney",
            items: ["Soy Sauce", "Pickle","Green Chutney","Imly Chutney","Sounf","DhanaDal"]
          }
      ]
    }
  ];

  
  let selectedItems = {};
  let itemMap = {};
  
  // Function to create and display stores and lists
  function displayStores() {
    const storesContainer = document.getElementById('stores-container');
    let itemId = 0;
  
    stores.forEach((store, storeIndex) => {
      const storeDiv = document.createElement('div');
      storeDiv.className = 'store';
  
      const storeName = document.createElement('h2');
      storeName.textContent = store.name;
      storeDiv.appendChild(storeName);
  
      const listsContainer = document.createElement('div');
      listsContainer.className = 'lists-container';
  
      store.lists.forEach((list, listIndex) => {
        const listDiv = document.createElement('div');
        listDiv.className = 'list';
  
        const listName = document.createElement('h3');
        listName.textContent = list.name;
        listDiv.appendChild(listName);
  
        const itemList = document.createElement('ul');
        list.items.forEach((item, itemIndex) => {
          const listItem = document.createElement('li');
          const checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.id = `checkbox-${storeIndex}-${listIndex}-${itemIndex}`;
          checkbox.addEventListener('change', () => toggleItemSelection(storeIndex, listIndex, itemIndex, checkbox.checked));
          listItem.appendChild(checkbox);
  
          const label = document.createElement('label');
          label.htmlFor = checkbox.id;
          label.textContent = item;
          listItem.appendChild(label);
  
          itemList.appendChild(listItem);
  
          itemMap[itemId] = { storeIndex, listIndex, itemIndex };
          itemId++;
        });
  
        listDiv.appendChild(itemList);
        listsContainer.appendChild(listDiv);
      });
  
      storeDiv.appendChild(listsContainer);
      storesContainer.appendChild(storeDiv);
    });
  }
  
  // Function to handle item selection
  function toggleItemSelection(storeIndex, listIndex, itemIndex, isSelected) {
    if (!selectedItems[storeIndex]) {
      selectedItems[storeIndex] = {};
    }
    if (!selectedItems[storeIndex][listIndex]) {
      selectedItems[storeIndex][listIndex] = new Set();
    }
  
    if (isSelected) {
      selectedItems[storeIndex][listIndex].add(itemIndex);
    } else {
      selectedItems[storeIndex][listIndex].delete(itemIndex);
      if (selectedItems[storeIndex][listIndex].size === 0) {
        delete selectedItems[storeIndex][listIndex];
      }
    }
  
    if (Object.keys(selectedItems[storeIndex]).length === 0) {
      delete selectedItems[storeIndex];
    }
  
    updateURL();
    displaySelectedItems();
  }
  
  // Function to display selected items
  function displaySelectedItems() {
    const selectedItemsContainer = document.getElementById('selected-items-container');
    selectedItemsContainer.innerHTML = '';
  
    for (const storeIndex in selectedItems) {
      const storeDiv = document.createElement('div');
      storeDiv.className = 'selected-store';
  
      const storeTitle = document.createElement('h3');
      storeTitle.textContent = stores[storeIndex].name;
      storeDiv.appendChild(storeTitle);
  
      for (const listIndex in selectedItems[storeIndex]) {
        const listDiv = document.createElement('div');
        listDiv.className = 'selected-list';
  
        const listTitle = document.createElement('h4');
        listTitle.textContent = stores[storeIndex].lists[listIndex].name;
        listDiv.appendChild(listTitle);
  
        const itemList = document.createElement('ul');
        selectedItems[storeIndex][listIndex].forEach(itemIndex => {
          const listItem = document.createElement('li');
          listItem.textContent = stores[storeIndex].lists[listIndex].items[itemIndex];
          itemList.appendChild(listItem);
        });
  
        listDiv.appendChild(itemList);
        storeDiv.appendChild(listDiv);
      }
  
      selectedItemsContainer.appendChild(storeDiv);
    }
  }
  
  // Function to get selected items as a query parameter string
  function getSelectedItemsQuery() {
    let query = 'selected=';
    for (const storeIndex in selectedItems) {
      for (const listIndex in selectedItems[storeIndex]) {
        selectedItems[storeIndex][listIndex].forEach(itemIndex => {
          query += `${storeIndex}:${listIndex}:${itemIndex},`;
        });
      }
    }
    return query.slice(0, -1); // Remove the trailing comma
  }
  
  // Function to update the URL with the selected items
  function updateURL() {
    const queryString = getSelectedItemsQuery();
    const newURL = `${window.location.origin}${window.location.pathname}?${queryString}`;
    window.history.replaceState(null, '', newURL);
  }
  
  // Function to parse selected items from query parameters
  function parseSelectedItemsFromQuery() {
    const urlParams = new URLSearchParams(window.location.search);
    const selectedParam = urlParams.get('selected');
    if (selectedParam) {
      selectedParam.split(',').forEach(selection => {
        const [storeIndex, listIndex, itemIndex] = selection.split(':').map(Number);
        if (!selectedItems[storeIndex]) selectedItems[storeIndex] = {};
        if (!selectedItems[storeIndex][listIndex]) selectedItems[storeIndex][listIndex] = new Set();
        selectedItems[storeIndex][listIndex].add(itemIndex);
        // Check the corresponding checkbox
        const checkbox = document.getElementById(`checkbox-${storeIndex}-${listIndex}-${itemIndex}`);
        if (checkbox) {
          checkbox.checked = true;
        }
      });
      displaySelectedItems();
    }
  }
  
  // Call this function on page load
  displayStores();
  parseSelectedItemsFromQuery();
  