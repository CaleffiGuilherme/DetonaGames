document.addEventListener("DOMContentLoaded", function() {
    const formCadastro = document.getElementById("cadastroForm");
    const errorMessageCadastro = document.getElementById("errorMessageCadastro");
    const successMessageCadastro = document.getElementById("successMessageCadastro");

    formCadastro.addEventListener("submit", function(event) {
        event.preventDefault();

        const nome = document.getElementById("nome").value;
        const email = document.getElementById("email").value;
        const idade = document.getElementById("idade").value;
        const senha = document.getElementById("senha").value;
        const telefone = document.getElementById("telefone").value;

        errorMessageCadastro.style.display = 'none';
        errorMessageCadastro.textContent = '';
        successMessageCadastro.textContent = '';
        successMessageCadastro.style.display = 'none';

        const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|hotmail\.com)$/;
        if (!emailRegex.test(email)) {
            errorMessageCadastro.textContent = "O email deve ser @gmail.com ou @hotmail.com.";
            errorMessageCadastro.style.display = 'block';
            return;
        }

        const telefoneRegex = /^\(\d{2}\) \d{4}-\d{4}$/;
        if (!telefoneRegex.test(telefone)) {
            errorMessageCadastro.textContent = "O número de telefone deve seguir o formato (xx) xxxx-xxxx.";
            errorMessageCadastro.style.display = 'block';
            return;
        }

        const inscritos = JSON.parse(localStorage.getItem("inscritos")) || [];
        inscritos.push({ nome, email, idade, senha, telefone });
        localStorage.setItem("inscritos", JSON.stringify(inscritos));

        successMessageCadastro.textContent = "Cadastro realizado com sucesso!";
        successMessageCadastro.style.display = 'block';

        formCadastro.reset();
    });

    const formAdmin = document.getElementById('adminLoginForm');
    const errorMessageAdmin = document.getElementById("errorMessageAdmin");
    const adminBtn = document.getElementById('adminBtn');
    const adminForm = document.getElementById('adminForm');

    adminBtn.addEventListener('click', function() {
        adminForm.classList.toggle('hidden');
    });

    formAdmin.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById("adminUsername").value;
        const password = document.getElementById("adminPassword").value;

        errorMessageAdmin.style.display = 'none';
        errorMessageAdmin.textContent = '';

        if (username === 'admin' && password === 'admin') {
            window.location.href = 'admin.html'; 
        } else {
            errorMessageAdmin.textContent = "Usuário ou senha inválidos!";
            errorMessageAdmin.style.display = 'block';
        }
    });
});