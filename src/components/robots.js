import React, { Component } from 'react';
import Filter from './filter';
import Robot from './robot';

 class Robots extends Component {

       state = {
            robots: [],
            catFav: false
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
    render() {

        return (
         <div>
             <Filter test={this.test} />
                <Robot robotsProps={this.state.robots}/>
            </div>
        );
      }
    
}

export default Robots;