let listOfNames = []; 
//listOfNames = localStorage.getItem("names").split(",")
//console.log(listOfNames)
//let listOfNames = [
//   'jordan', 'max', 'maria', 'farouk', 'lola', 'gilles'
// ]



/*
Create list
*/
function addNameToList() {
    const input = document.querySelector("#name");
    const name = input.value;

    if (name === "") {
        alert("No empty name");
        return;
    }
    listOfNames.push(name)
    input.value = "";
    addNameDiv(name)

    localStorage.setItem("names", listOfNames.join(","))
    console.log(listOfNames);
}
document.querySelector("#addNameToList").addEventListener("click", addNameToList);
document.querySelector("#name").addEventListener("keypress", (e) => {
    if (e.keyCode === 13) {
        addNameToList()
    }
});


function addNameDiv(nameElement) {
    const listNameDiv = document.getElementById('list_names');
    let newItem = document.createElement('li');
    let newContent = document.createTextNode(nameElement);
    newItem.appendChild(newContent);
    listNameDiv.insertBefore(newItem, listNameDiv.childNodes[0]);
}

/*
Create Groups
*/
document.querySelector("#createGroups").addEventListener("click", () => {
    const nbOfGroups = document.querySelector("input[type=number]").value;
    const divGroups = document.querySelector("#groups");
    const groups = createNGroups(listOfNames, nbOfGroups);

    if (nbOfGroups > listOfNames.length) {
        alert("Wrong number of groups");
        return;
    }

    divGroups.innerHTML = "";
    for (let i = 0; i < groups.length; i++) {
        divGroups.appendChild(createGroupDiv(groups[i], i + 1))
    }
});

function createGroupDiv(group, i) {
    let div = document.createElement("div");
    div.classList.add("groupDiv");

    let titleDiv = document.createElement("div");
    titleDiv.classList.add("titleDiv");
    titleDiv.innerText = `Groupe ${i}`

    let namesDiv = document.createElement("div");
    namesDiv.classList.add("namesDiv");
    group.forEach(name => {
        let nameDiv = document.createElement("div");
        nameDiv.addEventListener("click", (e) => {
            // console.log(this);
            // dans une fonction normale this === e.target
            e.target.parentNode.removeChild(e.target);
            const value = e.target.innerText;
            listOfNames = listOfNames.filter(element => element !== value)
        });
        nameDiv.innerText = name;
        namesDiv.appendChild(nameDiv)
    })

    div.appendChild(titleDiv)
    div.appendChild(namesDiv)
    return div;
}

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

function createNGroups(arr, n) {
    const names = shuffle(arr);
    const personPerGroup = Math.floor(names.length / n);
    let rest = names.length % n;

    let groups = [];

    console.log(personPerGroup)

    while (n > 0) {
        let personsToAddToGroup = personPerGroup;
        if (rest > 0) {
            personsToAddToGroup++;
            rest--;
        }
        groups.push(names.splice(0, personsToAddToGroup))
        n--;
    }
    return groups;
}