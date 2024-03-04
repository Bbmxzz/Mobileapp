const url = new URLSearchParams(window.location.search);
const user = JSON.parse(url.get('user'));
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

async function addTask(inputBox, collectionName) {
    const task = inputBox.value.trim();
    const listContainer = document.getElementById(`listContainer${collectionName}`);
    if (inputBox.value === "") {
        alert("You must write something")
    } else {
        try {
            await addToFirestore(task, collectionName, listContainer); 
            await showTaskFromFirestore(collectionName, listContainer); 
            inputBox.value = "";
            saveData(listContainer);
        } catch (error) {
            console.error("Error adding task: ", error);
        }
    }
    inputBox.value = "";
    saveData(listContainer);
}

listContainer1.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData(listContainer1);

        const status = e.target.classList.contains("checked") ;
        const taskName = e.target.innerText.split("\u00d7")[0].trim();
        updateTaskStatus(taskName, "1", status);

    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData(listContainer1);

        const taskName = e.target.parentElement.innerText.split("\u00d7")[0].trim();
        deleteTask(taskName, "1");
    }
})

listContainer2.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData(listContainer2);

        const status = e.target.classList.contains("checked") ;
        const taskName = e.target.innerText.split("\u00d7")[0].trim();
        updateTaskStatus(taskName, "2", status);

    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData(listContainer2);

        const taskName = e.target.parentElement.innerText.split("\u00d7")[0].trim();
        deleteTask(taskName, "2");
    }
})
listContainer3.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData(listContainer3);

        const status = e.target.classList.contains("checked") ;
        const taskName = e.target.innerText.split("\u00d7")[0].trim();
        updateTaskStatus(taskName, "3", status);

    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData(listContainer3);

        const taskName = e.target.parentElement.innerText.split("\u00d7")[0].trim();
        deleteTask(taskName, "3");
    }
})
listContainer4.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData(listContainer4);

        const status = e.target.classList.contains("checked") ;
        const taskName = e.target.innerText.split("\u00d7")[0].trim();
        updateTaskStatus(taskName, "4", status);

    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData(listContainer4);

        const taskName = e.target.parentElement.innerText.split("\u00d7")[0].trim();
        deleteTask(taskName, "4");
    }
})
listContainer5.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData(listContainer5);

        const status = e.target.classList.contains("checked") ;
        const taskName = e.target.innerText.split("\u00d7")[0].trim();
        updateTaskStatus(taskName, "5", status);

    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData(listContainer5);

        const taskName = e.target.parentElement.innerText.split("\u00d7")[0].trim();
        deleteTask(taskName, "5");
    }
})
listContainer6.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData(listContainer6);

        const status = e.target.classList.contains("checked") ;
        const taskName = e.target.innerText.split("\u00d7")[0].trim();
        updateTaskStatus(taskName, "6", status);

    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData(listContainer6);

        const taskName = e.target.parentElement.innerText.split("\u00d7")[0].trim();
        deleteTask(taskName, "6");
    }
})

function saveData(listContainer) {
    localStorage.setItem("data", listContainer.innerHTML);
}

async function showTaskFromFirestore(collectionName, listContainer) {
    listContainer.innerHTML = '';
    try {
        const Email = user.email;
        const snapshot = await db.collection("Task").doc(Email).collection(`listContainer${collectionName}`).get();
        snapshot.forEach(doc => {
            const task = doc.data().plan;
            if(task == ""){
                
            }else{
                let li = document.createElement("li");
                li.innerHTML = task;
                listContainer.appendChild(li);
                let span = document.createElement("span");
                span.innerHTML = "\u00d7";
                li.appendChild(span);
                const status = doc.data().status;
                if(status == "checked"){
                    li.classList.toggle(status);
                }
            }
            
            
        });
    } catch (error) {
        console.error("Error fetching task: ", error);
    }
}

document.addEventListener('DOMContentLoaded', async function() {
    await showTaskFromFirestore("1", listContainer1);
    await showTaskFromFirestore("2", listContainer2);
    await showTaskFromFirestore("3", listContainer3);
    await showTaskFromFirestore("4", listContainer4);
    await showTaskFromFirestore("5", listContainer5);
    await showTaskFromFirestore("6", listContainer6);
});

async function updateTaskStatus(task, collectionName, status) {
    try {
        const Email = user.email;
        const querySnapshot = await db.collection("Task")
            .doc(Email)
            .collection(`listContainer${collectionName}`)
            .where("plan", "==", task)
            .get();

        if(status){
            querySnapshot.forEach(doc => {
                doc.ref.update({ status: "checked" }); 
            });
        }else{
            querySnapshot.forEach(doc => {
                doc.ref.update({ status: " " });
            });
        }

        console.log("Task status updated successfully!");
    } catch (error) {
        console.error("Error updating task status: ", error);
    }
}

async function deleteTask(task, collectionName) {
    try {
        const Email = user.email;
        const querySnapshot = await db.collection("Task")
            .doc(Email)
            .collection(`listContainer${collectionName}`)
            .where("plan", "==", task)
            .get();

        querySnapshot.forEach(doc => {
            doc.ref.update({ plan:"", status: "" }); 
        });

        console.log("Documents successfully deleted!");
    } catch (error) {
        console.error("Error deleting documents: ", error);
    }
}