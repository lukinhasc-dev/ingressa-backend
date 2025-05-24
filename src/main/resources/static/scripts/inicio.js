    document.addEventListener('DOMContentLoaded', () => {

        fetch('http://localhost:8080/api/eventos')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao buscar eventos');
                }
                return response.json();
            })
            .then(eventos => {
                if (eventos.length === 0) {
                    cardsJunction.innerHTML = '<p class="sem-evento">Nenhum evento cadastrado no momento.</p>';
                    return;
                }

                eventos.forEach(evento => {
                    const dataEvento = new Date(evento.data_evento);
                    const diaSemana = dataEvento.toLocaleDateString('pt-BR', { weekday: 'long' });
                    const diaMes = dataEvento.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' });

                    const cardHTML = `
                        <section class="card">
                            <div class="card-evento">
                                <img src="http://localhost:8080${evento.foto_evento}" alt="Foto do Evento">
                                <strong class="titulo-evento">${evento.nome_evento}</strong>
                                <p class="descricao-evento">${evento.descricao_evento}</p>
                            </div>
    
                            <div class="card-evento-informacao">
                                <div class="data-informacao">
                                    <span class="dia-semana">${capitalizeFirstLetter(diaSemana)}</span>
                                    <div>
                                        <span class="dia-mes">${diaMes}</span>
                                        <span> - </span>
                                        <span class="hora-evento">${evento.horario_evento}</span>
                                    </div>
                                </div>
    
                                <button class="btn-ingressos"
                                    onclick="window.location.href='/static/pages/informacoes-evento.html?id=${evento.id}'">
                                    Ingressos
                                </button>
                            </div>
                        </section>
                    `;
                    cardsJunction.insertAdjacentHTML('beforeend', cardHTML);
                });
            })
            .catch(error => {
                console.error(error);
                cardsJunction.innerHTML = '<p class="erro-evento">Erro ao carregar eventos. Tente novamente mais tarde.</p>';
            });
    });

    // Função para deixar a primeira letra maiúscula
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
