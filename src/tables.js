import React, { Component } from 'react';
import { range } from 'underscore';
import './App.css';

class Tables extends Component {
  
 handleEdit(el){
  this.props.showEditFormBt(el)
}

renderNumbers(){ 
  return this.props.combinedArrays.map((el, index) => ( 
         <tr style={{cursor: "pointer"}} onClick={this.handleEdit.bind(this, el)} key={index}><td>{el[1]}</td></tr>   ))                  
  }

renderNames(){        
        return this.props.combinedArrays.map((el, index) => ( 
        <tr  key={index}><td>{el[0]}</td></tr> ))     
}

handleDelete(id){ this.props.handleDelete(id) }


render() {

    if(this.props.showEditForm) return (
     
     <div className='backdropStyle'>
      <div className='modalStyle' >      
        <form onSubmit={this.props.handleEditSubmit}>
          <label>
            What's the new name? <br/>
            <input className='inputBox editBox' type="text"  onChange={this.props.handleEditChange} />
          </label>
            <input type="submit" value="Submit" />
        </form>
      </div>  
    </div>  )

    return ( <div className='App table-page'>
        
    <table>
      <thead>
        <tr>
          <th>Numbers</th>
        </tr>
      </thead>
      <tbody>
        {this.renderNames()}
      </tbody>
    </table>

    <table>
      <thead>
        <tr>
          <th>Names</th>
        </tr>
      </thead>
      <tbody>
        {this.renderNumbers()}  
      </tbody>
    </table>
            
    <table>
      <thead>
        <tr>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        { range(this.props.combinedArrays.length).map((el,index) =>{
          return (           
            <tr key={index}>
              <td style={{cursor: "pointer"}} onClick={this.handleDelete.bind(this, el)}>
                <i className="fa fa-trash" aria-hidden="true"></i>               
              </td>
            </tr> )
              })} 
      </tbody>
    </table> 
  </div>)
  }
}

export default Tables;




