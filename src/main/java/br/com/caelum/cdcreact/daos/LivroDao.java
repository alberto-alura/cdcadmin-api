package br.com.caelum.cdcreact.daos;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import br.com.caelum.cdcreact.models.Livro;

@Repository
public interface LivroDao extends CrudRepository<Livro, Integer>{

}
