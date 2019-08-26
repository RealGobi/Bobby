import React, { Component } from 'react';
import Filter from './filter';
import Robot from './robot';

 class Robots extends Component {

       state = {
            robots: [],
            catFav: false,
            searchText: '',
            scoreItem:false,
            activeCategory:[],
            categories:[]
        }
      

      
    async  componentDidMount() {
        
        const API = 'https://bobby-testing.s3.eu-north-1.amazonaws.com/bobbybots/bots.json';
        await fetch(API)
        .then(res => res.json())
        .then((data) => {
                this.setState({ robots: data })
        })
        .catch(console.log)

        const temp=[];
        this.state.robots.map(categories => {
            return categories.categories.map((cat) => {
                return temp.push(cat)
            })
        })
        temp.sort();
        const filterBySet = [...new Set(temp)];
        this.setState({categories:filterBySet})
        this.setState({activeCategory:filterBySet})
        console.log(this.state.categories)

        }

    handleChange = (uniq) => {
        this.setState(prevState => ({
            //activeCategory: [...prevState.activeCategory, uniq]
            activeCategory: prevState.activeCategory.includes(uniq) 
                ? prevState.activeCategory.filter(c => c === uniq)
                : [...prevState.activeCategory, uniq]
        }))
    }

    score = () => {
        this.setState({
            scoreItem: !this.state.scoreItem
        })
    }
    categoriesFavo = () => {
        this.setState({
            catFav: !this.state.catFav
        })
    }

    searchUpdate(value) {
        this.setState({
            searchText: value
        })
        console.log(this.state.searchText)
        
    }
    
    render() {

        return (
            
            <div>
             <Filter 
                filterBySet={this.state.categories}
                onChange={this.handleChange}
                robotsProps={this.state.robots}
                searchText={this.state.searchText} 
                searchUpdate={this.searchUpdate.bind(this)}
             />
             <Robot 
                catFav={this.state.catFav}
                categoriesFavo={this.categoriesFavo.bind(this)}
                scoreItem={this.state.scoreItem}
                score={this.score.bind(this)}
                robotsProps={this.state.robots}
                searchText={this.state.searchText} 
                activeCategory={this.state.activeCategory}
             />
            </div>
        );
      }
    
}

export default Robots;
