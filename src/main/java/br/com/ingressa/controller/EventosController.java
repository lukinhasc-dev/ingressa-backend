package br.com.ingressa.controller;


import br.com.ingressa.model.Eventos;
import br.com.ingressa.repository.EventosRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.nio.file.Path;
import java.time.LocalTime;

@RestController
@RequestMapping("/api/eventos")
public class EventosController {

    private final EventosRepository eventosRepository;

    public EventosController(EventosRepository eventosRepository) {
        this.eventosRepository = eventosRepository;
    }

    @PostMapping
    public ResponseEntity<String> criarEvento(
            @RequestParam("nome_evento") String nomeEvento,
            @RequestParam("horario_evento") String horarioEvento,
            @RequestParam("data_evento") String dataEvento,
            @RequestParam("preco_evento") Double precoEvento,
            @RequestParam("descricao_evento") String descricaoEvento,
            @RequestParam("rua_evento") String ruaEvento,
            @RequestParam("cidade_evento") String cidadeEvento,
            @RequestParam("estado_evento") String estadoEvento,
            @RequestParam("numero_evento") Integer numeroEvento,
            @RequestParam("foto_evento") MultipartFile fotoEvento
    ) throws IOException {
        Eventos eventos = new Eventos();
        eventos.setNome_evento(nomeEvento);
        eventos.setHorario_evento(LocalTime.parse(horarioEvento));
        eventos.setData_evento(LocalDate.parse(dataEvento));
        eventos.setPreco_evento(BigDecimal.valueOf(precoEvento));
        eventos.setDescricao_evento(descricaoEvento);
        eventos.setRua_evento(ruaEvento);
        eventos.setCidade_evento(cidadeEvento);
        eventos.setEstado_evento(estadoEvento);
        eventos.setNumero_evento(numeroEvento);

        if (fotoEvento != null && !fotoEvento.isEmpty()) {
            // Salvar o arquivo em disco, caso queira
            Path caminhoFoto = Path.of("uploads/" + fotoEvento.getOriginalFilename());
            Files.createDirectories(caminhoFoto.getParent()); // Cria a pasta se não existir
            Files.copy(fotoEvento.getInputStream(), caminhoFoto, StandardCopyOption.REPLACE_EXISTING);
            eventos.setFoto_evento(fotoEvento.getBytes()); // Salva apenas o nome do arquivo no banco
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Nenhuma foto enviada.");
        }

        eventosRepository.save(eventos);
        return ResponseEntity.status(HttpStatus.CREATED).body("Evento criado com sucesso!");
    }
}






