import NavLink from './NavLink.js'
import {IndexLink} from '../react/ReactRouter.min.js'

export default React.createClass({
  render() {
    return (
		<div id="layout">
	    	<div id="menu" className="pure-menu">
	    		<a className="pure-menu-heading" href="#">Sistema</a>
	    		<ul role='nav' className="pure-menu-list">
	    			<li className="pure-menu-item"><IndexLink to="/index.html" className="pure-menu-link" activeClassName="active">Home</IndexLink></li>
	    			<li className="pure-menu-item"><NavLink to="/autor">Autor</NavLink></li>
	    			<li className="pure-menu-item"><NavLink to="/livro">Livro</NavLink></li>
				</ul>
				{this.props.children}
			</div>
			{this.props.conteudo}
		</div>
    )
  }
})
