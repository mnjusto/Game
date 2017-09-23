var Header = React.createClass({
  render: function(){
    return(
      <div className="header"></div>
    )
  }
});

var AllGames = React.createClass({
  _localGoToPage: function(e, page){
    e.preventDefault();
    this.props.localGoToPage(page);
  },
  render: function(){
    return(
      <div>
        <a href="game/ten">Ping pong</a>
        <a href="game/rock_paper_scissors" onClick={(e) => this._localGoToPage(e, 'rock_paper_scissors')}>Rock Paper Scissors</a>
      </div>
    )
  }
});

var HomeBody = React.createClass({
  getInitialState: function(){
    return({
      page: "all"
    });
  },
  _goToPage: function(page){
    this.setState({
      page: page
    });
  },
  render: function(){
    var body_element = ""
    if(this.state.page == 'all'){
      body_element = <AllGames localGoToPage={this._goToPage}/>
    }else if(this.state.page == 'rock_paper_scissors'){
      body_element = <RockPaperScissors backHome={this._goToPage}/>
    }
    return(
      <div className="body">
        {body_element}
      </div>
    )
  }
});

var Footer = React.createClass({
  render: function(){
    return(
      <div className="footer"></div>
    )
  }
});

var RockPaperScissors = React.createClass({
  getInitialState: function(){
    return({
      win_type: "",
      reset: false,
      computer_pick: "",
      pick: ""
    });
  },
  componentDidMount: function(){
    var reset = this.state.reset,
        computer_pick = this._computerRandomPick();
    this.setState({
      win_type: "",
      reset: reset,
      computer_pick: computer_pick,
      pick: ""
    });
  },
  _computerRandomPick: function(){
    var pick_arr = ['scissors', 'paper', 'rock'],
        com_random_pick = Math.floor(Math.random() * 3),
        computer_pick = pick_arr[com_random_pick];
    return(computer_pick);
  },
  _localBackHome: function(e){
    e.preventDefault();
    this.props.backHome('all')
  },
  _changePick: function(pick){
    var reset = this.state.reset;
    if(!reset){
      var computer_pick = this.state.computer_pick;
      this.setState({
        win_type: "",
        reset: reset,
        computer_pick: computer_pick,
        pick: pick
      });
    }
  },
  _showOrReset: function(e){
    e.preventDefault();
    if(this.state.pick != ''){
      var win_type = "",
          reset = !(this.state.reset),
          computer_pick = this.state.computer_pick,
          pick = this.state.pick;
      if(this.state.reset){
        computer_pick = this._computerRandomPick();
      }
      if(reset){
        if(this.state.pick == this.state.computer_pick){
          win_type = "draw";
        }else if(
            (this.state.pick == "scissors" && this.state.computer_pick == "paper") ||
            (this.state.pick == "paper" && this.state.computer_pick == "rock") ||
            (this.state.pick == "rock" && this.state.computer_pick == "scissors")
          ){
          win_type = "won"
        }else{
          win_type = "lose"
        }
      }else{
        pick = ""
      }
      this.setState({
        win_type: win_type,
        reset: reset,
        computer_pick: computer_pick,
        pick: pick
      });
    }
  },
  render: function(){
    var computer_pick_element = "",
        computer_pick_class = "",
        pick_element = "",
        pick_class = "",
        btn_text = "Show",
        win_text = "",
        win_element = "";
    if(this.state.reset){
      if(this.state.win_type == 'won'){
        win_text = "Hooray! You won!";
      }else if(this.state.win_type == 'draw'){
        win_text = "Phew! It's a draw.";
      }else{
        win_text = "Sorry, you lose!";
      }
      win_element = <span className="win-text">{win_text}</span>
      btn_text = "Reset"
      if(this.state.computer_pick == "scissors"){
        computer_pick_class = "fa fa-hand-peace-o";
      }else if(this.state.computer_pick == "paper"){
        computer_pick_class = "fa fa-hand-paper-o";
      }else if(this.state.computer_pick == "rock"){
        computer_pick_class = "fa fa-hand-rock-o";
      }
      computer_pick_element = <i className={computer_pick_class}></i>
    }

    if(this.state.pick != ""){
      if(this.state.pick == "scissors"){
        pick_class = "fa fa-hand-peace-o"
      }else if(this.state.pick == "paper"){
        pick_class = "fa fa-hand-paper-o"
      }else if(this.state.pick == "rock"){
        pick_class = "fa fa-hand-rock-o"
      }
      pick_element = <i className={pick_class}></i>
    }
    return(
      <div className="rock-paper-scissors clearfix small-12 columns small-centered">
        <a href="#" onClick={(e) => this._localBackHome(e)}>Back</a>
        <div className="container clearfix">
          <h3>Rock Paper Scissors</h3>
          <div className="player-cont small-4 columns">
            {computer_pick_element}
          </div>
          <div className="show-cont small-4 columns">
            <a className="show-btn" onClick={(e) => this._showOrReset(e)}>{btn_text}</a>
            {win_element}
          </div>
          <div className="computer-cont small-4 columns">
            {pick_element}
          </div>
          <div className="choices-cont small-12 columns">
            <h5>Choose your pick</h5>
            <i className="fa fa-hand-peace-o" onClick={(e) => this._changePick('scissors')}></i>
            <i className="fa fa-hand-paper-o" onClick={(e) => this._changePick('paper')}></i>
            <i className="fa fa-hand-rock-o" onClick={(e) => this._changePick('rock')}></i>
          </div>
        </div>
      </div>
    )
  }
});

var Home = React.createClass({
  getInitialState: function(){
    return({
      page: "home"
    });
  },
  _changePage: function(page){
    this.setState({
      page: page
    })
  },
	render: function(){
    return(
  		<div>
        <Header/>
        <HomeBody/>
        <Footer/>
  		</div>
    )
	}
});

$(document).ready(function(){

});
