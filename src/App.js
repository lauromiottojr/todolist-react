import styles from './App.module.css';

import { useState, useEffect } from 'react';
import { BsTrash, BsBookmarkCheck, BsBookmarkCheckFill } from 'react-icons/bs'

const API = "http://localhost:5000";

function App() {

  const [title, setTitle] = useState("")
  const [time, setTime] = useState("")
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      const res = await fetch(API + '/todos')
        .then((resp) => resp.json())
        .then((data) => data)
        .catch((err) => console.log(err));
      setLoading(false)
      setTodos(res)
    }
    loadData();
  }, [])

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
    setTodos((prevState) => [...prevState, todo]);
    setTitle('')
    setTime('')
  };

  const handleDelete = async (id) => {
    await fetch(API + '/todos/' + id, {
      method: "DELETE"
    });
    setTodos((prevState) => prevState.filter((todo) => todo.id !== id));
  }

  if (loading) {
    return (<p>Carregando...</p>)
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
        <h2>Lista de tarefas:</h2>
        {todos.length === 0 && <p>Não há tarefas!</p>}
        {todos.map((todo) => (
          <div className={styles.todo} key={todo.id}>
            <h3 className={todo.done ? styles.todoDone : ''}>{todo.title}</h3>
            <p>Duração: {todo.time} horas</p>
            <div className={styles.actions}>
              <span>
                {!todo.done ? <BsBookmarkCheck /> : <BsBookmarkCheckFill />}
              </span>
              <BsTrash onClick={() => handleDelete(todo.id)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
