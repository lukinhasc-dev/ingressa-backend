package br.com.ingressa.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "eventos") // Nome da tabela no banco de dados
public class Eventos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idEventos; // Chave primária do evento

    @Column(name = "nome_evento", length = 30, nullable = false)
    private String nomeEvento;

    @Column(name = "horario_evento")
    private LocalTime horarioEvento;

    @Column(name = "data_evento")
    private LocalDate dataEvento;

    @Column(name = "preco_evento", precision = 10, scale = 2)
    private Double precoEvento;

    @Column(name = "descricao_evento", length = 295)
    private String descricaoEvento;

    @Column(name = "rua_evento", length = 255)
    private String ruaEvento;

    @Column(name = "cidade_evento", length = 100)
    private String cidadeEvento;

    @Column(name = "estado_evento", length = 2)
    private String estadoEvento;

    @Column(name = "numerolocal_evento")
    private Integer numeroLocalEvento;

    @Column(name = "foto_evento")
    private byte[] fotoEvento;

    @Column(name = "tipo", length = 255)
    private String tipo;

    // Getters and Setters
    public Long getIdEventos() {
        return idEventos;
    }

    public void setIdEventos(Long idEventos) {
        this.idEventos = idEventos;
    }

    public String getNomeEvento() {
        return nomeEvento;
    }

    public void setNomeEvento(String nomeEvento) {
        this.nomeEvento = nomeEvento;
    }

    public LocalTime getHorarioEvento() {
        return horarioEvento;
    }

    public void setHorarioEvento(LocalTime horarioEvento) {
        this.horarioEvento = horarioEvento;
    }

    public LocalDate getDataEvento() {
        return dataEvento;
    }

    public void setDataEvento(LocalDate dataEvento) {
        this.dataEvento = dataEvento;
    }

    public Double getPrecoEvento() {
        return precoEvento;
    }

    public void setPrecoEvento(Double precoEvento) {
        this.precoEvento = precoEvento;
    }

    public String getDescricaoEvento() {
        return descricaoEvento;
    }

    public void setDescricaoEvento(String descricaoEvento) {
        this.descricaoEvento = descricaoEvento;
    }

    public String getRuaEvento() {
        return ruaEvento;
    }

    public void setRuaEvento(String ruaEvento) {
        this.ruaEvento = ruaEvento;
    }

    public String getCidadeEvento() {
        return cidadeEvento;
    }

    public void setCidadeEvento(String cidadeEvento) {
        this.cidadeEvento = cidadeEvento;
    }

    public String getEstadoEvento() {
        return estadoEvento;
    }

    public void setEstadoEvento(String estadoEvento) {
        this.estadoEvento = estadoEvento;
    }

    public Integer getNumeroLocalEvento() {
        return numeroLocalEvento;
    }

    public void setNumeroLocalEvento(Integer numeroLocalEvento) {
        this.numeroLocalEvento = numeroLocalEvento;
    }

    public byte[] getFotoEvento() {
        return fotoEvento;
    }

    public void setFotoEvento(byte[] fotoEvento) {
        this.fotoEvento = fotoEvento;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }
}
