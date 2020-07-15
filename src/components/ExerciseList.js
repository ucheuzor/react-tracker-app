import React, { Component } from 'react';
import Exercise from './Exercise';
import axios from 'axios'

export class ExerciseList extends Component {
    state = {
        exercises: []
    }

    componentDidMount(){
        axios.get('http://localhost:5000/exercises')
            .then(res => this.setState({
                exercises: res.data
            }))
            .catch(err => console.log(`there is an ${err}`));
    }

    deleteExercise = (id) => {
        axios.delete(`http://localhost:5000/exercises/${id}`)
            .then(res => console.log(res.data));

            this.setState({
                exercises: this.state.exercises.filter(el => el._id !== id)
            })
    }

    exerciseList = () => {
        const {exercises} = this.state;

        return exercises.map(currentexercise => {
            return <Exercise 
                exercise = {currentexercise} 
                key = {currentexercise._id} 
                deleteExercise = {this.deleteExercise}
            />
        })
    }

    render() {
        return (
            <div>
               <h3>Logged Exercises</h3>
               <table className = 'table'>
                    <thead className ="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.exerciseList()}
                    </tbody>
               </table>
            </div>
        )
    }
}

export default ExerciseList
