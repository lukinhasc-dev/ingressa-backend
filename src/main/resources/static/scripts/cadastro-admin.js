document.addEventListener("DOMContentLoaded", function () {
    const formCadastro = document.getElementById("forms-cadastro");
    const cpfInput = document.getElementById("cpf");
    const telefoneInput = document.getElementById("telefone");
    const nomeInput = document.getElementById("nome");
    const cnpjInput = document.getElementById("cnpj");

    if (cpfInput) {
        cpfInput.addEventListener("input", function (e) {
            let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não for número
            value = value.replace(/(\d{3})(\d)/, "$1.$2");
            value = value.replace(/(\d{3})(\d)/, "$1.$2");
            value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
            e.target.value = value;
        });
    }

    if (cnpjInput) {
        cnpjInput.addEventListener("input", function (e) {
            let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não for número

            value = value.replace(/^(\d{2})(\d)/, "$1.$2");
            value = value.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
            value = value.replace(/\.(\d{3})(\d)/, ".$1/$2");
            value = value.replace(/(\d{4})(\d)/, "$1-$2");

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
            const cpf = document.getElementById("cpf").value;
            const cnpj = document.getElementById("cnpj").value;
            const nome = document.getElementById("nome").value.trim();
            const email = document.getElementById("email").value.trim().toLowerCase();
            const senha = document.getElementById("senha").value;
            const telefone = document.getElementById("telefone").value.trim();

            // Validações básicas
            if (!nome || !email || !senha || !cpf || !telefone || !cnpj) {
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

            fetch("http://localhost:8080/api/admin/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    cpf: cpf,
                    cnpj: cnpj,
                    nome: nome,
                    email: email,
                    senha: senha,
                    telefone: telefone,
                })
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Erro ao cadastrar administrador!");
                    }
                    return response.json();
                })
                .then(data => {
                    alert("Cadastro de administrador realizado com sucesso!");
                    window.location.replace("adicionar-evento.html"); //TESTE
                })
                .catch(error => {
                    alert(error.message);
                });
        });
    }
});
