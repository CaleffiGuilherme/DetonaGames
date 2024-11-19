function mostrarUsuariosOnline() {
    const usuariosOnline = JSON.parse(localStorage.getItem("usuariosOnline")) || [
        { nome: "Lucas Silva", email: "lucas.silva@email.com", ultimoLogin: "2024-11-17 10:00:00" },
        { nome: "Fernanda Souza", email: "fernanda.souza@email.com", ultimoLogin: "2024-11-17 09:50:30" },
        { nome: "Carlos Pereira", email: "carlos.pereira@email.com", ultimoLogin: "2024-11-17 09:45:10" },
        { nome: "Mariana Costa", email: "mariana.costa@email.com", ultimoLogin: "2024-11-17 09:30:00" },
        { nome: "Rafael Oliveira", email: "rafael.oliveira@email.com", ultimoLogin: "2024-11-17 09:20:45" }
    ];

    const tabela = document.getElementById("usuariosOnline").getElementsByTagName("tbody")[0];
    tabela.innerHTML = "";

    usuariosOnline.forEach(usuario => {
        const novaLinha = tabela.insertRow();
        novaLinha.innerHTML = `
            <td>${usuario.nome}</td>
            <td>${usuario.email}</td>
            <td>${usuario.ultimoLogin}</td>
        `;
    });
}

function validarLogin() {
    const loginNome = document.getElementById("loginNome").value;
    const loginEmail = document.getElementById("loginEmail").value;
    const loginSenha = document.getElementById("loginSenha").value;
    const loginErro = document.getElementById("loginErro");

    loginErro.style.display = 'none';

    if (loginNome === "" || loginEmail === "" || loginSenha === "") {
        loginErro.style.display = 'block';
        loginErro.textContent = "Todos os campos devem ser preenchidos!";
        return;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(loginEmail)) {
        loginErro.style.display = 'block';
        loginErro.textContent = "Por favor, insira um e-mail válido.";
        return;
    }

    const inscritos = JSON.parse(localStorage.getItem("inscritos")) || [];

    const usuarioValido = inscritos.some(inscrito => 
        inscrito.nome === loginNome && 
        inscrito.email === loginEmail && 
        inscrito.senha === loginSenha
    );

    if (usuarioValido) {
        loginErro.style.display = 'none';

        const usuarioOnline = { nome: loginNome, email: loginEmail, ultimoLogin: new Date().toLocaleString() };

        let usuariosOnline = JSON.parse(localStorage.getItem("usuariosOnline")) || [];

        usuariosOnline.push(usuarioOnline);

        if (usuariosOnline.length > 5) {
            usuariosOnline.shift();
        }

        localStorage.setItem("usuariosOnline", JSON.stringify(usuariosOnline));

        mostrarUsuariosOnline();

        window.location.href = './games.html';
    } else {
        
        loginErro.style.display = 'block';
        loginErro.textContent = "Nome, e-mail ou senha incorretos. Por favor, verifique seus dados.";
    }
}

window.onload = mostrarUsuariosOnline;