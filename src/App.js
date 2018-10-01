import React, { Component } from 'react';
//import logo from './logo.svg';
//import './App.css';
import swal from 'sweetalert2';
import Navbar from './components/topnav';
import Todos from './components/todos';

import Todoslist from './components/todosList';

class App extends Component {
  
  state = {
    id:0,
        title: '',
    description: '',
    counters:[],
  };
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    //Indexeddb 
    let request = window.indexedDB.open("Database", 1), db, tx, store;
    request.onupgradeneeded=(e)=>
    {
      db = request.result;
      store = db.createObjectStore("Todo", {keyPath:"id"});
    }
    request.onerror=(e)=>{
      console.log('There was an error', e.target.errorCode);
    }
    request.onsuccess=(e)=>
    {
      db = request.result;
      tx = db.transaction("Todo", "readwrite");
      store = tx.objectStore("Todo");
      let counters=[];
      let q = store.getAll()
     q.onsuccess=()=>{
       let data = q.result;
      for (var p of data)
      {
counters.push(p)
// console.log(arr[p.id])
      }
      // console.log(arr);
     } 
     this.setState({counters});    
     console.log(counters);
      tx.oncomplete=()=>
      {
        db.close();
      }
  }
  
}
  handlTitle = (e) => {
    
    //  this.state.title = e.target.value;
    
    this.setState({title : e.target.value} , ()=>{
      console.log('test', this.state.title);
    });
    

  };

  handlDescription = (e) => {
    
    // this.state.description = e.target.value;
    this.setState({description : e.target.value} , ()=>{
      console.log('test', this.state.description);
    });
  };
  handleAdd= () => {
const obj ={
  id: this.state.id,
  title: this.state.title,
  description: this.state.description
}
const todos = [...this.state.counters, obj];
this.setState({counters:todos});
      console.log(this.state.counters);
      this.setState({title:'' , description:''})

     //Indexeddb 
      let request = window.indexedDB.open("Database", 1), db, tx, store;
    request.onupgradeneeded=(e)=>
    {
      db = request.result;
      store = db.createObjectStore("Todo", {keyPath:"id"});
    }
    request.onerror=(e)=>{
      console.log('There was an error', e.target.errorCode);
    }
    request.onsuccess=(e)=>
    {
      db = request.result;
      tx = db.transaction("Todo", "readwrite");
      store = tx.objectStore("Todo");
      db.onerror=(e)=>{
        console.log("ERROR", e.target.errorCode);
      }
      // console.log("before put",this.state.counters);
      
      let id = this.state.id;
      // console.log(this.state.counters[i])
      store.put(obj);
    
      // console.log("Before set i",this.state.i)
      id++;
      this.setState({id});
      // console.log("After set i",this.state.i)
      tx.oncomplete=()=>
      {
        db.close();
      }
    }
  }
handleDelete=(counterId)=>{
  //Indexeddb 
  let request = window.indexedDB.open("Database", 1), db, tx, store;
  request.onupgradeneeded=(e)=>
  {
    db = request.result;
    store = db.createObjectStore("Todo", {keyPath:"id"});
  }
  request.onerror=(e)=>{
    console.log('There was an error', e.target.errorCode);
  }
  request.onsuccess=(e)=>
  {
    db = request.result;
    tx = db.transaction("Todo", "readwrite");
    store = tx.objectStore("Todo");
    const counters = this.state.counters.filter(c => c.id !== counterId);
    this.setState({ counters });
    let q = store.delete(counterId);
    q.onsuccess=()=>{
      console.log("deleted");
    }

    tx.oncomplete=()=>
    {
      db.close();
    }
}
}
handleEdit=(counter)=>{
  let id, tit, desc, obj;
  swal({
    title: 'Firebase Realtime Todo',
    html:
    `<h2>Update Your Todo</h2>
    <input id="swal-input1" class="swal2-input" value=${counter.title} autofocus placeholder="Title" >
    <input id="swal-input2" class="swal2-input" value=${counter.description} placeholder="Description" >`,
    preConfirm: function() {
        return new Promise(function(resolve) {
            if (true) {
                resolve([
                    tit = document.getElementById('swal-input1').value,
                    desc = document.getElementById('swal-input2').value,
                    id = counter.id
                ]);
            }
        });
    }
}).then((result) => {
  let request = window.indexedDB.open("Database", 1), db, tx, store;
  request.onupgradeneeded=(e)=>
  {
    db = request.result;
    store = db.createObjectStore("Todo", {keyPath:"id"});
  }
  request.onerror=(e)=>{
    console.log('There was an error', e.target.errorCode);
  }
  request.onsuccess=(e)=>
  {
    db = request.result;
    tx = db.transaction("Todo", "readwrite");
    store = tx.objectStore("Todo");
    console.log(store);
    obj = {
      id: id,
      title: tit,
      description: desc
    }
    // console.log(obj);
    
    console.log(store);
    console.log(obj);
  
    let q = store.put(obj);
      q.onsuccess=()=>{
        console.log("Edited");
      }
      const counters = [...this.state.counters];   
    // console.log(counters);
    // this.setState({counters:[{id:obj}]})
    counters[id] = {...obj}
    this.setState({counters});
      tx.oncomplete=()=>
  {
    db.close();
  }
  }

  
  
    swal(
        'Firebase Realtime Todo!',
        'Your Todo Has Been Updated!',
        'success'
    )
})

}
  render() {
    return (
      <div className="App">
        <Navbar />
        <br/> <br/>
        <Todos 
        title={this.state.title}
        description={this.state.description}
        onAdd={this.handleAdd}
        handleTitle={this.handlTitle}
            handleDescription={this.handlDescription}/>
        <br/> <br/>
        <Todoslist
        list={this.state.counters}
        onDel={this.handleDelete}
        onEdit={this.handleEdit} />
      </div>
    );
  }
}

export default App;
