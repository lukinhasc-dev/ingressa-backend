package br.com.ingressa.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Entity
@Getter
@Setter

@Table(name = "admin")
public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = true, name = "cpf_admin", columnDefinition = "varchar(255)")
    private String cpf;

    @Column(nullable = true, name = "cnpj_admin", columnDefinition = "varchar(255)")
    private String cnpj;

    @Column(nullable = true, name = "nome_admin", columnDefinition = "varchar(255)")
    private String nome;

    @Column(nullable = true, name = "email_admin", columnDefinition = "varchar(255)")
    private String email;

    @Column(nullable = true, name = "senha_admin", columnDefinition = "varchar(255)")
    private String senha;

    @Column(nullable = true, name = "telefone_admin", columnDefinition = "varchar(255)")
    private String telefone;
}