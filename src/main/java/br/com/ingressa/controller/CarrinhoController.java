package br.com.ingressa.controller;

import br.com.ingressa.model.Carrinho;
import br.com.ingressa.model.Eventos;
import br.com.ingressa.model.User;
import br.com.ingressa.service.CarrinhoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/carrinho")
public class CarrinhoController {

    @Autowired
    private CarrinhoService carrinhoService;

    @PostMapping("/adicionar")
    public Carrinho adicionarNoCarrinho(@RequestBody Carrinho carrinho){
        User usuario = new User();
        Eventos  eventos = new Eventos();

        return  carrinhoService.adicionarNoCarrinho(usuario, eventos, carrinho.getQuantidade());
    }

    @GetMapping("/listar")
    public List<Carrinho> listarCarrinho(@RequestParam Long usuarioId) {
        User usuario = new User(); // Aqui você vai recuperar o usuário pelo ID
        return carrinhoService.listarCarrinho(usuario);
    }
}
