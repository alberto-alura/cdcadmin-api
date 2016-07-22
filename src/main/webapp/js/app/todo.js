			var data = [
  				{id: 1, author: "Pete Hunt", text: "This is one comment"},
  				{id: 2, author: "Jordan Walke", text: "This is *another* comment"}
			];
					
			var Comment = React.createClass({
				rawMarkup: function() {
			    	var md = new Remarkable();
			    	var rawMarkup = md.render(this.props.children.toString());
			    	return { __html: rawMarkup };
			  	},    			  
			  render: function() {
				var md = new Remarkable();
			    return (
			      <div className="comment">
			        <h2 className="commentAuthor">
			          {this.props.author}
			        </h2>
			        <span dangerouslySetInnerHTML={this.rawMarkup()} />
			      </div>
			    );
			  }
			});    

			var CommentList = React.createClass({
			  render: function() {
				    var commentNodes = this.props.data.map(function(comment) {
				      return (
				        <Comment author={comment.author} key={comment.id}>
				          {comment.text}
				        </Comment>
				      );
				    });
				    return (
				      <div className="commentList">
				        {commentNodes}
				      </div>
				    );				
			  }
			});
			
			var CommentForm = React.createClass({
 				getInitialState: function() {
    				return {author: '', text: ''};
  				},

				handleAuthorChange: function(e) {
					this.setState({author: e.target.value});
				},

				handleTextChange: function(e) {
					this.setState({text: e.target.value});
				},

			  handleSubmit: function(e) {
			    e.preventDefault();
			    var author = this.state.author.trim();
			    var text = this.state.text.trim();
			    if (!text || !author) {
			      return;
			    }
			    this.props.onCommentSubmit({author: author, text: text});
			    this.setState({author: '', text: ''});
			  },
			  render: function() {
			    return (
			      <div className="commentForm">
      					<form className="commentForm" onSubmit={this.handleSubmit}>
        					<input type="text" value={this.state.author} onChange={this.handleAuthorChange} placeholder="Your name" />
        					<input type="text" value={this.state.text} onChange={this.handleTextChange} placeholder="Say something..." />
        					<input type="submit" value="Post" />
      					</form>			        
			      </div>
			    );
			  }
			});   


 
			var CommentBox = React.createClass({
 				getInitialState: function() {
    				return {data: []};
  				},
				loadCommentsFromServer: function() {
				    $.ajax({
				      	url: this.props.url,
      				  	dataType: 'json',
      				  	cache: false,
      					success: function(data) {
        				this.setState({data: data});
      					}.bind(this),
      						error: function(xhr, status, err) {
        					console.error(this.props.url, status, err.toString());
      					}.bind(this)
    				});
  				},
  				handleCommentSubmit: function(comment) {
  					$.ajax({
      					url: this.props.url,
      					contentType: 'application/json',
      					dataType: 'json',
      					type: 'POST',
      					data: JSON.stringify(comment),
      					success: function(data) {
        					this.setState({data: data});
      					}.bind(this),
      					error: function(xhr, status, err) {
        					console.error(this.props.url, status, err.toString());
      					}.bind(this)
    				});    				
  				},
			  	componentDidMount: function() {
					this.loadCommentsFromServer();
					setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  				},
			  	render: function() {
			    	return (
			      		<div className="commentBox">
			        		<h1>Comments</h1>
							<CommentList data={this.state.data}/>
							<CommentForm onCommentSubmit={this.handleCommentSubmit}/>
			      		</div>
			    );
			  }
			});


			ReactDOM.render(
			  <CommentBox url="http://localhost:8080/api/comments" pollInterval={20000000} />,
			  document.getElementById('content')
			);