import showModal from "./modalForm.js"
import { displayResultsMarriageTwo, displayResultsOldBooks } from "./table.js"

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
        console.log(results)
        let values = []
        if (search.nameTwo) {
            let [userOne, userTwo] = results;
            const { pages : pagesOne } = userOne
            const { pages : pagesTwo } = userTwo
            
            for( const valueOne of pagesOne){
                // console.log(valueOne)
                for ( const valueTwo of pagesTwo){
                        if(valueOne.page == valueTwo.page){
                            values.push(valueTwo)
                        }
                }
            }   
        }

        console.log(values)
        if (results.length === 0) {
            showModal("noResultModal");
        } else if(values.length === 0) {
            console.log("values 0")
            displayResultsOldBooks(results);
            document.getElementById("discreimer").style.display = "none";
        } else {
            console.log("value results")
            displayResultsMarriageTwo(values)
            document.getElementById("discreimer").style.display = "none";
            
        }

    }).catch(err=> {
        console.log("Error fetching JSON: ", err)
    })
})