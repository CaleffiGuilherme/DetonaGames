document.addEventListener("DOMContentLoaded", () => {
    const expandButtons = document.querySelectorAll(".expand-btn");

    const checkboxes = document.querySelectorAll(".chapter-checkbox");
    checkboxes.forEach(checkbox => {
        const chapter = checkbox.dataset.chapter;

        const completed = localStorage.getItem(chapter) === "true";
        checkbox.checked = completed;

        console.log(`Checkbox para ${chapter} - Inicial: ${completed}`);

        checkbox.addEventListener("change", () => {
            handleCheckboxChange(checkbox);
        });
    });

    function handleCheckboxChange(currentCheckbox) {
        const chapterId = currentCheckbox.dataset.chapter;

        const chapterCheckboxes = document.querySelectorAll(
            `.chapter-checkbox[data-chapter="${chapterId}"]`
        );

        chapterCheckboxes.forEach(checkbox => {
            if (checkbox !== currentCheckbox) {
                checkbox.checked = false;
            }
        });

        localStorage.setItem(chapterId, currentCheckbox.checked);
        console.log(`Mudança no checkbox ${chapterId}: ${currentCheckbox.checked}`);
    }

    expandButtons.forEach(button => {
        button.addEventListener("click", () => {
            const chapterContent = button.nextElementSibling;

            if (chapterContent.style.display === "block") {
                chapterContent.style.display = "none";
                button.innerText = "Ver Detalhes";
            } else {
                chapterContent.style.display = "block";
                button.innerText = "Esconder Detalhes";
            }
        });
    });
});