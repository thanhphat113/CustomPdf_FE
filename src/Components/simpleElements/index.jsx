import Draggable from "react-draggable";
import CheckboxTooltip from "../Tooltips";

function SimpleElements({ item, elementsWithSTT, handleStop, handleDrag }) {
    return (
        <Draggable
            onStop={() => handleStop(item.id)}
            onDrag={(e, data) => handleDrag(item.id, e, data)}
            position={{ x: item.x, y: item.y }}
            bounds="parent"
        >
            <div className="absolute select-none">
                <CheckboxTooltip id={item.id}>
                    <span className="hover:border-black border-transparent border border-dotted cursor-move whitespace-nowrap">
                        {(() => {
                            const activeIndex = elementsWithSTT.findIndex(
                                (e) => e.id === item.id
                            );
                            if (activeIndex !== -1)
                                return `(${activeIndex + 1})`;
                            return "";
                        })()}{" "}
                        {item.text} :
                    </span>
                </CheckboxTooltip>
            </div>
        </Draggable>
    );
}

export default SimpleElements;
