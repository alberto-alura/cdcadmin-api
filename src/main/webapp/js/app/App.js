import NavLink from './NavLink.js'
import {IndexLink} from '../react/ReactRouter.min.js'

export default React.createClass({
  render() {
    return (

    	<div>
    		<h1>React Router Tutorial!</h1>
    		<ul role='nav'>
    			<li><IndexLink to="/index.html" activeClassName="active">Home</IndexLink></li>
    			<li><NavLink to="/autor">Autor</NavLink></li>
    			<li><NavLink to="/livro">Livro</NavLink></li>
			</ul>
			{this.props.children}
    	</div>
    )
  }
})
