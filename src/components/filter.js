import React, { Component } from 'react';
import starInActive from '../img/star-inactive.svg'
import starActive from '../img/star-active.svg'
import arrow from '../img/triangle-light.svg'
import PropTypes from 'prop-types';

class Filter extends Component {
    state = {
        filter: true,
        fav: false
    }
    
    static propTypes = {
        onChange:PropTypes.func.isRequired
    }
    
    toggle = () => {
        this.setState({
            filter: !this.state.filter
        })
    }
    fav = () => {
        this.setState({
            fav: !this.state.fav
        })
    }
    searchUpdate(){
        const val = this.myValue.value;
        this.props.searchUpdate(val)
    }
    //  onlyUnique(value, index, self) { 
    //     return self.indexOf(value) === index;
    // }
    handleChange = (uniq) => this.props.onChange(uniq);
    
   
    render() {
 
        let temp=[];
        this.props.robotsProps.map(cat => {
            return cat.categories.map((tac) => {
                return temp.push(tac)
            })
            })
            temp.sort();
            // console.log(temp)
            const filterBySet = [...new Set(temp)];
            // const unique = temp.filter(this.onlyUnique)
            // console.log(unique)
            
            // filterBySet ersätter allt med unique... Har kvar koden för framtida ref.
                    
        const show = (<p style={{fontSize:"10px"}}>Show filters<img src={arrow} style={{paddingLeft:"5px"}} alt="arrow"/></p>)
        const hide = (<p style={{fontSize:"10px"}}>Hide filters<img src={arrow} alt="arrow"  style={{paddingLeft:"5px"}} id="arrowDown"/></p>)
        const act = (<img src={starActive} onClick={this.fav} name="fav" alt="favCheck"  value ="fav" type="fav"  id="favo"/>)
        const inAct = (<img src={starInActive} onClick={this.fav} name="fav" alt="favCheck"  value ="fav" type="fav"  id="favo"/>)
        const filterCategorys = filterBySet.map(uniq => {
            return (
                <div className="grid-item" key={uniq}>
                <input type="checkbox" name="fav"  value ="fav" 
                onClick={()=>this.handleChange(uniq)} />
                <p style={{fontSize:"12px"}}>{uniq}</p>
                </div>
            )
        });
  

        return (
            <div className="bg">
                <input 
                type="text" 
                className="inputFilter" 
                placeholder="Search" 
                onChange={this.searchUpdate.bind(this)}
                ref={(value)=> this.myValue = value }
                />
                    <div className="filterMenu">
                        <p style={{fontSize:"10px"}}>Filter by:</p>
                        <span className="hideNshow" onClick={this.toggle} >{this.state.filter ? hide
                           : show  }
                        </span>
                    </div> 
                    {this.state.filter ? 
                <div className="filter">
                    <div className="pinkFilterBox">
                        <div className="grid-item">
                            <span onClick={()=>this.handleChange('favo')}>{this.state.fav ? act : inAct }</span>
                                <p style={{fontSize:"12px"}}>Favourites</p>
                        </div>
                     {filterCategorys}
                </div>
                </div>
                    : null }
            </div>
        )
    }
}

export default Filter;