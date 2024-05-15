const displayResults = (results) => {
    document.getElementById("resultsTable").style.display = "block"
    const tbody = document.getElementById('resultsTable').getElementsByTagName('tbody')[0];
    tbody.innerHTML = ''; // Limpiar resultados anteriores

    results.forEach(result => {
        const row = tbody.insertRow();

        row.insertCell().innerText = result.Name;
        row.insertCell().innerText = result.date;
        row.insertCell().innerText = result.grantor ? 'Yes' : 'No';
        row.insertCell().innerText = result.grantee ? 'Yes' : 'No';
        row.insertCell().innerText = result.mixed ? 'Yes' : 'No';
        row.insertCell().innerText = result.temporary ? 'Yes' : 'No';
        row.insertCell().innerText = result.either ? 'Yes' : 'No';

        const fileCell = row.insertCell();
        const link = document.createElement('a');
        link.href = result.link; // Asegúrate de que el campo `file` exista en tu JSON
        link.target = '_blank';
        link.innerText = "See Document";
        fileCell.appendChild(link);
    });
}

export default displayResults;