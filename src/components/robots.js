import React, { Component } from 'react';

 class Robots extends Component {

    constructor(props) {
        super(props)
        this.state = {
            robots: []
        }
      }

      
    async  componentDidMount() {
        const API = 'https://bobby-testing.s3.eu-north-1.amazonaws.com/bobbybots/bots.json';
       await fetch(API)
        .then(res => res.json())
        .then((data) => {
            this.setState({ robots: data })
            console.log(this.state.robots)
        })
        .catch(console.log)
    }
    
    render() {
        const pic = 'https://bobby-testing.s3.eu-north-1.amazonaws.com/bobbybots/img/';

  
       

        return (
         
            <div className="robots">
            {this.state.robots.map((bot,index ) => (
              <div className="card" key={bot.id}>
                 <p className="index"> {index +1}.</p>
                  <img src={pic + bot.image} alt="bot images" height="42" width="42"/>
                  <span style={{paddingLeft:".5rem"}}>
                  <p style={{textAlign:"left"}}>{bot.name}</p>    
                  <p style={{fontSize:"10px", textAlign:"left"}}>{bot.categories}</p>
                  </span>
                 
                  <p style={{textAlign:"right", paddingRight:"1rem"}}>{bot.score}</p>
                  <input type="checkbox" name="favBot" className="star" value ="fav"/>
                  
              </div>
               ))}
            </div>
        );
      }
    
}

export default Robots;