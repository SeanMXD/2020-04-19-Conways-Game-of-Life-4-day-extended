import React from 'react';

class Field extends React.Component {
    constructor() {
        super()
        this.onCellClick = this.onCellClick.bind(this);
        this.state = {...this.state, world: [[]]};
    }
    
    render() {
        return <div className="field">{this.parseWorld(this.state.world)}</div>
    }
    
    componentDidMount() {
        if(this.state.world[0].length === 0) this.setState({world: this.createWorld(10, 10)});
    }

    createWorld(rows, cols) {
        let world = [];
        for(let row = 0; row < rows; row++) {
            let newRow = [];
            for(let col = 0; col < cols; col++) {
                newRow.push(false);
            }
            world.push(newRow);
        }
        return(world);
    }

    parseWorld(world) {
        let output = [];
        world.forEach((row, rowIndex) => {
            let children = [];
            row.forEach((col, colIndex) => {
                children.push(
                    <span 
                        data-row={rowIndex}
                        data-col={colIndex}
                        onClick={this.onCellClick}
                        className={"cell "+(col ? "alive":"dead")}
                        key={colIndex}
                    ></span>
                )
            });
            output.push(<span className="row" key={rowIndex}>{children}</span>);
        })
        return output;
    }

    progressWorld(world) {
        let output = [];
        world.forEach((row, rowIndex) => {
            row.forEach((col, colIndex) => {
                
            });
        });
    }

    onCellClick(event) {
        let world = this.state.world;
        world[event.target.dataset.row][event.target.dataset.col] = !world[event.target.dataset.row][event.target.dataset.col];
        this.setState({world: world});
    }

}

export default Field;