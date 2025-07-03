function Button({action, text, className}) {
	console.log(action)
	return ( 
		<button onClick={action} className={`border hover:scale-[1.1] cursor-pointer hover:shadow-[0_0_10px_rgba(0,0,0,0.3)] ${className}`}>{text}</button>
	 );
}

export default Button;