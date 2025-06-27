function TextInput({ className, text, id, onChange, placeholder }) {
    const handleChange = (e) => {
        const text = e.target.value;
        id ? onChange(text, id) : onChange(text);
    };

    return (
        <input
            className={`bg-white border-[1px] ${className}`}
            type="text"
            value={text}
            onChange={(e) => handleChange(e)}
            placeholder={placeholder}
        ></input>
    );
}

export default TextInput;
