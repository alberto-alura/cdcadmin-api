export class CustomInputText extends React.Component {
	constructor(props) {
		super(props);
		this.state = {errorMsg: ''};
	} 
	
	render() {
		return (
			<div className="pure-control-group">
				<label htmlFor={this.props.id}>{this.props.label}</label> 
				<input id={this.props.id} type={this.props.type} name={this.props.name}
					value={this.props.value} placeholder={this.props.placeholder} onChange={this.props.onChangeFunction} />
				<span className="validation error" id={"error-"+this.props.name}>{this.state.errorMsg}</span>
			</div>
		);
	}
	
	componentWillMount() {
		PubSub.subscribe('validation-errors-'+this.props.name, function(topicName,msg){			
			this.setState({errorMsg:msg});
		}.bind(this));
		
		PubSub.subscribe("clear-error", function(topicName,msg){			
			this.setState({errorMsg:""});
		}.bind(this));
	}
}