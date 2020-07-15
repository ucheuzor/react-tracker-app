import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

export class CreateExercise extends Component {
    state = {
        username: '',
        description: '',
        duration: 0,
        date: new Date(),
        users: []
    }

    componentDidMount(){
        axios.get('http://localhost:5000/users')
        .then(res => {
            if(res.data.length > 0){
                this.setState({
                    users: res.data.map((user) => user.username),
                    username: res.data[0].username
                });
            }
        })
    }

    handleChange = (e) => {
        const {name, value} = e.target;

        this.setState({
            [name]: value
        })
    }

    onChangeDate = (date) => {
        this.setState({
            date: date
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
            const { ...exercise }= this.state;

            console.log(exercise);

          axios.post('http://localhost:5000/exercises/add', exercise)
          .then(res => console.log(res.data));

            setTimeout(() => {
                this.props.history.push('./');
            }, 2000);
    };

    render() {
        return (
         <div>
            <h3>Create New Exercise Log</h3>
            <form onSubmit={this.onSubmit}>
              <div className="form-group"> 
                <label>Username: </label>
               <select
                    required
                    className="form-control"
                    name = "username"
                    value={this.state.username}
                    onChange={this.handleChange}>
                    {
                        this.state.users.map((user, index) => {
                        return <option 
                            key={index}
                            value={user}>{user}
                            </option>;
                        })
                    }
               </select>
             </div>
            <div className="form-group"> 
              <label>Description: </label>
                <input  
                    type="text"
                    name ="description"
                    required
                    className="form-control"
                    value={this.state.description}
                    onChange={this.handleChange}
                    />
                </div>
            <div className="form-group">
            <label>Duration (in minutes): </label>
                <input 
                    type="text" 
                    className="form-control"
                    name ="duration"
                    value={this.state.duration}
                    onChange={this.handleChange}
                    />
                </div>
            <div className="form-group">
                <label>Date: </label>
                <div>
                    <DatePicker
                    selected={this.state.date}
                    onChange={this.onChangeDate}
                    />
                </div>
            </div>

            <div className="form-group">
                <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
            </div>
      </form>
    </div>
        )
    }
}

export default CreateExercise;
