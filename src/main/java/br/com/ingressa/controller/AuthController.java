package br.com.ingressa.controller;

import br.com.ingressa.model.User;
import br.com.ingressa.service.AuthService;
import br.com.ingressa.util.ResponseMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;

    // LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest login) {
        User user = authService.autenticar(login.getEmail(), login.getSenha());
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(401).body(new ResponseMessage("Credenciais inválidas", false));
        }
    }

    // REGISTRO
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User usuario) {
        try {
            User novoUsuario = authService.cadastrarUsuario(usuario);
            return ResponseEntity.ok(new ResponseMessage("Usuário registrado com sucesso!", true));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ResponseMessage("Erro ao registrar: " + e.getMessage(), false));
        }
    }

    // INFORMAÇÕES (opcional, só para testes)
    @GetMapping("/login")
    public ResponseEntity<String> loginInfo() {
        return ResponseEntity.ok("Use POST com email e senha para login.");
    }

    @GetMapping("/register")
    public ResponseEntity<String> registerInfo() {
        return ResponseEntity.ok("Use POST com os dados para registrar.");
    }

    // CLASSE INTERNA PARA LOGIN
    public static class LoginRequest {
        private String email;
        private String senha;

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getSenha() {
            return senha;
        }

        public void setSenha(String senha) {
            this.senha = senha;
        }
    }
}
