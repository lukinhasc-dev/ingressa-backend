document.addEventListener("DOMContentLoaded", function () {
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

    if (usuarioLogado) {
        document.getElementById("nome").value = usuarioLogado.nome || "";
        document.getElementById("email").value = usuarioLogado.email || "";
        document.getElementById("telefone").value = usuarioLogado.telefone || "";
        document.getElementById("senha").value = usuarioLogado.senha || "";
    }

    document.getElementById("editarBtn").addEventListener("click", function () {
        const editarBtn = document.getElementById("editarBtn");

        if (editarBtn.textContent === "Editar Dados") {
            document.getElementById("nome").disabled = false;
            document.getElementById("email").disabled = false;
            document.getElementById("telefone").disabled = false;
            document.getElementById("senha").disabled = false;

            editarBtn.textContent = "Salvar Alterações";
            editarBtn.removeEventListener("click", this);
            editarBtn.addEventListener("click", salvarAlteracoes);
        }
    });

    function salvarAlteracoes() {
        const novoUsuario = {
            nome: document.getElementById("nome").value,
            email: document.getElementById("email").value,
            telefone: document.getElementById("telefone").value,
            senha: document.getElementById("senha").value
        };

        // Atualizar localStorage
        localStorage.setItem("usuarioLogado", JSON.stringify(novoUsuario));

        // Enviar as alterações para o back-end
        fetch("http://localhost:8080/api/auth/update", {
            method: "PUT", // Usando PUT para atualizar
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(novoUsuario),
        })
            .then(response => {
                if (response.ok) {
                    alert("Dados atualizados com sucesso!");
                    // Caso o update no back-end seja bem-sucedido
                    document.getElementById("nome").disabled = true;
                    document.getElementById("email").disabled = true;
                    document.getElementById("telefone").disabled = true;
                    document.getElementById("senha").disabled = true;

                    document.getElementById("editarBtn").textContent = "Editar Dados";
                    document.getElementById("editarBtn").removeEventListener("click", salvarAlteracoes);
                    document.getElementById("editarBtn").addEventListener("click", function () {
                        document.getElementById("nome").disabled = false;
                        document.getElementById("email").disabled = false;
                        document.getElementById("telefone").disabled = false;
                        document.getElementById("senha").disabled = false;

                        this.textContent = "Salvar Alterações";
                        this.removeEventListener("click", this);
                        this.addEventListener("click", salvarAlteracoes);
                    });
                } else {
                    alert("Erro ao atualizar os dados.");
                }
            })
            .catch(error => {
                console.error("Erro ao enviar dados para o back-end:", error);
                alert("Erro ao tentar atualizar os dados.");
            });
    }
});
