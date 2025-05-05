document.addEventListener("DOMContentLoaded", function () {
    // Função para buscar eventos do backend
    fetch("http://localhost:8080/api/eventos") // Aqui deve ser o endpoint correto da sua API
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar eventos');
            }
            return response.json(); // Assume que a resposta é em JSON
        })
        .then(events => {
            const cardsContent = document.getElementById("cards-content"); // Referência ao conteúdo dos cards
            cardsContent.innerHTML = ''; // Limpa o conteúdo atual dos cards

            // Loop pelos eventos e inserção dinâmica
            events.forEach(event => {
                // Criação de cada card de evento
                const card = document.createElement("section");
                card.classList.add("cards-junction");

                const cardContent = `
                    <section id="cards-content">
                        <div class="cards-image">
                            <img src="/static/uploads/${event.imagem}" alt="Foto do Show"> <!-- Caminho da imagem -->
                        </div>
                        <div class="cards-title-description">
                            <span class="title-card">${event.titulo}</span>
                            <p class="description-card">${event.descricao}</p>
                        </div>
                        <div class="cards-information">
                            <div class="cards-date">
                                <div class="cards-dayweek">
                                    <span>${event.diaSemana}</span> <!-- Exemplo de como pode estar -->
                                </div>
                                <span>${event.data}</span> <!-- Data do evento -->
                                <span> - </span>
                                <span>${event.hora}</span> <!-- Hora do evento -->
                            </div>
                            <div class="cards-ingresso">
                                <button>Ingressos</button>
                            </div>
                        </div>
                    </section>
                `;

                card.innerHTML = cardContent;
                cardsContent.appendChild(card); // Adiciona o card no conteúdo da página
            });
        })
        .catch(error => {
            console.error('Erro ao carregar eventos:', error);
            // Você pode adicionar algum tipo de mensagem de erro aqui, se necessário
        });
});


function getDiaSemana(dataString) {
    const dias = ['Dom', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    const data = new Date(dataString);
    return dias[data.getDay()];
}

function formatarDataPorExtenso(dataString) {
    const meses = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    const data = new Date(dataString + 'T00:00:00');
    const dia = data.getDate();
    const mes = meses[data.getMonth()];

    return `${dia} de ${mes}`;
}

function formatarHorario(horarioString) {
    const [hora, minuto] = horarioString.split('-');

    if (minuto === '00') {
        return `${hora}h`;
    } else {
        return `${hora}h${minuto}`;
    }
}
