import React from 'react';
import starInActive from '../img/star-inactive.svg'
import starActive from '../img/star-active.svg';
import arrow from '../img/triangle-dark.svg'



export default ({ searchText, robotsProps }) => {
    
     
       let i = 1;
        const pic = 'https://bobby-testing.s3.eu-north-1.amazonaws.com/bobbybots/img/';
        console.log(robotsProps)

        const robotSearch = robotsProps
        .filter(bot =>{
            return bot.name.toLowerCase().indexOf(searchText.toLowerCase()) >= 0;
        })           
        .map(bot => {
            return (
                  <div className="card" key={bot.id}>
                        <img className="botPic" src={pic + bot.image} alt="bot images" height="42" width="42"/>
                            <span style={{paddingLeft:".5rem", textAlign:"left"}}>    
                               <p style={{textAlign:"left"}}>{bot.name}</p> 
                                  <span style={{fontSize:"10px", textAlign:"left"}}>{bot.categories.map(cat => {
                                         return <p key={i++} style={{display:"inline", padding:".2rem"}}>{cat}</p>})}
                                 </span>
                          </span>
                       <p style={{textAlign:"right", paddingRight:"1rem"}}>{bot.score}</p>
                       <img src={starActive} alt="star" className="star"/>
                 </div>
                ) 
            });
            const spanStyle = {
                color: 'grey',
                fontSize: '12px'
            }
            const spanStyleFlex = {
                display: 'flex',
                justifyContent: 'space-between',
                width: '400px',
                margin:'0 auto',
                marginTop: '2rem'
            }
            const arrowStyle = {
                width: '10px',
                padding: '.1rem .3rem'
            }
            return (
                <div>
                    <span style={spanStyleFlex}>
                        <p style={spanStyle}>Name</p>
                        <p style={spanStyle}>Score
                        <img src={arrow}  alt="arrow" style={arrowStyle} />
                        </p>
                    </span>
                    <ul className="robots">
                        { robotSearch }
                    </ul> 
                </div>
        )
}
