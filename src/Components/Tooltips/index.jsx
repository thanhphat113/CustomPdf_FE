import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setWidthDotItem,
    toggleBox,
    toggleDot,
    toggleElement,
} from "../../redux/Slices/DataSlice";
import "tippy.js/themes/light.css";
import TextInput from "../Inputs/TextInput";
import { cmToPx } from "../../Helpers/unitConverter";

function CheckboxTooltip({ children, id }) {
    const [checked, setChecked] = useState(false);
    const [widthDot, setWidthDot] = useState(0);
    const elements = useSelector((state) => state.data.elements);
    const selectedElement = elements.find((el) => el.id === id);

    const dispatch = useDispatch();

    const handleChange = (width, id) => {
        console.log(width,id)
        setWidthDot(width);
        dispatch(setWidthDotItem({width:cmToPx(width),id :id}));
    };


    const tooltipContent = (
        <div className="p-2 text-sm">
            <label className="flex items-center gap-2">
                <input
                    type="checkbox"
                    checked={selectedElement.trangThai}
                    onChange={() => dispatch(toggleElement(id))}
                />
                Tắt hiển thị
            </label>
            <div className="flex gap-2">
                <label className="flex items-center text-nowrap gap-3 mt-1">
                    <input
                        type="checkbox"
                        checked={selectedElement.dot.visible}
                        onChange={() => dispatch(toggleDot(id))}
                    />
                    Bật/tắt "..."
                </label>
                {selectedElement.dot.visible && (
                    <div>
                        <TextInput
                            className="ps-1 w-[3rem]"
                            text={widthDot}
                            id = {selectedElement.id}
                            onChange={handleChange}
                            placeholder="Nhập kích thước... "
                        />
                        (cm)
                    </div>
                )}
            </div>
            <label className="flex items-center gap-2 mt-1">
                <input
                    type="checkbox"
                    checked={selectedElement.box.visible}
                    onChange={() => dispatch(toggleBox(id))}
                />
                Bật/tắt ô trống
            </label>
        </div>
    );

    return (
        <div className="absolute w-[15rem]">
            <Tippy
                content={tooltipContent}
                interactive={true} // Cho phép tương tác bên trong
                placement="top"
                arrow={true}
                theme="light"
            >
                {children}
            </Tippy>
        </div>
    );
}

export default CheckboxTooltip;
