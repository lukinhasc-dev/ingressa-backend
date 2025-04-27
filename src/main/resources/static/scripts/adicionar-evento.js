const eventosSalvos = JSON.parse(localStorage.getItem('eventos')) || [];
const eventosCadastro = document.getElementById('events-forms');


if (eventosCadastro) {
    eventosCadastro.addEventListener('submit', function (e) {
        e.preventDefault();

        const nome = document.getElementById('nome');
        const horario = document.getElementById('horario');
        const data = document.getElementById('data');
        const preco = document.getElementById('preco');
        const descricao = document.getElementById('descricao');
        const endereco = document.getElementById('endereco');
        const cidade = document.getElementById('cidade');
        const estado =  document.getElementById('estado');
        const numero =  document.getElementById('numero');
        const foto =  document.getElementById('foto');

if (!nome  || !horario || !data || !preco || !descricao || !endereco || !cidade || !estado || !numero || !foto) {
    alert("Por favor, preencha todos os campos.");
}

const evento = {
    nome: nome,
    horario: horario,
    data: data,
    preco: preco,
    descricao: descricao,
    endereco: endereco,
    cidade: cidade,
    estado: estado,
    numero: numero,
    foto: foto,
    tipo: 'admin'
};

















    })
}
