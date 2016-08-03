import {CustomInputText} from "./CustomInputText.js"
import {CustomSubmit} from "./CustomSubmit.js"
import {ErrorHandler} from "./ErrorHandler.js"

class AutorForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {nome: '', email: '', senha: ''};
		this.setNome = this.setNome.bind(this);
		this.setEmail = this.setEmail.bind(this);
		this.setSenha = this.setSenha.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	setNome(e) {
		this.setState({nome: e.target.value});
	}

	setEmail(e) {
		this.setState({email: e.target.value});
	}

	setSenha(e) {
		this.setState({senha: e.target.value});
	}
	
	handleAutorSubmit(autor) {
		$.ajax({
			url: this.props.url,
			contentType: 'application/json',
			dataType: 'json',
			type: 'POST',
			data: JSON.stringify(autor),
			success: function(data) {
				PubSub.publish( 'update-autor-list', data );
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
	
	handleSubmit(e) {
		e.preventDefault();
		var nome = this.state.nome.trim();
		var email = this.state.email.trim();
		var senha = this.state.senha.trim();
		
		this.handleAutorSubmit({nome: nome, email: email, senha: senha});
		this.setState({nome: '', email: '', senha: ''});
	}
	
	render() {
		return (
			<div className="autorForm">
				<form className="pure-form pure-form-aligned" onSubmit={this.handleSubmit}>
					<CustomInputText id="nome" name="nome" label="Nome: " type="text" value={this.state.nome} placeholder="Nome do Autor" onChangeFunction={this.setNome} />
					<CustomInputText id="email" name="email" label="Email: " type="text" value={this.state.email} placeholder="Email do Autor" onChangeFunction={this.setEmail} />
					<CustomInputText id="senha" name="senha" label="Senha: " type="password" value={this.state.senha} placeholder="Senha do Autor" onChangeFunction={this.setSenha}/>
					<CustomSubmit label="Enviar" />
				</form>			        
			</div>
		);
	}
} 

class AutorTable extends React.Component {
	
	render() {
		var autorNodes = this.props.lista.map(function(autor){
			return(
				<tr key={autor.nome}>
					<td>{autor.nome}</td>
					<td>{autor.email}</td>
				</tr>
			);
		}); 
		return(
			<table className="pure-table">
				<thead>
					<tr>
						<th>Nome</th>
						<th>email</th>
					</tr>
				</thead>
				<tbody>
					{autorNodes}
				</tbody>
			</table>
		);
	}
}

export class AutorBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {lista : []};
	}

	componentDidMount() {
		$.ajax({
			url: "/api/autor",
			dataType: 'json',
			success: function(data) {
				this.setState({lista: data});
			}.bind(this)
		});
	}
	
	componentWillMount() {
		var react = this;
		PubSub.subscribe('update-autor-list', function(topicName,data){
			react.setState({lista:data});
		});
	}

	render() {
		return(
			<div id="main">
				<div className="header">
					<h1>Cadastro de Autores</h1>
				</div>
				<div className="content" id="content">
					<AutorForm url="http://localhost:8080/api/autor"/>
					<AutorTable lista={this.state.lista}/>
				</div>
			</div>
		);
	}
} 
