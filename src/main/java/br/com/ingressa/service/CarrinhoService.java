package br.com.ingressa.service;

import br.com.ingressa.model.Carrinho;
import br.com.ingressa.model.Eventos;
import br.com.ingressa.model.User;
import br.com.ingressa.repository.CarrinhoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarrinhoService {

    @Autowired
    private CarrinhoRepository carrinhoRepository;

    public Carrinho adicionarNoCarrinho(User usuario, Eventos eventos, int quantidade) {
        Carrinho carrinho = new Carrinho();
        carrinho.setUsuario(usuario);
        carrinho.setEventos(eventos);
        carrinho.setQuantidade(quantidade);
        return carrinhoRepository.save(carrinho);
    }

    public List<Carrinho> listarCarrinho(User usuario) {
        return carrinhoRepository.findAll();
    }
}
