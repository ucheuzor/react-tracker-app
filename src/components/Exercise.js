import React from 'react';
import {Link} from 'react-router-dom';

const Exercise = ({exercise, deleteExercise}) =>{
   
    return(
        <>
          <tr>
            <td>{exercise.username}</td>
            <td>{exercise.description}</td>
            <td>{exercise.duration}</td>
            <td>{exercise.date.substring(0, 10)}</td>
            <td>
                <Link to = {`/edit/${exercise._id}`}>Edit</Link> | <button onClick = { () => deleteExercise(exercise._id)}>Delete</button>
            </td>
          </tr>
        </>
    );
}

export default Exercise;