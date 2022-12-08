import styles from './App.module.css';

import { useState, useEffect } from 'react';
import { BsTrash, BsBookmarkCheck, BsBookmarkCheckFill } from 'react-icons/bs'

const API = "htpp://localhost:5000";

function App() {

  const [title, setTitle] = useState("")
  const [time, setTime] = useState("")
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(false)




  return (
    <div className={styles.app}>
      <div className={styles.todoHeader}>
        <h1>Todo</h1>
      </div>
      <div className={styles.todoForm}>
        <p>form</p>
      </div>
      <div className={styles.todoForm}>
        <p>lista</p>
      </div>
    </div>
  );
}

export default App;
