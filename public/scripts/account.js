document.addEventListener('DOMContentLoaded', () => {
    const userDataElement = document.getElementById('user-data');
    const user = userDataElement.getAttribute('data-user');
    
    console.log(user);
    const questList = document.getElementById('questList');
    const inventoryList = document.getElementById('inventoryList');
    const progressionList = document.getElementById('progressionList');

    const newQuestInput = document.getElementById('newQuest');
    const newItemInput = document.getElementById('newItem');
    const newProgressInput = document.getElementById('newProgress');

    const addQuestButton = document.getElementById('addQuest');
    const addItemButton = document.getElementById('addItem');
    const addProgressButton = document.getElementById('addProgress');

    const userData = JSON.parse(localStorage.getItem(user)) || {
        quests: [],
        inventory: [],
        progression: []
    };

    userData.quests.forEach(quest => {
        const li = document.createElement('li');
        li.textContent = quest;
        questList.appendChild(li);
    });

    userData.inventory.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        inventoryList.appendChild(li);
    });

    userData.progression.forEach(prog => {
        const li = document.createElement('li');
        li.textContent = prog;
        progressionList.appendChild(li);
    });
    addQuestButton.addEventListener('click', () => {
        const quest = newQuestInput.value.trim();
        if (quest) {
            userData.quests.push(quest);
            localStorage.setItem(user, JSON.stringify(userData));

            const li = document.createElement('li');
            li.textContent = quest;
            questList.appendChild(li);
            newQuestInput.value = '';;
        }
    });

    addItemButton.addEventListener('click', () => {
        const item = newItemInput.value.trim();
        if (item) {
            userData.inventory.push(item);
            localStorage.setItem(user, JSON.stringify(userData));

            const li = document.createElement('li');
            li.textContent = item;
            inventoryList.appendChild(li);
            newItemInput.value = '';
        }
    });

    addProgressButton.addEventListener('click', () => {
        const progress = newProgressInput.value.trim();
        if (progress) {
            userData.progression.push(progress);
            localStorage.setItem(user, JSON.stringify(userData));

            const li = document.createElement('li');
            li.textContent = progress;
            progressionList.appendChild(li);
            newProgressInput.value = '';
        }
    });

});