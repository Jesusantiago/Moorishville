import showModal from "./modalForm.js";
import displayResults from "./table.js"
console.log("realPropety")

document.getElementById("searchButton").addEventListener("click", (e) => {
    e.preventDefault();

    const name = document.getElementById("name-real").value.toLowerCase()
    const date = document.getElementById("date-real").value
    const grantor = document.getElementById("grantor-real").checked
    const grantee = document.getElementById("grantee-real").checked
    const mixed = document.getElementById("mixed-real").checked
    const temporary = document.getElementById("temporary-real").checked
    const either = document.getElementById("either-real").checked

    if (!name && !date && !grantor && !grantee && !mixed && !temporary && !either) {
        showModal()
        return;
    }


    fetch("../Backout/realProperty.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok " + response.statusText)
            }
            return response.json()
        })
        .then(jsonData => {

            let search = {
                name,
                date,
                condition: { grantor, grantee },
                time: { mixed, temporary, either }
            }
            console.log(search.name)

            const results = jsonData.filter(item => {
                const nameMatch = !search.name || item.Name.toLowerCase().includes(search.name)
                const dateMatch = !search.date || item.date === search.date;
                const conditionMatch = (grantor && item.grantor) || (grantee && item.grantee);
                const timeMatch = (mixed && item.mixed) || (temporary && item.temporary) || (either && item.either);

                console.log(nameMatch, dateMatch, conditionMatch, timeMatch)
                return nameMatch && dateMatch && conditionMatch && timeMatch
            })
            console.log(results)

            displayResults(results);
        })
        .catch(err => console.error(err.message))


})
