const displayResults = (results) => {
    document.getElementById("resultsTable").style.display = "block"
    const tbody = document.getElementById('resultsTable').getElementsByTagName('tbody')[0];
    tbody.innerHTML = ''; // Limpiar resultados anteriores
    console.log(results)

    results.forEach(result => {
        const row = tbody.insertRow();
        const nameCell = row.insertCell()
        nameCell.innerText = result.name;
        // nameCell.classList.add("name")

        const fileCell = row.insertCell();
        const link = document.createElement('a');
        link.href = result.link; 
        link.target = '_blank';
        link.innerText = "See Document";
        // fileCell.classList.add("link")
        fileCell.appendChild(link);
    });

    document.getElementById('resultsTable').scrollIntoView({ behavior: 'smooth' });
}

export default displayResults;