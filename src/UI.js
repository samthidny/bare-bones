import React from 'react';


/*class Test extends React.Component {
  constructor(props) {
    super(props);
    // Operations usually carried out in componentWillMount go here
    // // Manually bind this method to the component instance...
    this.clickHandler = this.clickHandler.bind(this);
  }

  render () {
    console.log("RENDERING!!!!!");
    return <input type="button" onClick="{this.clickHandler}" value="SPIN"/>;
  	
  }

  clickHandler(ev) {
  	console.log('the button was clicked');
	}
}*/

export class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: 1};
    this.tick = this.tick.bind(this);
  }
  
  tick() {
    this.setState({count: this.state.count + 1});
  }
  
  render() {
    return (
      <div>
        Clicks: {this.state.count}
        <input id="spin-button" type="button" value="SPIN" />
      </div>
    );
  }
}

export default Test;