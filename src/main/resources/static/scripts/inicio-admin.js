document.addEventListener("DOMContentLoaded", () => {
    carregarEventos();
});

async function carregarEventos() {
    try {
        console.log("Buscando eventos...");
        const resposta = await fetch("http://localhost:8080/api/eventos/listar");
        console.log("Resposta recebida:", resposta);

        if (!resposta.ok) {
            throw new Error("Erro ao buscar eventos, status: " + resposta.status);
        }

        const eventos = await resposta.json();
        console.log("Eventos recebidos:", eventos);

        const container = document.getElementById("cards-crud");
        container.innerHTML = ""; // Limpa o conteúdo anterior

        eventos.forEach(evento => {
            console.log("Processando evento:", evento);

            const card = document.createElement("div");
            card.classList.add("crud-evento");

            card.innerHTML = `
                <div class="evento-cardzinho">
                    <img src="http://localhost:8080${evento.foto_evento}" alt="Foto ${evento.nome_evento}">
                    <p>${evento.nome_evento}</p>
                </div>
                <div class="icones">
                    <i class="fas fa-pen"></i>
                    <i class="fas fa-times"></i>
                </div>
            `;

            container.appendChild(card);
        });

    } catch (error) {
        console.error("Erro ao carregar eventos:", error);
        alert("Erro ao carregar os eventos. Veja o console para detalhes.");
    }
}
