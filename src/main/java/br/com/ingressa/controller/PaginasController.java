package br.com.ingressa.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

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

    @GetMapping("/inicio-admin.html")
    public String inicioAdmin() {
        return "inicio-admin.html";
    }

    @GetMapping("/informacoes-evento")
    public String informacoesEvento(@PathVariable("id") Long id) {
        return "informacoes-evento.html";
    }

    @GetMapping("/cadastro-admin.html")
    public String cadastroAdmin() {
        return "cadastro-admin.html";
    }

   @GetMapping("/carrinho.html")
        public String carrinho() {
            return "carrinho.html";
   }

   @GetMapping("/login-admin.html")
    public String loginAdmin() {
        return "login-admin.html";
   }

}
