package br.com.caelum.cdcreact.controllers;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import br.com.caelum.cdcreact.controllers.forms.AutorForm;
import br.com.caelum.cdcreact.daos.AutorDao;
import br.com.caelum.cdcreact.models.Autor;

@RestController
@RequestMapping("/api/autores")
@CrossOrigin
public class AutorController {
	
	@Autowired
	private AutorDao autorDao;

	@RequestMapping(consumes=MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public Iterable<Autor> salva(@Valid @RequestBody AutorForm autorForm) {		
		autorDao.save(autorForm.build());
		//forçando o retorno ser a lista só para não ficar preso no lance dos redirect e cors do navegador
		return lista();
	}

	@RequestMapping(method = RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	public Iterable<Autor> lista() {
		return autorDao.findAll();
	}
	
}
