import styles from './Button.module.css';

interface PropTypes {
    type?: 'submit' | 'button' | 'reset';
    className?: string;
    onClick?: () => void;
    color?: 'sekunder' | 'primer';
    children?: string;
}

const Button = (props: PropTypes) => {
    const { type='button', color='primer', className, children } = props;
    return (
        <button className={`${styles.button} ${styles[`button-${color}`]} ${className}`} type={type} {...props}>{children}</button>
    )
}

export default Button;