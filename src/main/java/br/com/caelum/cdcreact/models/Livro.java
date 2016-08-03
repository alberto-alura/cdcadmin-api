package br.com.caelum.cdcreact.models;

import java.math.BigDecimal;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotBlank;

@Entity
public class Livro {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	@NotBlank
	private String titulo;
	@NotNull
	private BigDecimal preco;
	@ManyToOne
	@NotNull
	private Autor autor;
	
	
	/**
	 * @deprecated
	 */
	public Livro() {

	}
	
	public Livro(String titulo, BigDecimal preco, Autor autor) {
		super();
		this.titulo = titulo;
		this.preco = preco;
		this.autor = autor;
	}

	public String getTitulo() {
		return titulo;
	}
	
	public BigDecimal getPreco() {
		return preco;
	}
	
	public Autor getAutor() {
		return autor;
	}
	
	public Integer getId() {
		return id;
	}
	
}
