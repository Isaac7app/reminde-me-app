import React from 'react';
import Tasklist from './Tasklist';


const Tasks = ({ tasks, onDelete, onToggle }) => {
  return (
    <>
      {tasks.map((task) => 
      <h3 key={task.id}>
        <Tasklist task={task} 
        onDelete={onDelete}
        onToggle={onToggle}/>
      </h3>)}
    </>
  )
}

export default Tasks;