import React, { Component } from 'react';
import './App.css';
import Tables from './tables';
import Footer from './footer';
import { range, sample, without, zip } from 'underscore';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAppIntro: true, 
      showEnterStuNo: true,
      showEditForm: false,
      numOfStudents: 0,
      arrayToCut: 0,
      showEnterStuName: false,
      randomNumber: 0,
      name: '',
      currentStuName: '',
      showGetYourSeatButton: false,
      addNumber: [],
      addName: [],
      combinedArrays: [],
      showFinalList: false,
      newName: '',
      nameBeingEdited: 0
    };
  }

  handleNumChange(event) {
    this.setState({numOfStudents: event.target.value});
  }

  handleNumSubmit(event) {
      let array = range(this.state.numOfStudents);
      let oneAdded = array.map(function(number){
      return number+1
    })
    this.setState({
      showEnterStuNo: false,
      showEnterStuName: true,
      arrayToCut: oneAdded
    });
    event.preventDefault();
  }

  handleNameChange(event) {
    this.setState({
      name: event.target.value,
  });
  }
 
  handleNameSubmit(event) {
    let randomNumber = sample(this.state.arrayToCut)
    let currentStuName = this.state.name
  this.setState({
    randomNumber: randomNumber,
    currentStuName: currentStuName,
    name: '',
    showEnterStuName: false,
    showGetYourSeatButton: true
    });
    event.preventDefault();
  }

  handleEditChange(event){
    this.setState({newName: event.target.value});
  }

  handleEditSubmit(event,el, i){  
    let newName = this.state.newName
    let nameBeingEdited = this.state.nameBeingEdited
    let combinedArrays = this.state.combinedArrays
    combinedArrays.map(function(el){
      if(el[0]=== nameBeingEdited) el[1] = newName
      return el
    })
    this.setState({
      combinedArrays: combinedArrays,
      showEditForm: false
    })
    event.preventDefault();
  }

 handleDelete(id) {
    let combinedArrays = this.state.combinedArrays
    combinedArrays.map(function(el){
      if(el[0]=== id+1) el[1] = ''
      return el
    })
  this.setState({combinedArrays});
  }

  numberRemover () {
    let removed =  without(this.state.arrayToCut,this.state.randomNumber)
    let addName = this.state.addName
                  addName.push(this.state.currentStuName)
    let addNumber = this.state.addNumber
                  addNumber.push(this.state.randomNumber)
    this.setState({
      arrayToCut: removed,
      showGetYourSeatButton: false,
      showEnterStuName: true,
      addName: addName,
      currentStuName: '',
      randomNumber: 0
    });
      if(this.state.arrayToCut.length <=1) {
      this.listIsEmpty()
    }
  }

  listIsEmpty(){
    let combinedArrays = zip(this.state.addNumber, this.state.addName)
        combinedArrays.sort(sortFunction)

    function sortFunction(a, b) {
      if (a[0] === b[0]) return 0;             
      else 
      return (a[0] < b[0]) ? -1 : 1;
      }      

    this.setState({
      combinedArrays: combinedArrays,
      showFinalList: true,
      showEnterStuName: false
    })
  }

  dontShowAppIntro () {
    this.setState({ showAppIntro: false})
  }

showEditFormBt(el){
  this.setState({
    showEditForm: true,
    nameBeingEdited: el[0]
})
}
  render() {

    if (this.state.showAppIntro) return (      
    
      <div className='App'>
        <div className='Content'>
          An app to assign random numbers to a group of people. 
          <br></br>
          Kind of like a less dramatic version of the sorting hat from Harry Potter.
        <br></br>
          <button className='letsGetStartedBt' onClick={this.dontShowAppIntro.bind(this)} >
          Let's get started
          </button>         
        </div>  
        
        <Footer/>
          
        </div>
    );

    if (this.state.showEnterStuNo) return (
      <div className='App'>
        <form onSubmit={this.handleNumSubmit.bind(this)}>
          <label> How many students are there? <br/>
            <input className='inputBox' type="number" onChange={this.handleNumChange.bind(this)} />
          </label>
            <input type="submit" value="Submit" />
        </form>
      </div>
    );

    if (this.state.showEnterStuName) return (
      <div className='App'>
        <form onSubmit={this.handleNameSubmit.bind(this)}>
          <label>
          What's your name? <br/>
          <input className='inputBox' type="text" value={this.state.name} onChange={this.handleNameChange.bind(this)} />
          </label>
        <input type="submit" value="Submit" />
        </form>
      </div>
  )

    if (this.state.showGetYourSeatButton) return (
      <div className='App'>
        <div className='NameNum'> 
            {this.state.currentStuName}, your random number is: 
              <br></br>
            <div className='Num'>{this.state.randomNumber}</div>    
        </div>
     
        <button className='letsGetStartedBt' onClick={this.numberRemover.bind(this)} >
        Next Student
        </button>
      </div>
  )

  if (this.state.showFinalList) return (
      <Tables
        combinedArrays = {this.state.combinedArrays}
        handleDelete= {this.handleDelete.bind(this)}
        showEditForm= {this.state.showEditForm}
        showEditFormBt= {this.showEditFormBt.bind(this)} 
        handleEditChange= {this.handleEditChange.bind(this)}  
        handleEditSubmit= {this.handleEditSubmit.bind(this)}
      /> )
    return null;
  }
}

export default App;