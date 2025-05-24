document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const eventoId = params.get("id");

    if (!eventoId) {
        alert("Evento não encontrado!");
        window.location.href = "inicio.html";
        return;
    }

    // Função para formatar a data no formato dd/mm/aa
    function formatarData(dataISO) {
        const d = new Date(dataISO);
        const dia = String(d.getDate()).padStart(2, '0');
        const mes = String(d.getMonth() + 1).padStart(2, '0');
        const ano = String(d.getFullYear()).slice(-2);
        return `${dia}/${mes}/${ano}`;
    }

    // Função para formatar hora no estilo 23h00 (considerando entrada "HH:mm" ou "HH:mm:ss")
    function formatarHora(horaStr) {
        // Pega só a parte da hora e minuto
        const [hora, minuto] = horaStr.split(":");
        return `${hora}h${minuto}`;
    }

    // Função para formatar valor em reais com duas casas decimais
    function formatarValor(valor) {
        return `R$ ${valor.toFixed(2).replace(".", ",")}`;
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

        // Formata a data no estilo 15/04/25
        document.querySelectorAll(".text-info")[0].textContent = formatarData(evento.data_evento);

        document.querySelectorAll(".text-info")[1].textContent = evento.cidade_evento;    // Dia da semana (se for cidade, mantém normal)
        document.querySelectorAll(".text-info")[2].textContent = evento.rua_evento;        // Local

        // Formata hora no estilo 23h00
        document.querySelectorAll(".text-info")[3].textContent = formatarHora(evento.horario_evento);

        // Formata valor com centavos
        document.querySelector(".ingresso-valor").textContent = formatarValor(parseFloat(evento.preco_evento));

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
            Swal.fire({
                icon: 'success',
                title: 'Ingresso adicionado!',
                text: 'O ingresso foi adicionado ao carrinho com sucesso.',
                confirmButtonColor: '#3085d6'
            });
        });

    } catch (error) {
        console.error(error);
        Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: 'Erro ao carregar informações do evento.',
            confirmButtonColor: '#d33'
        });
        window.location.href = "inicio.html";
    }
});
