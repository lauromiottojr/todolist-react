import styles from "./Inputs.module.css"

function Inputs({ name, text, type, placeholder }) {

    return (
        <div className={styles.formControl}>
            <label htmlFor={name}>{text}</label>
            <input type={type} name={name} placeholder={placeholder} />
        </div>
    )
}

export default Inputs