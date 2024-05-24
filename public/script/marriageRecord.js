import showModal from "./modalForm.js"
import { displayResultsOldBooks } from "./table.js"

console.log("Marriage Records")

document.getElementById("searchButton").addEventListener("click", (e) => {
    e.preventDefault()
    
    const nameOne = document.getElementById("nameOne-marriage").value.toLowerCase();
    const nameTwo = document.getElementById("nameTwo-marriage").value.toLowerCase();
    const date = document.getElementById("date-marriage").value 


    const namePattern = /^[A-Za-z]+( [A-Za-z]+)?$/;

    if(!namePattern.test(nameOne)){
        alert("Name 1 input form is incorrect.")
        return
    }
    if(!nameTwo.value === ""){
        if(!namePattern.test(nameTwo)){
            alert("Name 2 input form is incorrect.")
            return

    }
    }

    fetch("../Backout/marriageRecords.json")
    .then(response => {
        if(!response.ok){
            throw new Error("Network response was not ok " + response.statusText)
        }

        return response.json()
    })
    .then(jsonData => {
        let search = {
            nameOne,
            nameTwo,
            date
        }

        const results = jsonData.filter(item=> {
            const nameOneMatch = search.nameOne && item.name.toLowerCase() == search.nameOne
            const nameTwoMatch = search.nameTwo && item.name.toLowerCase().includes(search.nameTwo)
            const dateMatch = new Date(item.date).toISOString().split('T')[0] === new Date(search.date).toISOString().split('T')[0];
            return dateMatch && (nameOneMatch || nameTwoMatch)
        })
        let sharedResults = results;

            if (search.nameTwo) {
                const nameOneResults
              } else if (dateMatch && search.nameTwo) {
                return item.name.toLowerCase().includes(search.nameTwo);
              } else {
                return false;
              }
        console.log(results)
        if(results.length === 0){
            showModal("noResultModal")
        } else {
            displayResultsOldBooks(results)
            document.getElementById("discreimer").style.display = "none"
        }
        console.log(results)
    }).catch(err=> {
        console.log("Error fetching JSON: ", err)
    })
})