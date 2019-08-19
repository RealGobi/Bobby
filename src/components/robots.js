import React, { Component } from 'react';
import axios from 'axios';


 class Robots extends Component {

     state = {
         robots: []
     }
  
componentWillMount() {
    axios.get('https://bobby-testing.s3.eu-north-1.amazonaws.com/bobbybots/bots.json') 
      .then( res => {
        this.setState({
        robots: res.data
      });
    })
    .catch(function (err) {
      console.log(err);
    });
    console.log(this.robots)
   }

    render() {
       // const robot = this.state.robots;
        return (
            <div>
            </div>
        )
    }
}

export default Robots;