import Draggable from "react-draggable";
import CheckboxTooltip from "../Tooltips";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { changeWidth } from "../../redux/Slices/DataSlice";

function SimpleElements({ item, elementsWithSTT, handleStop, handleDrag }) {
    const boxRef = useRef(null);
    const [resizing, setResizing] = useState(false);
    const dispatch = useDispatch();

    const handleMouseUp = () => {
        if (resizing && boxRef.current) {
            const newWidth = boxRef.current.offsetWidth;
            dispatch(changeWidth({ id: item.idThuocTinh, width: newWidth }));
            setResizing(false);
        }
    };

    useEffect(() => {
        window.addEventListener("mouseup", handleMouseUp);
        return () => {
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [resizing]);

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
                    <div
                        ref={boxRef}
                        onMouseDown={(e) => {
                            if (e.target.classList.contains("resize-x")) {
                                setResizing(true);
                            }
                        }}
                        className="resize-x p-2 w-[8rem]  hover:border-black border-transparent border border-dotted overflow-auto cursor-move"
                        style={{ width: item.rong }}
                    >
                        {item.tenLoai === "title" ? (
                            <span
                                style={{ fontSize: item.fontSize }}
                                className="handle block w-full h-full font-bold uppercase"
                            >
                                {item.noiDung}
                            </span>
                        ) : (
                            <span className="handle whitespace-nowrap ">
                                {(() => {
                                    {
                                        /* if (item.tenLoai === "title") */
                                    }
                                    const activeIndex =
                                        elementsWithSTT.findIndex(
                                            (e) =>
                                                e.idThuocTinh ===
                                                item.idThuocTinh
                                        );
                                    if (activeIndex !== -1)
                                        return `(${activeIndex + 1})`;
                                    return "";
                                })()}{" "}
                                {item.noiDung}:
                            </span>
                        )}
                    </div>
                </CheckboxTooltip>
            </div>
        </Draggable>
    );
}

export default SimpleElements;
