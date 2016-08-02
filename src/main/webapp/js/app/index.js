import App from './App.js'
import {Router, Route, browserHistory, IndexRoute} from '../react/ReactRouter.min.js'
import {AutorBox} from './autorComponent.js'
import {LivroBox} from './livroComponent.js'

console.log(AutorBox);
ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/index.html" component={App}>
      <Route path="/autor" component={AutorBox}/>
      <Route path="/livro" component={LivroBox}/>
    </Route>
  </Router>
), document.getElementById('content'));
