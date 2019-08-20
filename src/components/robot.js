import React, { Component } from 'react';

export default class Robot extends Component {
    render() {
     
       let i = 0;
        const pic = 'https://bobby-testing.s3.eu-north-1.amazonaws.com/bobbybots/img/';
        return (
            <div className="robots">
            {this.props.robotsProps
            .map((bot,index ) => (
              <div className="card" key={bot.id}>
                 <p className="index"> {index +1}.</p>
                  <img src={pic + bot.image} alt="bot images" height="42" width="42"/>
                  <span style={{paddingLeft:".5rem", textAlign:"left"}}>
                  <p style={{textAlign:"left"}}>{bot.name}</p>    
                  <span style={{fontSize:"10px", textAlign:"left"}}>{bot.categories.map(cat => {
                      return <p key={i++} style={{display:"inline", padding:".2rem"}}>{cat}</p>})}</span>
                  </span>
                 
                  <p style={{textAlign:"right", paddingRight:"1rem"}}>{bot.score}</p>
                  <input type="checkbox" name="favBot" className="star" value ="fav"/>
                  
              </div>
               ))}
            </div>
          
        )
    }
}
