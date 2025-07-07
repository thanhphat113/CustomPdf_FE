import { useState } from "react";
import Button from ".";

function DropdownButton({ text, className, Actions }) {
    const [isDrop, setIsDrop] = useState(false);
    return (
        <div>
            <div className={`${className} min-w-[4rem] hover:shadow-[0_0_10px_rgba(0,0,0,0.3)] cursor-pointer`} onClick={() => setIsDrop(!isDrop)} >{text} {isDrop ? <i className="fa-solid fa-caret-down"></i> : <i className="fa-solid fa-caret-right"></i>}</div>
            {isDrop && (
                <div className="absolute flex flex-col bg-white overflow-hidden shadow-[0_0_10px_rgba(0,0,0,0.3)] rounded">
                    {Actions.map((item, idx) => (
                        <Button
                            key={idx}
                            text={item.text}
                            className={item.className}
                            action={item.action}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default DropdownButton;
