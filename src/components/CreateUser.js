import React, { Component } from 'react';
import axios from 'axios';

export class CreateUser extends Component {
    state = {
        username: ''
    }

    createUser = (e) => {
        const {name, value} = e.target;
        this.setState({
            [name]: value
        });
    }

    handleSubmit = (e) =>{
        e.preventDefault();

        const user = this.state;
        console.log(user);

        axios.post('http://localhost:5000/users/add', user)
             .then((res) => console.log(res.data))
             .catch(err => console.log('User already exist'));
        
        this.setState({
            username: ''
        });
    };

    render() {
        return (
            <div>
                <h3>Create New User</h3>
                <form onSubmit ={this.handleSubmit}>
                   <div  className ="form-group">
                      <label>Username: </label>
                      <input 
                         type = "text"
                         className ="form-control"
                         value = {this.state.username}
                         onChange = {this.createUser}
                         name ="username"
                         required
                      />
                   </div>
                   <div className ="form-group">
                       <input 
                          type = "submit"
                          value = "Create User"
                          className = "btn btn-primary"
                       />
                   </div>
                </form>
            </div>
        )
    }
}

export default CreateUser
