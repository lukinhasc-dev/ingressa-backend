document.addEventListener("DOMContentLoaded", function () {
    const formCadastro = document.getElementById("forms-cadastro");
    const cpfInput = document.getElementById("cpf");
    const telefoneInput = document.getElementById("telefone");
    const nomeInput = document.getElementById("nome");

    if (cpfInput) {
        cpfInput.addEventListener("input", function (e) {
            let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não for número
            value = value.replace(/(\d{3})(\d)/, "$1.$2");
            value = value.replace(/(\d{3})(\d)/, "$1.$2");
            value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
            e.target.value = value;
        });
    }

    if (nomeInput) {
        nomeInput.addEventListener("input", function (e) {
            let value = e.target.value;

            // Permite apenas letras (maiúsculas e minúsculas) e espaços
            value = value.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");

            e.target.value = value;
        });
    }

    if (telefoneInput) {
        telefoneInput.addEventListener("input", function (e) {
            let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não for número
            value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
            value = value.replace(/(\d{5})(\d)/, "$1-$2");
            e.target.value = value;
        });
    }

    if (formCadastro) {
        formCadastro.addEventListener("submit", function (e) {
            e.preventDefault();

            const nome = document.getElementById("nome").value.trim();
            const dataNascimento = document.getElementById("data-nascimento").value;
            const email = document.getElementById("email").value.trim().toLowerCase();
            const senha = document.getElementById("senha").value;
            const cpf = document.getElementById("cpf").value.trim();
            const telefone = document.getElementById("telefone").value.trim();

            // Validações básicas
            if (!nome || !email || !senha || !cpf || !telefone || !dataNascimento) {
                alert("Por favor, preencha todos os campos.");
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert("Por favor, insira um email válido.");
                return;
            }

            if (senha.length < 6) {
                alert("A senha precisa ter pelo menos 6 caracteres.");
                return;
            }

            fetch("http://localhost:8080/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nome: nome,
                    dataNascimento: dataNascimento,
                    email: email,
                    senha: senha,
                    cpf: cpf,
                    telefone: telefone,
                    tipo: "usuario" // ou "admin" se quiser cadastrar administradores aqui também
                })
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Erro ao cadastrar usuário");
                    }
                    return response.json();
                })
                .then(data => {
                    alert("Cadastro realizado com sucesso!");
                    window.location.replace("login.html");
                })
                .catch(error => {
                    alert(error.message);
                });
        });
    }
});
