import React, { Component } from 'react';

class Filter extends Component {
    state = {
        filter: false
    }


    toggle = () => {
        this.setState({
            filter: !this.state.filter
        })
    }


    
    render() {
        const show = (
            <p>Show filters <i className="fas fa-sort-down"></i></p>
        )
        const hide = (
            <p>Hide filters <i className="fas fa-sort-up"></i></p>
        )
        return (
            <div className="bg">
                <input type="text" className="inputFilter" name="filter" placeholder="Search" />
                    <div className="filterMenu">
                        <p>Filter by:</p>
                        <a /*href="#"*/ onClick={this.toggle} >{this.state.filter ? hide
                           : show  }</a>
                    </div> 
                    {this.state.filter ? 
                <div className="filter">
                <div className="pinkFilterBox">
                    <div className="grid-item">
                    <input type="checkbox" name="fav" className="star" value ="fav" onClick={this.props.test}/>
                    <p>Favourites</p>
                    </div>
                    <div className="grid-item">
                    <input type="checkbox" name="catA" value="catA"/>
                    <p>Category A</p>
                    </div>
                    <div className="grid-item">
                    <input type="checkbox" name="catB" value="catB"/>
                    <p>Category B</p>
                    </div>
                    <div className="grid-item">
                    <input type="checkbox" name="catC" value="catC"/>
                    <p>Category C</p>
                    </div>
                    <div className="grid-item">
                    <input type="checkbox" name="cyborg" value="cyborg"/>
                    <p>Cyborg</p>
                    </div>
                    <div className="grid-item">
                    <input type="checkbox" name="droid" value="droid"/>
                    <p>Droid</p>
                    </div>
                    <div className="grid-item">
                    <input type="checkbox" name="proto" value="proto"/>
                    <p>Prototype</p>
                    </div>
                </div>
                </div>
                    : null}
                 
            </div>
        )
    }
}

export default Filter;