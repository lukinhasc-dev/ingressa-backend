package br.com.ingressa.controller;

import br.com.ingressa.model.Admin;
import br.com.ingressa.service.AdminService;
import br.com.ingressa.util.ResponseMessage;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AdminRequest adminRequest) {
        Admin admin = adminService.autenticar(adminRequest.getCpf_admin(), adminRequest.getSenha_admin());

        if (admin != null) {
            return ResponseEntity.ok(admin);
        } else {
            return ResponseEntity.status(401).body(new ResponseMessage("Credenciais inválidas", false));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Admin admin) {
        try {
            Admin novoAdmin = adminService.cadastrarAdmin(admin);
            return ResponseEntity.ok(new ResponseMessage("Administrador cadastrado com sucesso!", true));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ResponseMessage("Erro ao cadastrar administrador", false));
        }
    }

    @GetMapping("/login")
    public ResponseEntity<String> loginInfo() {
        return ResponseEntity.ok("Use POST com CPF e senha para login.");
    }

    @GetMapping("/register")
    public ResponseEntity<String> registerInfo() {
        return ResponseEntity.ok("Use POST com os dados do admin para registrar.");
    }

    @Getter
    @Setter
    public static class AdminRequest {
        private String cpf_admin;
        private String senha_admin;
    }
}
