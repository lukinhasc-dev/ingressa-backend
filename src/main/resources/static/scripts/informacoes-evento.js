document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const eventoId = params.get("id");

    if (!eventoId) {
        alert("Evento não encontrado!");
        window.location.href = "inicio.html";
        return;
    }

    try {
        const response = await fetch(`http://localhost:8080/api/eventos/${eventoId}`);

        if (!response.ok) {
            throw new Error("Erro ao buscar evento.");
        }

        const evento = await response.json();

        // Preenchendo as informações do evento na página
        document.querySelector(".tittle-text-events h1").textContent = evento.nome_evento;
        document.querySelector(".tittle-text-events p").textContent = evento.descricao_evento;

        document.querySelectorAll(".text-info")[0].textContent = evento.data_evento;         // Data
        document.querySelectorAll(".text-info")[1].textContent = evento.cidade_evento;    // Dia da semana
        document.querySelectorAll(".text-info")[2].textContent = evento.rua_evento;        // Local
        document.querySelectorAll(".text-info")[3].textContent = evento.horario_evento;      // Horário

        document.querySelector(".ingresso-valor").textContent = `R$ ${evento.preco_evento}`;

        document.querySelector("#foto-banner img").src = evento.foto_evento;
        document.querySelector("#foto-banner img").alt = `Imagem do evento ${evento.titulo_evento}`;

        const btnCarrinho = document.getElementById("carrinho");
        btnCarrinho.addEventListener("click", () => {
            let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

            const item = {
                id: evento.id,
                titulo: evento.nome_evento,
                valor: parseFloat(evento.preco_evento),
                quantidade: 1,
                imagem: evento.foto_evento
            };

            const itemExistente = carrinho.find(e => e.id === evento.id);
            if (itemExistente) {
                itemExistente.quantidade += 1;
            } else {
                carrinho.push(item);
            }

            localStorage.setItem("carrinho", JSON.stringify(carrinho));
            alert("Ingresso adicionado ao carrinho!");
        });

    } catch (error) {
        console.error(error);
        alert("Erro ao carregar informações do evento.");
        window.location.href = "inicio.html";
    }
});
