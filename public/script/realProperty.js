import showModal from "./modalForm.js";
import { displayResultsReal } from "./table.js"
// import formValidator from "./validationData.js";



document.getElementById("searchButton").addEventListener("click", (e) => {
    e.preventDefault();
    // const form = document.getElementById("form")
    const name = document.getElementById("name").value.toLowerCase();
    const startDate = document.getElementById("start-date-real").value;
    const endDate = document.getElementById("end-date-real").value;
    const grantor = document.getElementById("grantor-real").checked;
    const grantee = document.getElementById("grantee-real").checked;
    const mixed = document.getElementById("mixed-real").checked;
    const temporary = document.getElementById("temporary-real").checked;
    const either = document.getElementById("either-real").checked;

    const namePattern = /^[A-Za-z]+( [A-Za-z]+)?$/;

    if(!namePattern.test(name)){
        alert("Name input formt is incorrect.")
        return;
    }

    const fieldID = ["name"]

    // const validate = new formValidator(form, fieldID)

    // validate.initialize()

    const isEmptyName = !name;
    const isEmptyStartDate = !startDate;
    const isEmptyEndDate = !endDate;
    const isConditionUnchecked = !grantor && !grantee;
    const isTimeUnchecked = !mixed && !temporary && !either

    if (isEmptyName || isEmptyStartDate || isEmptyEndDate || isConditionUnchecked || isTimeUnchecked) {
        showModal("incompleteFormModal")
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
                startDate,
                endDate,
                condition: { grantor, grantee },
                time: { mixed, temporary, either }
            }

            const results = jsonData.filter(item => {
                const nameMatch = !search.name || item.name.toLowerCase().includes(search.name)
                const dateMatch = (!search.startDate || new Date(item.date) >= new Date(search.startDate)) && (!search.endDate || new Date(item.date) <= new Date(search.endDate));
                const conditionMatch = (grantor && item.grantor) || (grantee && item.grantee);
                const timeMatch = (mixed && item.mixed) || (temporary && item.temporary) || (either && item.either);

                return nameMatch && dateMatch && conditionMatch && timeMatch
            })

            if (results.length === 0) {
                showModal("noResultsModal");
            } else {
                displayResultsReal(results);
                document.getElementById("discreimer").style.display = "none"
            }

        })
        .catch(err => console.error(err.message))
})
