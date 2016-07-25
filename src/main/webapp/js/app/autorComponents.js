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

//var Autor = React.createClass({
//  	render: function() {
//  		return (
//  			<div className="comment">
//  			<h2 className="commentAuthor">
//  				{this.props.author}
//            </h2>
//        <span dangerouslySetInnerHTML={this.rawMarkup()} />
//      </div>
//    );
//  }
//});

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
				this.setState({data: data});
				}.bind(this),
				error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
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
	return(
			<table className="pure-table">
			<thead>
				<tr>
					<th>#</th>
					<th>Make</th>
					<th>Model</th>
					<th>Year</th>
				</tr>
			</thead>

			<tbody>
				<tr>
					<td>1</td>
					<td>Honda</td>
					<td>Accord</td>
					<td>2009</td>
				</tr>

				<tr>
					<td>2</td>
					<td>Toyota</td>
					<td>Camry</td>
					<td>2012</td>
				</tr>

				<tr>
					<td>3</td>
					<td>Hyundai</td>
					<td>Elantra</td>
					<td>2010</td>
				</tr>
			</tbody>
		</table>
	);
	}
});

var AutorBox = React.createClass({
	render: function(){
	return(
		<div>
			<AutorForm url="http://localhost:8080/api/autor"/>
			<AutorTable url="http://localhost:8080/api/autor"/>
		</div>
	);
	}
});


ReactDOM.render(
  <AutorBox/>,
  document.getElementById('content')
);
