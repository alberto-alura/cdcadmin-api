package br.com.caelum.cdcreact.controllers.forms;

import java.math.BigDecimal;

import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotBlank;

import br.com.caelum.cdcreact.daos.AutorDao;
import br.com.caelum.cdcreact.models.Livro;

public class LivroForm {

	@NotBlank
	private String titulo;
	@NotNull
	private BigDecimal preco;
	@NotNull
	private Integer autorId;
	
	public String getTitulo() {
		return titulo;
	}
	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}
	public BigDecimal getPreco() {
		return preco;
	}
	public void setPreco(BigDecimal preco) {
		this.preco = preco;
	}
	public Integer getAutorId() {
		return autorId;
	}
	public void setAutorId(Integer autorId) {
		this.autorId = autorId;
	}
	
	public Livro build(AutorDao autorDao){
		return new Livro(titulo, preco, autorDao.findOne(autorId));
	}
	
}
