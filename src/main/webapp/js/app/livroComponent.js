import {CustomInputText} from "./CustomInputText.js"
import {CustomSubmit} from "./CustomSubmit.js"
import {ErrorHandler} from "./ErrorHandler.js"

class LivroForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {titulo: '', preco: '', autorId: ''};
		this.setTitulo = this.setTitulo.bind(this);
		this.setPreco = this.setPreco.bind(this);
		this.setAutorId = this.setAutorId.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleLivroSubmit = this.handleLivroSubmit.bind(this);
	}
	
	setTitulo(e) {
		this.setState({titulo: e.target.value});
	}

	setPreco(e) {
		this.setState({preco: e.target.value});
	}

	setAutorId(e) {
		this.setState({autorId: e.target.value});
	}
	
	handleSubmit(livro) {
		$.ajax({
			url: this.props.url,
			contentType: 'application/json',
			dataType: 'json',
			type: 'POST',
			data: JSON.stringify(livro),
			success: function(data) {
				PubSub.publish( 'update-livro-list', data );
				PubSub.publish( 'clear-error', {});
			}.bind(this),
			error: function(response){
				if(response.status == 400){
					var errorHandler = ErrorHandler(JSON.parse(response.responseText));
					errorHandler.publishErrors();						
				}
			}
		});  
	}
	
	handleLivroSubmit(e) {
		e.preventDefault();
		var titulo = this.state.titulo.trim();
		var preco = this.state.preco.trim();
		var autorId = this.state.autorId;
		this.handleSubmit({titulo: titulo, preco: preco, autorId: autorId});
		this.setState({titulo: '', preco: '', autorId: ''});
	}
	
	render() {
		var autores = this.props.autores.map(function(autor){
			return <option key={autor.id} value={autor.id}>{autor.nome}</option>;
		});
		return (
			<div className="autorForm">
				<form className="pure-form pure-form-aligned" onSubmit={this.handleLivroSubmit}>
					<CustomInputText id="titulo" name="titulo" label="Titulo: " type="text" value={this.state.titulo} placeholder="Titulo do livro" onChangeFunction={this.setTitulo} />
					<CustomInputText id="preco" name="preco" label="Preco: " type="decimal" value={this.state.preco} placeholder="Preço do livro" onChangeFunction={this.setPreco} />
					<div className="pure-controls">
						<select value={this.state.autorId} name="autorId" onChange={this.setAutorId}>
							<option value="">Selecione</option>
							{autores}
						</select>
					</div>
					<CustomSubmit label="Enviar" />
				</form>			        
			</div>
		);
	}
} 

class LivroTable extends React.Component {
	
	render() {
		var livros = this.props.lista.map(function(livro){
			return(
					<tr key={livro.id}>
						<td>{livro.titulo}</td>
						<td>{livro.autor.nome}</td>
						<td>{livro.preco}</td>
					</tr>
				);
			});
		return(
			<table className="pure-table">
				<thead>
					<tr>
						<th>Titulo</th>
						<th>Autor</th>
						<th>Preco</th>
					</tr>
				</thead>
				<tbody>
					{livros}
				</tbody>
			</table>
		);
	}
}

export class LivroBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {lista : [],autores:[]};
	}

	componentDidMount() {
		$.ajax({
			url: "/api/livros",
			dataType: 'json',
			success: function(data) {
				this.setState({lista: data});
			}.bind(this)
		});
		
		$.ajax({
			url: "/api/autor",
			dataType: 'json',
			success: function(data) {
				this.setState({autores: data});
			}.bind(this)
		});
	}
	
	componentWillMount() {
		var react = this;
		PubSub.subscribe('update-livro-list', function(topicName,data){
			react.setState({lista:data});
		});
	}

	render() {
		return(
			<div id="main">
				<div className="header">
					<h1>Cadastro de Livros</h1>
				</div>
				<div className="content" id="content">
					<LivroForm url="http://localhost:8080/api/livros" autores={this.state.autores}/>
					<LivroTable lista={this.state.lista}/>
				</div>
			</div>
		);
	}
} 
