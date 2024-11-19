document.addEventListener("DOMContentLoaded", function () {
    const listaInscritos = document.getElementById("listaInscritos");
    const editFormContainer = document.getElementById("editFormContainer");
    const editForm = document.getElementById("editForm");
    const backButton = document.getElementById("back-button");
    const toggleSenhaButton = document.getElementById("toggleSenha");
    const editSenhaInput = document.getElementById("editSenha");
    
    let editIndex = null;

    function carregarInscritos() {
        listaInscritos.innerHTML = "";
        const inscritos = JSON.parse(localStorage.getItem("inscritos")) || [];

        inscritos.forEach((inscrito, index) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${inscrito.nome}</td>
                <td>${inscrito.email}</td>
                <td><input type="number" class="idadeInput" value="${inscrito.idade}" data-index="${index}"></td>
                <td><input type="text" class="telefoneInput" value="${inscrito.telefone || ''}" data-index="${index}"></td>
                <td>
                    <button class="editar" onclick="editarInscrito(${index})">Editar</button>
                    <button class="excluir" onclick="excluirInscrito(${index})">Excluir</button>
                </td>
            `;
            listaInscritos.appendChild(tr);
        });

        document.querySelectorAll('.idadeInput').forEach(input => {
            input.addEventListener('change', (event) => {
                const index = event.target.getAttribute('data-index');
                const newAge = event.target.value;
                atualizarIdade(index, newAge);
            });
        });

        document.querySelectorAll('.telefoneInput').forEach(input => {
            input.addEventListener('change', (event) => {
                const index = event.target.getAttribute('data-index');
                const newPhone = event.target.value;
                atualizarTelefone(index, newPhone);
            });
        });
    }

    function atualizarIdade(index, newAge) {
        const inscritos = JSON.parse(localStorage.getItem("inscritos"));
        inscritos[index].idade = newAge;
        localStorage.setItem("inscritos", JSON.stringify(inscritos));
        carregarInscritos();
    }

    function atualizarTelefone(index, newPhone) {
        const inscritos = JSON.parse(localStorage.getItem("inscritos"));
        inscritos[index].telefone = newPhone;
        localStorage.setItem("inscritos", JSON.stringify(inscritos));
        carregarInscritos();
    }

    window.editarInscrito = function (index) {
        const inscritos = JSON.parse(localStorage.getItem("inscritos"));
        const inscrito = inscritos[index];

        document.getElementById("editNome").value = inscrito.nome;
        document.getElementById("editEmail").value = inscrito.email;
        document.getElementById("editIdade").value = inscrito.idade;
        document.getElementById("editTelefone").value = inscrito.telefone || '';
        document.getElementById("editSenha").value = inscrito.senha;

        editIndex = index;
        editFormContainer.style.display = "block";
    };

    window.excluirInscrito = function (index) {
        const inscritos = JSON.parse(localStorage.getItem("inscritos"));
        inscritos.splice(index, 1);
        localStorage.setItem("inscritos", JSON.stringify(inscritos));
        carregarInscritos();
    };

    toggleSenhaButton.addEventListener("click", function () {
        if (editSenhaInput.type === "password") {
            editSenhaInput.type = "text";
            toggleSenhaButton.textContent = "Ocultar";
        } else {
            editSenhaInput.type = "password";
            toggleSenhaButton.textContent = "Mostrar";
        }
    });

    editForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const inscritos = JSON.parse(localStorage.getItem("inscritos"));

        inscritos[editIndex] = {
            nome: document.getElementById("editNome").value,
            email: document.getElementById("editEmail").value,
            idade: document.getElementById("editIdade").value,
            telefone: document.getElementById("editTelefone").value,
            senha: document.getElementById("editSenha").value
        };

        localStorage.setItem("inscritos", JSON.stringify(inscritos));
        editFormContainer.style.display = "none";
        carregarInscritos();
    });

    backButton.addEventListener("click", () => {
        window.history.back();
    });

    carregarInscritos();
});