// Função para pegar o dia da semana
function getDiaSemana(dataString) {
    const dias = ['Dom', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    const data = new Date(dataString);
    return dias[data.getDay()];
}

// Função para formatar a data por extenso
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

// Função para formatar o horário
function formatarHorario(horarioString) {
    const [hora, minuto] = horarioString.split(':'); // Ajustei o split para ':'

    if (minuto === '00') {
        return `${hora}h`;
    } else {
        return `${hora}h${minuto}`;
    }
}

document.addEventListener("DOMContentLoaded", function() {
    fetch('http://localhost:8080/api/eventos')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar os eventos');
            }
            return response.json();
        })
        .then(data => {
            const eventosContainer = document.getElementById('cards-content');
            eventosContainer.innerHTML = '';

            data.forEach(evento => {
                const diaSemana = getDiaSemana(evento.data_evento);
                const dataExtenso = formatarDataPorExtenso(evento.data_evento);
                const horarioFormatado = formatarHorario(evento.horario_evento);

                const eventoElement = document.createElement('section');
                eventoElement.classList.add('cards-juncti');
                eventoElement.innerHTML = `
                    <div class="cards-image">
                        <img src="http://localhost:8080/api/eventos/imagem/${evento.id}" alt="Foto do evento">
                    </div>
                    <div class="cards-title-description">
                        <span class="title-card">${evento.nome_evento}</span>
                        <p class="description-card">${evento.descricao_evento}</p>
                    </div>
                    <div class="cards-information">
                        <div class="cards-date">
                            <div class="cards-dayweek">
                                <span>${diaSemana}</span>
                            </div>
                            <span>${dataExtenso}</span>
                            <span> - </span>
                            <span>${horarioFormatado}</span>
                        </div>
                        <div class="cards-ingresso">
                            <button>Ingressos</button>
                        </div>
                    </div>
                `;
                eventosContainer.appendChild(eventoElement);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar os eventos:', error);
            alert('Erro ao carregar os eventos');
        });
});
