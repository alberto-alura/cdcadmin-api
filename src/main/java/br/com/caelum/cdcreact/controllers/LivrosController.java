package br.com.caelum.cdcreact.controllers;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import br.com.caelum.cdcreact.controllers.forms.LivroForm;
import br.com.caelum.cdcreact.daos.AutorDao;
import br.com.caelum.cdcreact.daos.LivroDao;
import br.com.caelum.cdcreact.models.Livro;


@RestController
@RequestMapping("/api/livros")
public class LivrosController {
	
	@Autowired
	private LivroDao livroDao;
	@Autowired
	private AutorDao autorDao;

	@RequestMapping(consumes=MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<?> salva(@Valid @RequestBody LivroForm livroForm) {
		livroDao.save(livroForm.build(autorDao));
		
		return ResponseEntity.status(302).header("Location", "/api/livros").build();
	}

	@RequestMapping(method = RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	public Iterable<Livro> lista() {
		return livroDao.findAll();
	}	
}
