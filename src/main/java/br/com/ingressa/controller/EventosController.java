package br.com.ingressa.controller;


import br.com.ingressa.model.Eventos;
import br.com.ingressa.repository.EventosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.nio.file.Path;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/eventos")
public class EventosController {

    @Autowired
    private final EventosRepository eventosRepository;

    @GetMapping
    public List<Eventos> listarEventos(){
        return eventosRepository.findAll();
    }

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
            String nomeArquivoOriginal = Paths.get(fotoEvento.getOriginalFilename()).getFileName().toString();

            if (!nomeArquivoOriginal.toLowerCase().matches(".*\\.(png|jpg|jpeg|gif)$")) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Formato de imagem inválido.");
            }

            String extensao = nomeArquivoOriginal.substring(nomeArquivoOriginal.lastIndexOf("."));
            String novoNomeArquivo = UUID.randomUUID().toString() + extensao;
            Path caminhoFoto = Path.of("uploads", novoNomeArquivo);

            try {
                Files.createDirectories(caminhoFoto.getParent());
                Files.copy(fotoEvento.getInputStream(), caminhoFoto, StandardCopyOption.REPLACE_EXISTING);
            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao salvar a foto.");
            }

            eventos.setFoto_evento("/uploads/" + novoNomeArquivo);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Nenhuma foto enviada.");
        }


        eventosRepository.save(eventos);
        return ResponseEntity.status(HttpStatus.CREATED).body("Evento criado com sucesso!");
    }

    @GetMapping("/informacoes-evento/{id}")
    public ResponseEntity<Eventos> buscarPorId(@PathVariable Long id) {
        return eventosRepository.findById(id)
                .map(evento -> ResponseEntity.ok(evento))
                .orElse(ResponseEntity.notFound().build());
    }



}