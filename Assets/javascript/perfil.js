document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.getElementById("table-body");

    const chapters = [
        { id: "cap1", name: "Capítulo 1 - Colter" },
        { id: "cap2", name: "Capítulo 2 - Horseshoe Overlook" },
        { id: "cap3", name: "Capítulo 3 - Clemens Point" },
        { id: "cap4", name: "Capítulo 4 - Saint Denis" },
        { id: "cap5", name: "Capítulo 5 - Guarma" },
        { id: "cap6", name: "Capítulo 6 - Beaver Hollow" },
        { id: "epi", name: "Epílogo" },
        { id: "sec", name: "Atividades Secundárias" },
    ];

    chapters.forEach(chapter => {
        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = chapter.name;
        row.appendChild(nameCell);

        const statusCell = document.createElement("td");
        const isComplete = localStorage.getItem(chapter.id) === "true";
        statusCell.textContent = isComplete ? "Concluído" : "Incompleto";
        row.appendChild(statusCell);

        if (isComplete) {
            row.classList.add("completed");
        }

        tableBody.appendChild(row);
    });

    setInterval(() => {
        Array.from(tableBody.children).forEach((row, index) => {
            const statusCell = row.children[1];
            const isComplete = localStorage.getItem(chapters[index].id) === "true";
            statusCell.textContent = isComplete ? "Concluído" : "Incompleto";
            row.classList.toggle("completed", isComplete);
        });
    }, 1000);

    const backButton = document.getElementById("back-button");
    backButton.addEventListener("click", () => {
        window.history.back();
    });
});