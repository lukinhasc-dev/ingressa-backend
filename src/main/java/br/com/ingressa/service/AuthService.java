package br.com.ingressa.service;

import br.com.ingressa.model.User;
import br.com.ingressa.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    public User autenticar(String email, String senha) {
        Optional<User> user = userRepository.findByEmail(email);

        if (user.isPresent() && user.get().getSenha().equals(senha)) {
            return user.get();
        }
        return null;
    }

    // Método para registrar um novo usuário
    public User cadastrarUsuario(User usuario) {
        if (userRepository.findByEmail(usuario.getEmail()).isPresent()) {
            throw new RuntimeException("Email já cadastrado");
        }
        return userRepository.save(usuario);
    }
}
