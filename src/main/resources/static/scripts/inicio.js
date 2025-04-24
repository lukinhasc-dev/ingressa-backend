const containerCards = document.getElementById('cards');
const eventosSalvos = JSON.parse(localStorage.getItem('eventos')) || [];

if (eventosSalvos.length === 0) {
    const mensagem = document.createElement('p');
    mensagem.classList.add('no-events-message');
    mensagem.textContent = 'Nenhum evento disponível no momento.';
    containerCards.appendChild(mensagem);
} else {
    eventosSalvos.forEach(evento => {
        const card = document.createElement('section');
        card.classList.add('cards-junction');

        card.innerHTML = `
            <section id="cards-content">
                <div class="cards-image">
                    <img src="${evento.banner}" alt="Foto do Evento/Show">
                </div>

                <div class="cards-title-description">
                    <span class="title-card">${evento.nome}</span>
                    <p class="description-card">${evento.descricao}</p>
                </div>

                <div class="cards-information">
                    <div class="cards-date">
                        <div class="cards-dayweek">
                            <span>${getDiaSemana(evento.data)}</span>
                        </div>
                        <span>${formatarDataPorExtenso(evento.data)}</span>
                        <span> - </span>
                        <span>${formatarHorario(evento.horario)}</span>
                    </div>

                    <div class="cards-ingresso">
                        <button>Ingressos</button>
                    </div>
                </div>
            </section>
        `;

        containerCards.appendChild(card);
    });
}

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
