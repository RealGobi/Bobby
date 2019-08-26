import React from 'react';
import starInActive from '../img/star-inactive.svg'
import starActive from '../img/star-active.svg';
import arrow from '../img/triangle-dark.svg'



export default ({ searchText, robotsProps, score, scoreItem, activeCategory, categoriesFavo, catFav }) => {

   
    console.log(catFav)

     // style in obj

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
        padding: '0rem .3rem',
        transform: "rotateX(180deg)",
        cursor: "pointer"

    }
    const arrowDown = {
        width: '10px',
        padding: '0rem .3rem',
        cursor: "pointer"
    }

    // variables

    let i = 1;
    const pic = 'https://bobby-testing.s3.eu-north-1.amazonaws.com/bobbybots/img/';
    const favOn = (<img src={starActive} alt="star" className="star"/> )
    const favOff = (<img src={starInActive} alt="star" className="star"/>)
    const topScore = (<img src={arrow}  alt="arrow" style={arrowStyle} />)
    const lowScore = (<img src={arrow}  alt="arrow" style={arrowDown} />)
      

    // functions

       function sortByScore (a, b)  {
        const compA = a.score;
        const compB = b.score;

        let comparison = 0;
        if (compA > compB) {
          comparison = 1;
        } else if (compA < compB) {
          comparison = -1;
        }
         if(scoreItem){
           return comparison;
        } else return  comparison * -1;
      }
      // what to render
      
      const robotSearch = robotsProps
      .sort(sortByScore)
      .filter(bot =>{
          return bot.name.toLowerCase().indexOf(searchText.toLowerCase()) >= 0;
        })          
        .map((bot, idx) => {
             if(bot.categories.indexOf(activeCategory) < 0){
                 
                return (
                    <div className="card" key={idx}>
                            <div className="botPic" style={{ backgroundImage: `url("${pic + bot.image}")`, backgroundSize: 'contain'}}></div>
                                <span style={{paddingLeft:".5rem", textAlign:"left"}}>  
                                   <p style={{textAlign:"left"}}>{bot.name}</p> 
                                        <span className="numberOfTheBeast">{idx+1}.</span>
                                      <span style={{fontSize:"10px", textAlign:"left"}}>{bot.categories.map(cat => {
                                          return <p key={i++} style={{display:"inline", padding:".2rem"}}>{cat}</p>})}
                                     </span>
                              </span>
                           <p style={{textAlign:"right", paddingRight:"1rem"}}>{bot.score}</p>
                           <span onClick={categoriesFavo}>
                            {catFav ? favOn : favOff}
                        </span>
                     </div>
                    ) 
            }
            return null;
           
            });

            return (
                <div>
                    <span style={spanStyleFlex}>
                        <p style={spanStyle}>Name</p>
                        <p style={spanStyle}>Score
                        <span onClick={score}>
                            {scoreItem ? topScore : lowScore}
                        </span>
                        </p>
                    </span>
                    <ul className="robots">
                        { robotSearch }
                    </ul> 
                </div>
        )
}