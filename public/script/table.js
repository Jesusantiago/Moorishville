export const displayResultsReal = (results) => {
    document.getElementById("resultsTable").style.display = "block"
    const tbody = document.getElementById('resultsTable').getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';

    results.forEach(result => {
        const row = tbody.insertRow();
        const nameCell = row.insertCell()
        nameCell.innerText = result.name;


        const fileCell = row.insertCell();
        const link = document.createElement('a');
        link.href = result.link; 
        link.target = '_blank';
        link.innerText = "See Document";
        fileCell.appendChild(link);
    });

    document.getElementById('resultsTable').scrollIntoView({ behavior: 'smooth' });
}

export const displayResultsOldBooks = (results) => {
    document.getElementById("resultsTable").style.display = "block";
    const tbody = document.getElementById('resultsTable').getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';

    results.forEach(result => {
        result.pages.forEach(page => {
            const row = tbody.insertRow();

            const nameCell = row.insertCell();
            nameCell.innerText = result.name;

            const linkCell = row.insertCell();
            const link = document.createElement('a');
            link.href = page.link;
            console.log(page.link)
            link.target = '_blank';
            link.innerText = "See Document"; 
            linkCell.appendChild(link);
        });
    });

    document.getElementById('resultsTable').scrollIntoView({ behavior: 'smooth' });
};

