import React, { Component } from 'react';
import Filter from './filter';
import Robot from './robot';

 class Robots extends Component {

       state = {
            robots: [],
            catFav: false,
            searchText: ''
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
    test = () => {
        this.setState({catFav: !this.state.catFav})
        
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
                robotsProps={this.state.robots}
                test={this.test} 
                searchText={this.state.searchText} 
                searchUpdate={this.searchUpdate.bind(this)}
             />
             <Robot 
                robotsProps={this.state.robots}
                searchText={this.state.searchText} 
             />
            </div>
        );
      }
    
}

export default Robots;