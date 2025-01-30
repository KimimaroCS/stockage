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

if (document.getElementById("createPageForm")) {
    document.getElementById("createPageForm").addEventListener("submit", function (e) {
        e.preventDefault();
        let pageName = document.getElementById("newPageName").value.trim();
        if (pageName) {
            createNewPage(pageName);
            document.getElementById("newPageName").value = "";
        }
    });
}

function createNewPage(pageName) {
    let formattedPage = pageName.toLowerCase().replace(/\s+/g, "-") + ".html";
    let pageContent = `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${pageName} Settings</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>${pageName} Settings</h1>
    <a href="index.html">← Retour</a>

    <form id="form">
        <input type="text" id="nom" placeholder="Nom du post" required>
        <input type="url" id="lien" placeholder="Lien (optionnel)">
        <button type="submit">Ajouter</button>
    </form>

    <table>
        <thead>
            <tr>
                <th>Nom du Post</th>
                <th>Lien</th>
                <th>Date</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody id="table-body"></tbody>
    </table>

    <script src="script.js"></script>
    <script>
        initPage("${pageName}");
    </script>
</body>
</html>`;

    localStorage.setItem(formattedPage, pageContent);
    let menu = document.getElementById("menu");
    let newItem = document.createElement("li");
    newItem.innerHTML = `<a href="${formattedPage}">${pageName}</a>`;
    menu.appendChild(newItem);
}