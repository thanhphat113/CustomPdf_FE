function Button({action, text, className}) {
	return ( 
		<button onClick={action} className={` cursor-pointer hover:shadow-[0_0_10px_rgba(0,0,0,0.3)] ${className}`}>{text}</button>
	 );
}

export default Button;