document.addEventListener("DOMContentLoaded", function () {
    const formLogin = document.getElementById("forms-logar");

    if (formLogin) {
        formLogin.addEventListener("submit", function (e) {
            e.preventDefault();

            const cpfInput = document.getElementById("cpf").value.trim();
            const senhaInput = document.getElementById("senha").value;

            fetch("http://localhost:8080/api/admin/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    cpf_admin: cpfInput,
                    senha_admin: senhaInput
                })
            })
                .then(res => {
                    if (!res.ok) {
                        throw new Error("CPF ou senha incorretos.");
                    }
                    return res.json();
                })
                .then(data => {
                    console.log("Login feito com sucesso", data);

                    // Salvando o ID e os dados completos do admin
                    localStorage.setItem("idAdmin", data.id);
                    localStorage.setItem("usuarioLogado", JSON.stringify(data));

                    alert("Login realizado com sucesso!");

                    // Redirecionamento baseado no tipo de usuário
                    window.location.href = "adicionar-evento.html";
                })
                .catch(error => {
                    console.error("Erro no login:", error);
                    alert("Erro no login: " + error.message);
                });
        });
    }
});
