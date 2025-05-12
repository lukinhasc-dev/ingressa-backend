package br.com.ingressa.service;

import br.com.ingressa.model.Admin;
import br.com.ingressa.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service // Anotação boa prática para indicar que é um serviço do Spring
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    public Admin autenticar(String cpf, String senha) {
        Optional<Admin> adminOptional = adminRepository.findByCpf(cpf);

        if (adminOptional.isPresent()) {
            Admin admin = adminOptional.get();
            if (admin.getSenha().equals(senha)) {
                return admin;
            }
        }
        return null; // Ou lance uma exceção personalizada, ex: throw new AuthException("Credenciais inválidas");
    }

    public Admin cadastrarAdmin(Admin admin) {
        Optional<Admin> existente = adminRepository.findByCpf(admin.getCpf());
        if (existente.isPresent()) {
            throw new RuntimeException("CPF já cadastrado");
        }
        return adminRepository.save(admin);
    }
}

