import styles from './App.module.css';

import { useState, useEffect } from 'react';
import { BsTrash, BsBookmarkCheck, BsBookmarkCheckFill } from 'react-icons/bs'

const API = "http://localhost:5000";

function App() {

  const [title, setTitle] = useState("")
  const [time, setTime] = useState("")
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const todo = {
      id: Math.random(),
      title,
      time,
      done: false
    };
    await fetch(API + '/todos', {
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setTitle('')
    setTime('')
  }



  return (
    <div className={styles.app}>

      <div className={styles.todoHeader}>
        <h1>Todo</h1>
      </div>

      <div className={styles.todoForm}>
        <h2>Insira sua próxima tarefa:</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formControl}>
            <label htmlFor='title'>O que você irá fazer?</label>
            <input type="text" name="title" placeholder='Titulo da tarefa'
              onChange={(e) => setTitle(e.target.value)} value={title || ''} required />
          </div>

          <div className={styles.formControl}>
            <label htmlFor='time'>Duração:</label>
            <input type="text" name="time" placeholder='Tempo estimado (em horas)'
              onChange={(e) => setTime(e.target.value)} value={time || ''} required />
          </div>

          <input type="submit" value="Criar tarefa" />

        </form>
      </div>

      <div className={styles.todoList}>
        <h2>list</h2>
        {todos.length === 0 && <p>Não há tarefas!</p>}
      </div>
    </div>
  );
}

export default App;
