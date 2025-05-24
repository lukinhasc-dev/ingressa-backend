document.addEventListener("DOMContentLoaded", () => {
    const carrinhoContainer = document.getElementById("carrinho");
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    const subtotalElement = document.querySelectorAll(".list-option p")[0];
    const valorTotalElement = document.querySelectorAll(".list-option p")[1];
    const totalElement = document.querySelector(".option-valores2 .list-option p");

    function atualizarCarrinho() {
        carrinhoContainer.innerHTML = "";

        if (carrinho.length === 0) {
            carrinhoContainer.innerHTML = "<p>Seu carrinho está vazio.</p>";
            subtotalElement.textContent = "R$ 0,00";
            valorTotalElement.textContent = "R$ 0,00";
            totalElement.textContent = "R$ 0,00";
            return;
        }

        let total = 0;

        carrinho.forEach(item => {
            const subtotalItem = item.valor * item.quantidade;
            total += subtotalItem;

            const itemHTML = `
                <div class="ingresso-linha">
                    <img src="${item.imagem}" alt="Imagem do evento">
                    <div class="info-evento">
                        <strong class="qntd-ingresso">Qntd. Ingresso</strong>
                        <p>${item.quantidade}</p>
                    </div>
                    <div class="info-evento">
                        <strong class="valor-ingresso">Valor</strong>
                        <p>R$ ${item.valor.toFixed(2)}</p>
                    </div>
                    <div class="info-evento">
                        <button class="remover-item" data-id="${item.id}">Remover</button>
                    </div>
                </div>
            `;

            carrinhoContainer.insertAdjacentHTML("beforeend", itemHTML);
        });

        subtotalElement.textContent = `R$ ${total.toFixed(2)}`;
        valorTotalElement.textContent = `R$ ${total.toFixed(2)}`;
        totalElement.textContent = `R$ ${total.toFixed(2)}`;
    }

    // Evento para remover item
    carrinhoContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("remover-item")) {
            const id = e.target.getAttribute("data-id");
            const index = carrinho.findIndex(item => item.id == id);
            if (index !== -1) {
                carrinho.splice(index, 1);
                localStorage.setItem("carrinho", JSON.stringify(carrinho));
                atualizarCarrinho();
            }
        }
    });

    // Pagamento com Stripe
    const btnPagamento = document.getElementById("button-payment");
    btnPagamento.addEventListener("click", async () => {
        if (carrinho.length === 0) {
            alert("Seu carrinho está vazio!");
            return;
        }

        const total = carrinho.reduce((acc, item) => acc + (item.valor * item.quantidade), 0);

        const email = prompt("Informe seu e-mail para continuar com o pagamento:");

        if (!email) {
            alert("E-mail é obrigatório para prosseguir.");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/api/payment/create-checkout-session", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    total: total,
                    email: email
                })
            });

            const data = await response.json();

            if (data.url) {
                window.location.href = data.url;
            } else {
                alert("Erro ao criar sessão de pagamento.");
            }

        } catch (error) {
            console.error("Erro:", error);
            alert("Erro ao processar pagamento.");
        }
    });

    atualizarCarrinho();
});
