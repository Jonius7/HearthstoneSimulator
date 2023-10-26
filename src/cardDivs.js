import React, { Component} from "react";

class cardDivs extends Component {
    constructor(props) {
        super(props);
        this.state = {divCount: 0};
        this.renderCardDiv = this.renderCardDiv.bind(this);
        this.divList = this.divList.bind(this);
    }

    renderCardDiv() {
        this.setState({divCount: this.state.divCount + 1});
    }

    divList() {
        const rowList = [];
        for (let i = 0; i < this.state.divCount; i++) {
          rowList.push(<div className="card-card">NewDiv</div>);
        }
        return rowList;
    }

    render() {
        return (
          <div className="card-container">
            <div className="btnContainer" >
              <button className="makeDivsBtn" onClick={this.renderCardDiv}> 
                      Create Divs
              </button>
            </div>
            {this.divList()}
          </div> // container end 
        );
    }
}

export default cardDivs;