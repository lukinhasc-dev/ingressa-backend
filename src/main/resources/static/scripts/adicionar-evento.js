//Chamar o formulário de Eventos
document.getElementById("eventos").addEventListener("submit", function (event) {
    event.preventDefault();

    //Pegar os dados de cada input do usuário no HTML
    const nomeEvento = document.getElementById("nome_evento").value;
    const horarioEvento = document.getElementById("horario_evento").value;
    const dataEvento = document.getElementById("data_evento").value;
    const precoEvento = parseFloat(document.getElementById("preco_evento").value);
    const descricaoEvento = document.getElementById("descricao_evento").value;
    const ruaEvento = document.getElementById("rua_evento").value;
    const cidadeEvento = document.getElementById("cidade_evento").value;
    const estadoEvento = document.getElementById("estado_evento").value;
    const numeroEvento = parseInt(document.getElementById("numero_evento").value);
    const fotoEvento = document.getElementById("foto_evento").files[0];

    //Criação do formData por conta da foto, o JSON não permite enviar fotos, o formdata sim.
    const formData = new FormData();

    formData.append("nome_evento", nomeEvento);
    formData.append("horario_evento", horarioEvento);
    formData.append("data_evento", dataEvento);
    formData.append("preco_evento", precoEvento);
    formData.append("descricao_evento", descricaoEvento);
    formData.append("rua_evento", ruaEvento);
    formData.append("cidade_evento", cidadeEvento);
    formData.append("estado_evento", estadoEvento);
    formData.append("numero_evento", numeroEvento);
    formData.append("foto_evento", fotoEvento);

    fetch("http://localhost:8080/api/eventos", {
        method: "POST",
        body: formData
    })
        .then(response => {
            console.log(response);
            if (!response.ok) {
                throw new Error("Erro ao cadastrar o evento.");
            }
            return response.text();
        })
        .then(data => {
            console.log("Evento cadastrado com sucesso!"); // log no console
            alert("Evento cadastrado com sucesso!"); // mensagem visível para o usuário
            window.location.reload(); // recarrega a página
        })
        .catch(error => {
            console.error("Erro:", error);
            alert("Falha ao cadastrar o evento: " + error.message);
        })
})

const inputFoto = document.getElementById('foto_evento');
const previewImage = document.getElementById('preview-image');

inputFoto.addEventListener('change', function() {
    const file = this.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            previewImage.src = e.target.result;
            previewImage.style.display = 'block';
        };

        reader.readAsDataURL(file);
    } else {
        previewImage.src = '';
        previewImage.style.display = 'none';
    }
});