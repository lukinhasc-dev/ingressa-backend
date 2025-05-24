document.addEventListener("DOMContentLoaded", () => {
    carregarEventos();
});

// Carregar os eventos
async function carregarEventos() {
    try {
        const resposta = await fetch("http://localhost:8080/api/eventos");

        if (!resposta.ok) {
            throw new Error(`Erro ao buscar eventos, status: ${resposta.status}`);
        }

        const eventos = await resposta.json();
        const container = document.getElementById("cards-crud");
        container.innerHTML = "";

        // Atualizar contador
        document.getElementById("contador-criados").textContent = eventos.length;

        eventos.forEach(evento => {
            const card = document.createElement("div");
            card.classList.add("crud-evento");

            card.innerHTML = `
                <div class="evento-cardzinho">
                    <img src="http://localhost:8080${evento.foto_evento}" alt="Foto ${evento.nome_evento}">
                    <p>${evento.nome_evento}</p>
                </div>
                <div class="icones">
                    <i class="fas fa-pen editar" data-id="${evento.id}" title="Editar"></i>
                    <i class="fas fa-times deletar" data-id="${evento.id}" title="Excluir"></i>
                </div>
            `;

            container.appendChild(card);
        });

        adicionarListeners();
    } catch (error) {
        console.error("Erro ao carregar eventos:", error);
        alert("Erro ao carregar os eventos.");
    }
}

// Adiciona os eventos dos botões editar e deletar
function adicionarListeners() {
    document.querySelectorAll(".editar").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const id = e.target.dataset.id;
            abrirModalEditar(id);
        });
    });

    document.querySelectorAll(".deletar").forEach(btn => {
        btn.addEventListener("click", async (e) => {
            const id = e.target.dataset.id;
            if (confirm("Deseja realmente deletar este evento?")) {
                try {
                    const resposta = await fetch(`http://localhost:8080/api/eventos/${id}`, {
                        method: "DELETE"
                    });

                    if (resposta.ok) {
                        alert("Evento deletado com sucesso!");
                        carregarEventos();
                    } else {
                        alert("Erro ao deletar evento.");
                    }
                } catch (error) {
                    console.error("Erro ao deletar:", error);
                    alert("Erro ao deletar evento.");
                }
            }
        });
    });
}

// Abre o modal e preenche os dados do evento
function abrirModalEditar(id) {
    fetch(`http://localhost:8080/api/eventos/${id}`)
        .then(res => res.json())
        .then(evento => {
            document.getElementById("edit-nome").value = evento.nome_evento || "";
            document.getElementById("edit-horario").value = evento.horario_evento || "";
            document.getElementById("edit-data").value = evento.data_evento || "";
            document.getElementById("edit-preco").value = evento.preco_evento || "";
            document.getElementById("edit-descricao").value = evento.descricao_evento || "";
            document.getElementById("edit-rua").value = evento.rua_evento || "";
            document.getElementById("edit-cidade").value = evento.cidade_evento || "";
            document.getElementById("edit-estado").value = evento.estado_evento || "";
            document.getElementById("edit-numero").value = evento.numero_evento || "";
            document.getElementById("edit-foto").value = "";

            document.getElementById("form-editar").dataset.id = id;
            document.getElementById("modal-editar").style.display = "flex";
        })
        .catch(error => {
            console.error("Erro ao buscar dados:", error);
            alert("Erro ao carregar dados do evento.");
        });
}

// Fecha o modal
function fecharModalEditar() {
    document.getElementById("modal-editar").style.display = "none";
}

// Submissão do formulário de edição
document.getElementById("form-editar").addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = e.target.dataset.id;
    const formData = new FormData();

    formData.append("nome_evento", document.getElementById("edit-nome").value);
    formData.append("horario_evento", document.getElementById("edit-horario").value);
    formData.append("data_evento", document.getElementById("edit-data").value);
    formData.append("preco_evento", document.getElementById("edit-preco").value);
    formData.append("descricao_evento", document.getElementById("edit-descricao").value);
    formData.append("rua_evento", document.getElementById("edit-rua").value);
    formData.append("cidade_evento", document.getElementById("edit-cidade").value);
    formData.append("estado_evento", document.getElementById("edit-estado").value);
    formData.append("numero_evento", document.getElementById("edit-numero").value);

    const inputFoto = document.getElementById("edit-foto");
    if (inputFoto.files.length > 0) {
        formData.append("foto_evento", inputFoto.files[0]);
    }

    try {
        const resposta = await fetch(`http://localhost:8080/api/eventos/${id}`, {
            method: "PUT",
            body: formData
        });

        if (resposta.ok) {
            alert("Evento atualizado com sucesso!");
            fecharModalEditar();
            carregarEventos();
        } else {
            const erro = await resposta.text();
            alert("Erro ao atualizar evento: " + erro);
        }
    } catch (error) {
        console.error("Erro ao atualizar:", error);
        alert("Erro na atualização do evento.");
    }
});
