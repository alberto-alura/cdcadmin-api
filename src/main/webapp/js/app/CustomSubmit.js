export class CustomSubmit extends React.Component {
	render() {
		return (
			<div className="pure-controls">
				<input type="submit" className="pure-button pure-button-primary" value={this.props.label} />
			</div>
		); 
	}
}