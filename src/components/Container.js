import styles from "./Container.module.css"

function Container(props) {
    return (
        <div className={styles.todoForm}>
            <h2>Insira sua próxima tarefa:</h2>
            {props.children}
        </div>
    )
}
export default Container