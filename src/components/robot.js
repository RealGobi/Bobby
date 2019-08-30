import React, { useState } from 'react';
import starInActive from "../img/star-inactive.svg";
import starActive from "../img/star-active.svg";



export default (props) => {   
    const id = props.bot.id;
    
    function useLocalStorage(localItem) {
        const [loc, setState] = useState(localStorage.getItem(localItem));
        function setLoc(newItem){
            localStorage.setItem(localItem, newItem)
            setState(newItem)
            }
            return [loc, setLoc]
    }
    const [catFav, setCatFav] = useLocalStorage(id);

    
    function addFavourites() {
        if (catFav !== true){
              // om den inte är san, allså falsk, så lägg till.
            props.bot.categories.push("Favourites");
        } else {
            // om den inte är falsk, allså san, så ta bort.
            props.bot.categories.pop();
        }
       }
        
    console.log(catFav)
    // variables

    let i = 1;
    const pic =
      "https://bobby-testing.s3.eu-north-1.amazonaws.com/bobbybots/img/";
    const favOn = <img src={starActive} alt="star" className="star" />;
    const favOff = <img src={starInActive} alt="star" className="star" />;

    return (
        <div className="card" key={props.idx}>
          <div
            className="botPic"
            style={{
              backgroundImage: `url("${pic + props.bot.image}")`,
              backgroundSize: "contain"
            }}
          ></div>
          <span className="botNameStyle">
            <p>{props.bot.name}</p>
            <span className="numberOfTheBeast">{props.idx + 1}.</span>
            <span style={{ fontSize: "10px", textAlign: "left" }}>
              {props.bot.categories.map(cat => {
                return (
                  
                  <p
                    key={i++}
                    className='categoriesStyle'
                  >
                    {cat}
                  </p>
                );
              })}
            </span>
          </span>
          <p className='scoreStyle'>
            {props.bot.score}
          </p>
          <span onClick={()=>{
            setCatFav(!catFav)
            addFavourites();
              }}>
            {catFav ? favOn : favOff}
          </span>
        </div>
      );
}