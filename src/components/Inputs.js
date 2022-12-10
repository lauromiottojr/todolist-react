import styles from "./Inputs.module.css"

function Inputs({ name, text, type, placeholder, handleOnChange, value }) {

    return (
        <div className={styles.formControl}>
            <label htmlFor={name}>{text}</label>
            <input type={type} name={name} placeholder={placeholder} onChange={handleOnChange}
                value={value} required/>
        </div>
    )
}

export default Inputs