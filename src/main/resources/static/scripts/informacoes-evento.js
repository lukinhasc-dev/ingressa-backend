document.addEventListener("DOMContentLoaded", function () {
  function getIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
  }

  function getDiaSemana(dataString) {
    const dias = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    const data = new Date(dataString);
    return dias[data.getDay()];
  }

  function formatarDataPorExtenso(dataString) {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR');
  }

  async function carregarEvento() {
    const id = getIdFromUrl();

    if (!id) {
      alert('Evento não encontrado!');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/eventos/${id}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar os dados do evento');
      }

      // TENTANDO pegar como texto (caso backend não mande content-type JSON)
      const texto = await response.text();
      let evento;

      try {
        evento = JSON.parse(texto);  // tenta converter o texto para JSON
      } catch (e) {
        console.error('Não foi possível parsear a resposta como JSON:', e);
        console.log('Resposta recebida:', texto);
        throw new Error('Resposta não é JSON válido');
      }

      console.log(evento);

      document.querySelector('.tittle-text-events h1').textContent = evento.nome_evento;
      document.querySelector('.tittle-text-events p').textContent = evento.descricao_evento;
      document.querySelectorAll('.text-info')[0].textContent = formatarDataPorExtenso(evento.data_evento);
      document.querySelectorAll('.text-info')[1].textContent = getDiaSemana(evento.data_evento);
      document.querySelectorAll('.text-info')[2].textContent = evento.rua_evento;
      document.querySelectorAll('.text-info')[3].textContent = evento.horario_evento;
      document.querySelector('.ingresso-valor').textContent = `R$ ${parseFloat(evento.preco_evento).toFixed(2).replace('.', ',')}`;
      document.querySelector('#foto-banner img').src = evento.foto_evento;

    } catch (error) {
      console.error(error);
      alert('Não foi possível carregar os dados do evento.');
    }
  }

  carregarEvento();
});

let eventoSelecionado = null;

async function carregarEvento() {
  const id = getIdFromUrl();

  if (!id) {
    alert('Evento não encontrado!');
    return;
  }

  try {
    const response = await fetch(`http://localhost:8080/api/eventos/${id}`);
    if (!response.ok) {
      throw new Error('Erro ao buscar os dados do evento');
    }

    const texto = await response.text();
    let evento;

    try {
      evento = JSON.parse(texto);
    } catch (e) {
      console.error('Não foi possível parsear a resposta como JSON:', e);
      console.log('Resposta recebida:', texto);
      throw new Error('Resposta não é JSON válido');
    }

    eventoSelecionado = evento; // Salva o evento para usar no botão depois

    document.querySelector('.tittle-text-events h1').textContent = evento.nome_evento;
    document.querySelector('.tittle-text-events p').textContent = evento.descricao_evento;
    document.querySelectorAll('.text-info')[0].textContent = formatarDataPorExtenso(evento.data_evento);
    document.querySelectorAll('.text-info')[1].textContent = getDiaSemana(evento.data_evento);
    document.querySelectorAll('.text-info')[2].textContent = evento.local_evento;
    document.querySelectorAll('.text-info')[3].textContent = evento.horario_evento;
    document.querySelector('.ingresso-valor').textContent = `R$ ${parseFloat(evento.valor_ingresso).toFixed(2).replace('.', ',')}`;
    document.querySelector('#foto-banner img').src = evento.foto_evento;

  } catch (error) {
    console.error(error);
    alert('Não foi possível carregar os dados do evento.');
  }
}

document.querySelector('#btn-adicionar-carrinho').addEventListener('click', () => {
  if (!eventoSelecionado) {
    alert('Evento ainda não carregado.');
    return;
  }

  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

  // Verifica se já está no carrinho
  const jaExiste = carrinho.find(e => e.id_evento === eventoSelecionado.id_evento);
  if (!jaExiste) {
    carrinho.push(eventoSelecionado);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
  }

  // Redireciona para a página do carrinho
  window.location.href = 'carrinho.html';
});

carregarEvento();
