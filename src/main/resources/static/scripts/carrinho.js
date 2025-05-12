document.addEventListener("DOMContentLoaded", async function () {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    if (!id) {
        alert("ID do evento não fornecido.");
        return;
    }

    try {
        const response = await fetch(`http://localhost:8080/api/eventos/${id}`);
        const texto = await response.text();

        let evento;
        try {
            evento = JSON.parse(texto);
        } catch (e) {
            console.error('Erro ao parsear JSON:', texto);
            return;
        }

        console.log("Evento carregado:", evento);

        // Aqui você preenche os campos do carrinho com os dados
        document.querySelector('#nome-evento').textContent = evento.nome_evento;
        document.querySelector('#preco-evento').textContent = `R$ ${parseFloat(evento.valor_ingresso).toFixed(2).replace('.', ',')}`;
        document.querySelector('#imagem-evento').src = evento.foto_evento;
        // E por aí vai...

    } catch (error) {
        console.error("Erro ao buscar evento:", error);
        alert("Não foi possível carregar os dados do evento.");
    }
});
