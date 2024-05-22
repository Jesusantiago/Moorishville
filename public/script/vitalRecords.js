import showModal from "./modalForm.js";
import { displayResultsReal } from "./table.js";

console.log("vital records")

document.getElementById("searchButton").addEventListener("click" , (e) => {
    e.preventDefault()


    const name = document.getElementById("name-vital").value.toLowerCase();
    const date = document.getElementById("date-vital").value;
    const type = document.getElementById("type-vital").value;
    console.log(name)
    console.log(date)
    console.log(type)

    const namePattern = /^[A-Za-z]+( [A-Za-z]+)?$/;
    if(!namePattern.test(name)){
        alert("Name input formt is incorrect.")
        return;
    }

    if(!name || !date || !type) {
        showModal("incompleteFormModal");
        return
    }

    fetch("../Backout/vitalRecords.json")
    .then(response => {
        if(!response.ok){
            throw new Error("Network response was not ok " + response.statusText)
        }

        return response.json()
    })
    .then(jsonData => {

        let search = { name, date, type }

        console.log(search.date)

        const results = jsonData.filter(item => {
            console.log(item.date)
            const nameMatch = !search.name || item.name.toLowerCase().includes(search.name)
            const dateMatch = !search.date || new Date(item.date).toISOString().split('T')[0] === new Date(search.date).toISOString().split('T')[0];
            const typeMatch = !search.type || item.type.includes(search.type)

            return nameMatch && dateMatch && typeMatch
        })

        console.log(results)

        if(results.length === 0){
            showModal("noResultsModal")
        } else {
            displayResultsReal(results)
            document.getElementById("discreimer").style.display = "none"
        }
    })
    .catch(err => console.log("Error fetching JSON: " + err))
})