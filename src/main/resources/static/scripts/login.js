document.addEventListener("DOMContentLoaded", function () {
    const formLogin = document.getElementById("forms-logar");

    if (formLogin) {
        formLogin.addEventListener("submit", function (e) {
            e.preventDefault();

            const emailInput = document.getElementById("email").value.trim().toLowerCase();
            const senhaInput = document.getElementById("senha").value;

            fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: emailInput,
                    senha: senhaInput
                })
            })
                .then(response => {
                    if (response.status === 401) {
                        throw new Error("Usuário ou senha inválidos");
                    }
                    return response.json();
                })
                .then(data => {
                    alert("Login realizado com sucesso!");

                    localStorage.setItem("usuarioLogado", JSON.stringify(data));

                    if (data.tipo === "admin") {
                        window.location.href = "/admin-dashboard.html";
                    } else {
                        window.location.href = "/inicio.html";
                    }
                })
                .catch(error => {
                    alert(error.message);
                });
        });
    }
});
