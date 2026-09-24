import styles from './Select.module.css'

interface Option {
    value: string;
    label: string;
}

interface PropTypes {
    label?: string;
    name: string;
    id: string;
    required?: boolean;
    className?: string;
    option : Option[];
}

const Select = (props: PropTypes) => {
    const {label, name, id, required, className, option} = props;
    return (
        <label htmlFor={id} className={styles.label}>
            {label}
            <select name={name} id={id} required={required} className={`${styles.select} ${className}`}>
                {option.map((option: Option) => (
                    <option key={option.value} value={option.value}>{option.value}</option>
                ))}
            </select>
        </label>
    )
}

export default Select;