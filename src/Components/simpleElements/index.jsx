import Draggable from "react-draggable";
import CheckboxTooltip from "../Tooltips";

function SimpleElements({ item, elementsWithSTT, handleStop, handleDrag }) {
    return (
        <Draggable
            onStop={() => handleStop(item.idThuocTinh)}
            onDrag={(e, data) => handleDrag(e, data, item)}
            position={{ x: item.x, y: item.y }}
            bounds="parent"
            handle=".handle"
        >
            <div className="absolute select-none">
                <CheckboxTooltip id={item.idThuocTinh}>
                    <span className="handle hover:border-black border-transparent border border-dotted cursor-move whitespace-nowrap">
                        {(() => {
                            const activeIndex = elementsWithSTT.findIndex(
                                (e) => e.idThuocTinh === item.idThuocTinh
                            );
                            if (activeIndex !== -1)
                                return `(${activeIndex + 1})`;
                            return "";
                        })()}{" "}
                        {item.noiDung}:
                    </span>
                </CheckboxTooltip>
            </div>
        </Draggable>
    );
}

export default SimpleElements;
