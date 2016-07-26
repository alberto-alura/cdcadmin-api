var CustomSubmit = React.createClass({
	render: function() {
		return (
			<div className="pure-controls">
				<input type="submit" className="pure-button pure-button-primary" value={this.props.label} />
			</div>
		);
	}
});

var CustomInputText = React.createClass({
	render: function() {
    	return (
			<div className="pure-control-group">
				<label htmlFor={this.props.id}>{this.props.label}</label> 
				<input id={this.props.id} type={this.props.type} name={this.props.name}
					value={this.props.value} placeholder={this.props.placeholder} onChange={this.props.onChangeFunction} />
			</div>
		);
	}		
});

var AutorForm = React.createClass({
	getInitialState: function() {
		return {nome: '', email: '', senha: ''};
	},

	handleNomeChange: function(e) {
		this.setState({nome: e.target.value});
	},

	handleEmailChange: function(e) {
		this.setState({email: e.target.value});
	},

	handleSenhaChange: function(e) {
		this.setState({senha: e.target.value});
	},
	
	handleAutorSubmit: function(autor){
		$.ajax({
				url: this.props.url,
				contentType: 'application/json',
				dataType: 'json',
				type: 'POST',
				data: JSON.stringify(autor),
				success: function(data) {
					PubSub.publish( 'update-autor-list', data );
				}.bind(this)
		});  
	},
	handleSubmit: function(e) {
		e.preventDefault();
	    var nome = this.state.nome.trim();
	    var email = this.state.email.trim();
		var senha = this.state.senha.trim();
		
	    this.handleAutorSubmit({nome: nome, email: email, senha: senha});
	    this.setState({nome: '', email: '', senha: ''});
	},
	render: function() {
    return (
      <div className="autorForm">
			<form className="pure-form pure-form-aligned" onSubmit={this.handleSubmit}>
				<CustomInputText id="nome" name="nome" label="Nome: " type="text" value={this.state.nome} placeholder="Nome do Autor" onChangeFunction={this.handleNomeChange} />
				<CustomInputText id="email" name="email" label="Email: " type="text" value={this.state.email} placeholder="Email do Autor" onChangeFunction={this.handleEmailChange} />
				<CustomInputText id="senha" name="senha" label="Senha: " type="password" value={this.state.senha} placeholder="Senha do Autor" onChangeFunction={this.handleSenhaChange}/>
				<CustomSubmit label="Enviar" />
			</form>			        
      </div>
    );
  }
});


var AutorTable = React.createClass({
	render: function(){
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
});

var AutorBox = React.createClass({
	getInitialState : function(){
		return {lista : []};
	},
	componentDidMount: function() {
		$.ajax({
	      	url: this.props.url,
		  	dataType: 'json',
		  	success: function(data) {
		  		this.setState({lista: data});
		  	}.bind(this)
		});
	},
	
	componentWillMount: function() {
		var react = this;
		PubSub.subscribe( 'update-autor-list', function(topicName,data){
			react.setState({lista:data});
		});
	},
	
	
	render: function(){
	return(
		<div>
			<AutorForm url="http://localhost:8080/api/autor"/>
			<AutorTable lista={this.state.lista}/>
		</div>
	);
	}
});


ReactDOM.render(
  <AutorBox  url="http://localhost:8080/api/autor"/>,
  document.getElementById('content')
);
