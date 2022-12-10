import styles from "./Input.module.css"

function Input({ name, text, type, placeholder, handleOnChange, value }) {

    return (
        <div className={styles.formControl}>
            <label htmlFor={name}>{text}</label>
            <input type={type} name={name} placeholder={placeholder} onChange={handleOnChange}
                value={value} required/>
        </div>
    )
}

export default Input