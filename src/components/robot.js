import React, { useState } from 'react';
import starInActive from "../img/star-inactive.svg";
import starActive from "../img/star-active.svg";



export default (props) => {

    
    const [catFav, setCatFav] = useState(false);
 

function addFavourites() {
    switch (catFav){
        case !true: // om den inte är san, allså falsk, så lägg till.
                console.log('körs du enns???')
                props.bot.categories.push("Favourites");
                break;
        case !false: // om den inte är falsk, allså san, så ta bort.
                props.bot.categories.pop();
                break;
            default:
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
          <span style={{ paddingLeft: ".5rem", textAlign: "left" }}>
            <p style={{ textAlign: "left" }}>{props.bot.name}</p>
            <span className="numberOfTheBeast">{props.idx + 1}.</span>
            <span style={{ fontSize: "10px", textAlign: "left" }}>
              {props.bot.categories.map(cat => {
                return (
                  <p
                    key={i++}
                    style={{ display: "inline", padding: ".2rem" }}
                  >
                    {cat}
                  </p>
                );
              })}
            </span>
          </span>
          <p style={{ textAlign: "right", paddingRight: "1rem" }}>
            {props.bot.score}
          </p>
          <span onClick={()=>{
              addFavourites();
              setCatFav(!catFav)}}>
            {catFav ? favOn : favOff}
          </span>
        </div>
      );
}