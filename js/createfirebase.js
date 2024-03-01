const user = JSON.parse(localStorage.getItem('user'));
async function addToFirestore(task, collectionName, listContainer) {
    try {
        const Email = user.email;

        const snapshot = await db.collection("Task").doc(Email).collection(`listContainer${collectionName}`).get();
        const numberOfCollection = snapshot.size + 1;

        await db.collection("Task").doc(`${Email}/listContainer${collectionName}/${numberOfCollection}`).set({
            plan: task
        });
        console.log("Task added successfully!");
    } catch (error) {
        console.error("Error adding task: ", error);
    }
}


function addTask(inputBox, collectionName) {
    const task = inputBox.value.trim();
    const listContainer = document.getElementById(`listContainer${collectionName}`);
    if (inputBox.value === "") {
        alert("You must write something")
    } else {
        let li = document.createElement("li");
        li.innerHTML = task;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        addToFirestore(task, collectionName, listContainer); 
        showTaskFromFirestore(collectionName, listContainer); 
    }
    inputBox.value = "";
    saveData(listContainer);
}

listContainer1.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData(listContainer1);
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData(listContainer1);
    }
})
listContainer2.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData(listContainer2);
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData(listContainer2);
    }
})
listContainer3.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData(listContainer3);
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData(listContainer3);
    }
})
listContainer4.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData(listContainer4);
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData(listContainer4);
    }
})

function saveData(listContainer) {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask(collectionName, listContainer) {
    listContainer.innerHTML = localStorage.getItem("data");
    console.log(listContainer)
}

// showTask("1", listContainer1);
// showTask("2", listContainer2);
// showTask("3", listContainer3);
// showTask("4", listContainer4);
// showTask("5", listContainer5);
// showTask("6", listContainer6);


async function showTaskFromFirestore(collectionName, listContainer) {
    try {
        const Email = user.email;

        const snapshot = await db.collection("Task").doc(Email).collection(`listContainer${collectionName}`).get();
        snapshot.forEach(doc => {
            const task = doc.data().plan;
            let li = document.createElement("li");
            li.innerHTML = task;
            listContainer.appendChild(li);
            let span = document.createElement("span");
            span.innerHTML = "\u00d7";
            li.appendChild(span);
        });
    } catch (error) {
        console.error("Error fetching task: ", error);
    }
}

showTaskFromFirestore("1", listContainer1);
showTaskFromFirestore("2", listContainer2);
showTaskFromFirestore("3", listContainer3);
showTaskFromFirestore("4", listContainer4);
showTaskFromFirestore("5", listContainer5);
showTaskFromFirestore("6", listContainer6);
