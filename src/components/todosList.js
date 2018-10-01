import React, { Component } from 'react';
class Todoslist extends Component {
    state = { 
        
     }
     renderlist() {
        
    return this.props.list.map((todo, index) => {
        
        return(
         <tr key={index}>
            <td scope="row" >{index}</td>
            <td>
            {todo.title}
            </td>
            <td>{todo.description}  </td>
            <td>
                <input  type="checkbox"  className="checkedBox"/>
            </td>
            <td><button onClick={()=>this.props.onEdit(todo)} className="btn btn-sm btn-info" >Edit</button></td>
            <td><button className="btn btn-sm btn-danger" onClick={()=>this.props.onDel(todo.id)} > Delete</button></td>
        </tr>
        )
     })
    }
    render() { 
        return (
        <div className="container table-responsive">
        <table className="table">
            <thead className="thead-dark">
            <tr>
                <th scope="col">#</th>
                <th scope="col">Task</th>
                <th scope="col">Description</th>
                <th scope="col">Done</th>
                <th scope="col" colSpan={2} className="text-center">Options</th>
            </tr>
            </thead>
            
            <tbody className="todolistmain" >
            {this.renderlist()} 
            </tbody>
        </table>
        </div>  );
    }
}
 
export default Todoslist;