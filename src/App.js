import styles from './App.module.css';

import { useState, useEffect } from 'react';
import { BsTrash, BsBookmarkCheck, BsBookmarkCheckFill } from 'react-icons/bs'
import Header from './components/Header';
import Container from './components/Container';
import Input from './components/Input';

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

  const handleEdit = async (todo) => {
    todo.done = !todo.done;
    const data = await fetch(API + '/todos/' + todo.id, {
      method: "PUT",
      body: JSON.stringify(todo),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setTodos((prevState) => prevState.map((t) => (t.id === data.id ? (t === data) : t)));
  }

  if (loading) {
    return (<p>Carregando...</p>)
  }

  function handleChange(e) {
    e.target.name === 'title' ? setTitle(e.target.value) : setTime(e.target.value)
  }

  return (
    <div className={styles.app}>
      <Header />

      <Container>
        <form onSubmit={handleSubmit}>
          <Input name='title' text='O que você irá fazer?' type='text' placeholder='Titulo da tarefa'
            handleOnChange={handleChange} value={title ? title : ''} />
          <Input name='time' text='Duração:' type='text' placeholder='Tempo estimado (em horas)'
            handleOnChange={handleChange} value={time ? time : ''} />
          <Input type='submit' value="Criar nova tarefa" />
        </form>
      </Container>

      <div className={styles.todoList}>
        <h2>Lista de tarefas:</h2>
        {todos.length === 0 && <p>Não há tarefas!</p>}
        {todos.map((todo) => (
          <div className={styles.todo} key={todo.id}>
            <h3 className={todo.done ? styles.todoDone : ''}>{todo.title}</h3>
            <p>Duração: {todo.time} horas</p>
            <div className={styles.actions}>
              <span onClick={() => handleEdit(todo)}>
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
