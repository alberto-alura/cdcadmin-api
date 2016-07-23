package br.com.caelum.cdcreact.daos;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import br.com.caelum.cdcreact.models.Autor;

@Repository
public interface AutorDao extends CrudRepository<Autor, Integer>{

}
