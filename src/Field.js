import React from 'react';

class Field extends React.Component {
    constructor() {
        super()
        this.onCellClick = this.onCellClick.bind(this);
        this.progressWorld = this.progressWorld.bind(this);
        this.state = {...this.state, world: [[]]};
    }
    
    render() {
        return <div className="field">{this.parseWorld(this.state.world)}<br/><button onClick={this.progressWorld}>Progress</button></div>
    }
    
    componentDidMount() {
        if(this.state.world[0].length === 0) this.setState({world: this.createWorld(20, 20)});
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

    getNeighbors(world, row, col) {
        var neighbors = 0;
        if(world[row-1]) {
            if(world[row-1][col-1]) neighbors++;
            if(world[row-1][col])   neighbors++;
            if(world[row-1][col+1]) neighbors++;
        }

        if(world[row]) {
            if(world[row][col-1])   neighbors++;
            if(world[row][col+1])   neighbors++;
        }

        if(world[row+1]) {
            if(world[row+1][col-1]) neighbors++;
            if(world[row+1][col])   neighbors++;
            if(world[row+1][col+1]) neighbors++;
        }
        console.log(row+","+col+": "+neighbors)
        return neighbors;
    }

    progressWorld() {
        let output = this.state.world;
        this.state.world.forEach((row, rowIndex) => {
            row.forEach((col, colIndex) => {
                let neighbors = this.getNeighbors(this.state.world, rowIndex, colIndex);
                if(col === true) {
                    if(neighbors===2 || neighbors === 3) output[rowIndex][colIndex] = true;
                    else output[rowIndex][colIndex] = false;
                } else {
                    if(neighbors===3) output[rowIndex][colIndex] = true;
                }
            });
        });
        this.setState({world: output});
    }

    onCellClick(event) {
        let world = this.state.world;
        world[event.target.dataset.row][event.target.dataset.col] = !world[event.target.dataset.row][event.target.dataset.col];
        this.setState({world: world});
    }

}

export default Field;