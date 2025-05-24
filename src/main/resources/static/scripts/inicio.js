const cardsJunction = document.getElementById('cards-junction');

fetch('http://localhost:8080/api/eventos')
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao buscar eventos');
        }
        return response.json();
    })
    .then(eventos => {
        cardsJunction.innerHTML = ''; // Limpa qualquer conteúdo antigo, só por precaução

        eventos.forEach(evento => {
            const cardHTML = `
                <section id="card">
                    <div id="card-evento">
                        <img src="http://localhost:8080${evento.foto_evento}" alt="Foto do Evento">
                        <strong id="titulo-evento">${evento.nome_evento}</strong>
                        <p id="descricao-evento">${evento.descricao_evento}</p>
                    </div>

                    <div id="card-evento-informacao">
                        <div>
                            <span class="dia-semana">${formatarDiaSemana(evento.data_evento)}</span>
                            <div>
                                <span class="dia-mes">${formatarData(evento.data_evento)}</span>
                                <span> - </span>
                                <span class="hora-evento">${formatarHorario(evento.horario_evento)}</span>
                            </div>
                        </div>

                        <a href="informacoes-evento.html?id=${evento.id}">
                            <button id="btn-ingressos">Ingressos</button>
                        </a>
                    </div>
                </section>
            `;
            cardsJunction.innerHTML += cardHTML;
        });
    })
    .catch(error => {
        console.error('Erro ao buscar eventos:', error);
    });

// Funções para formatar datas e horários continuam iguais...
function formatarData(dataISO) {
    const data = new Date(dataISO);
    const dia = data.getDate();
    const mes = data.toLocaleString('pt-BR', { month: 'long' });
    const mesFormatado = mes.charAt(0).toUpperCase() + mes.slice(1);
    return `${dia} de ${mesFormatado}`;
}

function formatarDiaSemana(dataISO) {
    const data = new Date(dataISO);
    let diaSemana = data.toLocaleString('pt-BR', { weekday: 'long' }).replace('-feira', ' Feira');
    diaSemana = diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1);
    return diaSemana;
}

function formatarHorario(horario) {
    if (!horario) return '';
    const [hora, minuto] = horario.split(':');
    return `${hora}h${minuto}`;
}
