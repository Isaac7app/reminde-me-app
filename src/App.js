import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import About from './components/About';
import Footer from './components/Footer';
import AddTask from './components/AddTask';

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [ tasks, setTasks ] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  }, []);

  //Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = res.json()
    return data;
  }   

  //Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = res.json()
    return data;
  }   


//Add Task
const addTask = async (task) => {
  const res = await fetch('http://localhost:5000/tasks',{
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(task),
  })

  const data = await res.json()

  setTasks([...tasks, data])

  // Made a generated id //
  // const id = Math.floor(Math.random() * 10000) + 1
  // const newTask = { id, ...task }
  // setTasks([...tasks, newTask])
}


//Delete Task From List
const deleteTask = async (id) => {
  await fetch(`http://localhost:5000/tasks/${id}`, 
  {method: 'DELETE',})

  setTasks(tasks.filter((task) => task.id !== id));
}

//Toggle Rimder
const toggleReminder = async (id) =>{
  const taskToToggle = await fetchTask(id)
  const updTask = { ...taskToToggle,
  reminder: !taskToToggle.reminder }

  const res = await fetch(`http://localhost:5000/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(updTask)
  })

  const data = await res.json()

  setTasks(tasks.map((task) => 
  task.id === id ? 
  { ...task, reminder: !data.reminder} :
   task
   )
   );
}

  return (
    <Router>
      <div className="container">
        <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
        <Routes>
          <Route path='/'
            element={
        <>
            {showAddTask && <AddTask onAdd={addTask} />}
            { tasks.length > 0 ?
              <Tasks tasks={tasks}
              onDelete={deleteTask}
              onToggle={toggleReminder}/> :
              'No Reminder To Show Please Add' 
              }
        </>
        } 
        />
      
        <Route path='/about' element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
