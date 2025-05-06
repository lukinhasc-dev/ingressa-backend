package br.com.ingressa.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PaginasController {

    @GetMapping("/inicio.html")
    public String inicio() {
        return "inicio.html";
    }

    @GetMapping("/adicionar-evento.html")
    public String adicionarEvento() {
        return "adicionar-evento.html";
    }

    @GetMapping("/perfil.html")
    public String perfil() {
        return "perfil.html";
    }

    @GetMapping("/cadastro.html")
    public String cadastro() {
        return "cadastro.html";
    }

    @GetMapping("/login.html")
    public String login() {
        return "login.html";
    }

    @GetMapping("/informacoes-evento.html")
    public String informacoesEvento() {
        return "informacoes-evento.html";
    }
}
