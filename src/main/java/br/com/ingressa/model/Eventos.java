package br.com.ingressa.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@Entity(name = "eventos")
public class Eventos {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = true, length = 30, name = "nome_evento")
    private String nome_evento;

    @Column(nullable = true, name = "horario_evento", columnDefinition = "time")
    private LocalTime horario_evento;

    @Column(nullable = true, name = "data_evento", columnDefinition = "date")
    private LocalDate data_evento;

    @Column(nullable = true, name = "preco_evento", columnDefinition = "decimal(10,2)")
    private BigDecimal preco_evento;

    @Column(nullable = true, name = "descricao_evento", columnDefinition = "varchar(255)")
    private String descricao_evento;

    @Column(nullable = true, name = "rua_evento", columnDefinition = "varchar(255)")
    private String rua_evento;

    @Column(nullable = true, name = "cidade_evento", columnDefinition = "varchar(255)")
    private String cidade_evento;

    @Column(nullable = true, name = "estado_evento", columnDefinition = "varchar(2)")
    private String estado_evento;

    @Column(nullable = true, name = "numero_evento", columnDefinition = "int")
    private int numero_evento;

    @Column(nullable = true, name = "foto_evento", columnDefinition = "longblob")
    private byte[] foto_evento;
}



