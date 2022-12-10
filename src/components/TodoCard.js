import { BsTrash, BsBookmarkCheck, BsBookmarkCheckFill } from 'react-icons/bs'

import styles from './TodoCard.module.css'

function TodoCard({ id, done, title, time, handleOnEdit, handleOnDelete }) {

    return (
        <div className={styles.todo} key={id}>
            <h3 className={done ? styles.todoDone : ''}>{title}</h3>
            <p>Duração: {time} horas</p>
            <div className={styles.actions}>
                <span onClick={handleOnEdit}>
                    {!done ? <BsBookmarkCheck /> : <BsBookmarkCheckFill />}
                </span>
                <BsTrash onClick={() => {
                    handleOnDelete(id)
                }} />
            </div>
        </div>
    )
}

export default TodoCard