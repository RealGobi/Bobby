import React, { Component } from "react";
import Filter from "./filter";
import Robot from "./robot";
import arrow from "../img/triangle-dark.svg";

class Robots extends Component {
  state = {
    robots: [],
    searchText: "",
    scoreItem: false,
    activeCategory: [],
    categories: []
  };

  async componentDidMount() {
    const API =
      "https://bobby-testing.s3.eu-north-1.amazonaws.com/bobbybots/bots.json";
    await fetch(API)
      .then(res => res.json())
      .then(data => {
        this.setState({ robots: data });
      })
      .catch(console.log);

    const temp = [];
    this.state.robots.map(categories => {
      return categories.categories.map(cat => {
        return temp.push(cat);
      });
    });
    temp.sort();
    let filterBySet = [...new Set(temp)];
    filterBySet.unshift('Favourites')
    this.setState({ categories: filterBySet });
    this.setState({ activeCategory: filterBySet});
}


  handleChange = uniq => {
    this.setState(prevState => ({
       activeCategory: prevState.activeCategory.includes(uniq)
       ? prevState.activeCategory.filter(c => c === uniq)
       : [...prevState.activeCategory, uniq ]
    }));
};



score = () => {
    this.setState({
        scoreItem: !this.state.scoreItem
    });
};

searchUpdate(value) {
    this.setState({
        searchText: value
    });
}
sortByScore = (a, b) => {
    const compA = a.score;
    const compB = b.score;
    
    let comparison = 0;
    if (compA > compB) {
        comparison = 1;
    } else if (compA < compB) {
        comparison = -1;
    }
  if (this.state.scoreItem) {
    return comparison;
  } else return comparison * -1;
};


render() {


    // style in obj

    const spanStyle = {
      color: "grey",
      fontSize: "12px"
    };
    const spanStyleFlex = {
      display: "flex",
      justifyContent: "space-between",
      width: "400px",
      margin: "0 auto",
      marginTop: "2rem"
    };
    const arrowStyle = {
      width: "10px",
      padding: "0rem .3rem",
      transform: "rotateX(180deg)",
      cursor: "pointer"
    };
    const arrowDown = {
      width: "10px",
      padding: "0rem .3rem",
      cursor: "pointer"
    };


    //Conditional Rendering

    const topScore = <img src={arrow} alt="arrow" style={arrowStyle} />;
    const lowScore = <img src={arrow} alt="arrow" style={arrowDown} />;

    return (
      <div className="robots">
        <Filter
          filterBySet={this.state.categories}
          activeCategory={this.state.activeCategory}
          onChange={this.handleChange}
          searchText={this.state.searchText}
          searchUpdate={this.searchUpdate.bind(this)}
        />
        <span style={spanStyleFlex}>
          <p style={spanStyle}>Name</p>
          <p style={spanStyle}>
            Score
            <span onClick={this.score}>
              {this.state.scoreItem ? topScore : lowScore}
            </span>
          </p>
        </span>
        {
   this.state.robots
      .sort(this.sortByScore)
      .filter(bot => {
        return (
            // sökfunktion, gör allt till Lowercase och jämför det men skriver i input-fältet med robotarnas namn.
          bot.name.toLowerCase().indexOf(this.state.searchText.toLowerCase()) >=
          0
        );
      })
      // sorterar ut på vald kategori, först kollar "some()"med samarbete av "include()" om bot.cat finns i activcat, sen mapas de som kolarar filtreringen ut
      .filter(bot => {
        return bot.categories.some(value => {
            return this.state.activeCategory.includes(value) 
        })
      })
      .map((bot, idx) => {
              return <Robot idx={idx} bot={bot} key={idx}/>
          } 
        )
    } 
    </div>
    );
  }
}

export default Robots;
