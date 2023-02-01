import styles from "./TextInput.module.css";

export type TextInputProps = {
    value?: string;
    placeholder: string;
    onChange: (value: string) => void;
    isSecure?: boolean;
};

export default function TextInput({
    placeholder,
    onChange,
    isSecure = false,
    value = "",
}: TextInputProps) {
    return (
        <div className={styles.container}>
            <label htmlFor={placeholder} className={styles.inp}>
                {placeholder}
            </label>
            <input
                id={placeholder}
                placeholder="&nbsp;"
                type={isSecure ? "password" : "text"}
                defaultValue={value}
                onChange={(e) => {
                    onChange(e.currentTarget.value);
                }}
            />
            <span className={styles.label}></span>
            <span className={styles.focus_bg}></span>
        </div>
    );
}
