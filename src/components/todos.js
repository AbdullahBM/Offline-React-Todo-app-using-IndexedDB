import React, { Component } from 'react';
//import logo from './logo.svg';
//import './App.css';


class Todos extends Component {
    
    

    

  render() {
    return (
        <div className="row">
        <div className="col-md-8 mx-auto">
            <div className="card card-body">
                <h3 className="text-center">Add Your Todo</h3>
                
                <div className="form-group">
                    <input type="text" name="task" placeholder="Task Title" className="form-control" value={this.props.title} required onChange={(e)=>this.props.handleTitle(e)}></input>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Description" name="description" className="form-control" value={this.props.description} required onChange={(e)=>this.props.handleDescription(e)}></input>
                </div>
                <hr style={{marginTop:0}}/>
                <button className="btn btn-primary" onClick={() =>this.props.onAdd()}>Add</button>
            </div>
        </div>
    </div>
    
    );
  }
}


export default Todos;