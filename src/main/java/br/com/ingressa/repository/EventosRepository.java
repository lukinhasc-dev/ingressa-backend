package br.com.ingressa.repository;

import br.com.ingressa.model.Eventos; //Importando o BD no caso entidade
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventosRepository extends JpaRepository<Eventos,Long> {
}
