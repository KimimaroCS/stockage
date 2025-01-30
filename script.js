function initPage(category) {
    document.getElementById("form").addEventListener("submit", function (e) {
        e.preventDefault();

        let nom = document.getElementById("nom").value;
        let lien = document.getElementById("lien").value;
        let date = new Date().toLocaleDateString("fr-FR");

        let entry = { nom, lien, date };

        let data = JSON.parse(localStorage.getItem(category)) || [];
        data.push(entry);
        localStorage.setItem(category, JSON.stringify(data));

        document.getElementById("nom").value = "";
        document.getElementById("lien").value = "";

        loadEntries(category);
    });

    loadEntries(category);
}

function loadEntries(category) {
    let tableBody = document.getElementById("table-body");
    tableBody.innerHTML = "";

    let data = JSON.parse(localStorage.getItem(category)) || [];

    data.forEach((entry, index) => {
        let row = tableBody.insertRow();
        row.innerHTML = `
            <td>${entry.nom}</td>
            <td>${entry.lien ? `<a href="${entry.lien}" target="_blank">Lien</a>` : "-"}</td>
            <td>${entry.date}</td>
            <td><button class="delete" onclick="deleteEntry('${category}', ${index})">Supprimer</button></td>
        `;
    });
}

function deleteEntry(category, index) {
    let data = JSON.parse(localStorage.getItem(category)) || [];
    data.splice(index, 1);
    localStorage.setItem(category, JSON.stringify(data));
    loadEntries(category);
}