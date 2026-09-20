import styles from './Input.module.css'

interface PropTypes {
    label?: string;
    type?: string;
    name: string;
    id: string;
    required?: boolean;
    placeholder?: string;
    className?: string;
}
const Input = (props: PropTypes) =>{
    const { label, type, name, id, required, placeholder, className } = props;
    return (
        <label htmlFor={id} className={styles.label}>
            {label}
            <input type={type} name={name} id={id} className={`${styles.input} ${className}`} placeholder={placeholder} required={required} />
        </label>
    )
}

export default Input;