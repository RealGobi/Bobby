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
    const filterBySet = [...new Set(temp)];
    this.setState({ categories: filterBySet });
    this.setState({ activeCategory: filterBySet });
    console.log(this.state.categories);
  }

  handleChange = uniq => {
    this.setState(prevState => ({
      //activeCategory: [...prevState.activeCategory, uniq]
      activeCategory: prevState.activeCategory.includes(uniq)
        ? prevState.activeCategory.filter(c => c === uniq)
        : [...prevState.activeCategory, uniq]
    }));
};

score = () => {
    this.setState({
        scoreItem: !this.state.scoreItem
    });
};
categoriesFavo = () => {
    this.setState({
        catFav: !this.state.catFav
    });
};

searchUpdate(value) {
    this.setState({
        searchText: value
    });
    console.log(this.state.searchText);
}
render() {
    console.log(this.state.activeCategory)
    const sortByScore = (a, b) => {
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

    

    console.log(this.state.scoreItem);
    return (
      <div className="robots">
        <Filter
          filterBySet={this.state.categories}
          onChange={this.handleChange}
          robotsProps={this.state.robots}
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
        {this.state.robots
      .sort(sortByScore)
      .filter(bot => {
        return (
          bot.name.toLowerCase().indexOf(this.state.searchText.toLowerCase()) >=
          0
        );
      })
      .map((bot, idx) => { 
        if(bot.categories.indexOf(this.state.activeCategory) < 0){
              return <Robot idx={idx} bot={bot} key={idx}/>
          } 
          else return null;
        })}
      </div>
    );
  }
}

export default Robots;
