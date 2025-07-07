import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";



function OnlyTextTooltip({text, children}) {
	const tooltipContent = (<div className="p-2"><span>{text}</span></div>)
	return (
            <Tippy
                content={tooltipContent}
                placement="top"
                arrow={true}
                theme="light"
                className=" opacity-100"
                // appendTo={document.body}
            >
            	<div>{children}</div>
            </Tippy>
    );
}

export default OnlyTextTooltip;