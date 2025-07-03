import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setWidthBoxsItem,
    setWidthDotItem,
    toggleBox,
    toggleDot,
    toggleElement,
    toggleStt,
} from "../../redux/Slices/DataSlice";
import "tippy.js/themes/light.css";
import TextInput from "../Inputs/TextInput";
import { cmToPx } from "../../Helpers/unitConverter";

function CheckboxTooltip({ children, id }) {
    const [widthDot, setWidthDot] = useState(0);
    const [widthBoxs, setWidthBoxs] = useState("");
    const elements = useSelector((state) => state.data.elements);
    const selectedElement = elements.find((el) => el.idThuocTinh === id);

    const dispatch = useDispatch();

    const handleChangeDot = (width, id) => {
        setWidthDot(width);
        dispatch(setWidthDotItem({ width: cmToPx(width), id: id }));
    };

    const handleChangeBoxs = (width, id) => {
        setWidthBoxs(width);
        dispatch(setWidthBoxsItem({ width: width, id: id }));
    };

    const tooltipContent = (
        <div className={`p-2 text-sm`}>
            <label className="flex items-center gap-2">
                <input
                    type="checkbox"
                    checked={selectedElement.trangThai}
                    onChange={() => dispatch(toggleElement(id))}
                />
                Tắt hiển thị
            </label>
            <div className="flex gap-2">
                <label className="flex items-center text-nowrap gap-3 mt-2">
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
                            id={selectedElement.idThuocTinh}
                            onChange={handleChangeDot}
                            placeholder="Nhập kích thước... "
                        />
                        (cm)
                    </div>
                )}
            </div>
            <label className="flex items-center gap-2 mt-1">
                <input
                    type="checkbox"
                    checked={selectedElement.stt}
                    onChange={() => dispatch(toggleStt(id))}
                />
                Bật/tắt số thứ tự
            </label>
            <div className="flex gap-2 mt-2">
                <label className="flex items-center gap-2 mt-1">
                    <input
                        type="checkbox"
                        checked={selectedElement.box.visible}
                        onChange={() => dispatch(toggleBox(id))}
                    />
                    Bật/tắt ô trống
                </label>
                {selectedElement.box.visible && (
                    <div>
                        <div>
                            <TextInput
                                className="ps-1 w-[7rem]"
                                text={widthBoxs}
                                id={selectedElement.idThuocTinh}
                                onChange={handleChangeBoxs}
                                placeholder="Nhập kích thước..."
                            />
                            (cm)
                        </div>
                        <span>Ví dụ:1-2 (có 2 ô lần lượt là 1cm và 2cm)</span>
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div className="absolute h-[40px] min-w-[20rem]">
            <Tippy
                content={tooltipContent}
                interactive={true} // Cho phép tương tác bên trong
                placement="top"
                arrow={true}
                theme="light"
                className=" opacity-100"
                appendTo={document.body}
            >
                {children}
            </Tippy>
        </div>
    );
}

export default CheckboxTooltip;
