import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChromePicker } from "react-color";
import {
    changeColor,
    changeColorGiaTri,
    changeFontSize,
    changeFontSizeGiaTri,
    setWidthBoxsItem,
    setWidthDotItem,
    toggleBold,
    toggleBoldGiaTri,
    toggleBox,
    toggleDot,
    toggleElement,
    toggleItalic,
    toggleItalicGiaTri,
    toggleStt,
    toggleUnderline,
    toggleUnderlineGiaTri,
    toggleUpperCase,
    toggleUpperCaseGiaTri,
} from "../../../redux/Slices/DataSlice";
import "tippy.js/themes/light.css";
import TextInput from "../../Inputs/TextInput";
import { cmToPx, ptToPx } from "../../../Helpers/unitConverter";
import CheckBox from "../../CheckBox";
import OnlyTextTooltip from "../OnlyTextTooltip";

function CustomTextTooltip({ children, id }) {
    const [widthDot, setWidthDot] = useState(0);
    const [widthBoxs, setWidthBoxs] = useState("");
    const [displayColor, setDisplayColor] = useState(false);
    const [displayValueColor, setDisplayValueColor] = useState(false);
    const elements = useSelector((state) => state.data.elements);
    const selectedElement = elements.find((el) => el.idThuocTinh === id);

    const styleTextElement = [
        {
            text: "In đậm (B)",
            checkIcon: "fa-solid fa-bold",
            value: selectedElement.inDam,
            action: () => dispatch(toggleBold(id)),
        },
        {
            text: "In nghiêng (I)",
            checkIcon: "fa-solid fa-italic",
            value: selectedElement.nghieng,
            action: () => dispatch(toggleItalic(id)),
        },
        {
            text: "Gạch chân (U)",
            checkIcon: "fa-solid fa-underline",
            value: selectedElement.gachChan,
            action: () => dispatch(toggleUnderline(id)),
        },
        {
            text: "Toàn bộ viết hoa",
            checkIcon: "fa-solid fa-expand",
            value: selectedElement.upperCase,
            action: () => dispatch(toggleUpperCase(id)),
        },
    ];

    const styleValueOfElement = [
        {
            text: "In đậm (B)",
            checkIcon: "fa-solid fa-bold",
            value: selectedElement.inDamGiaTri,
            action: () => dispatch(toggleBoldGiaTri(id)),
        },
        {
            text: "In nghiêng (I)",
            checkIcon: "fa-solid fa-italic",
            value: selectedElement.inNghiengGiaTri,
            action: () => dispatch(toggleItalicGiaTri(id)),
        },
        {
            text: "Gạch chân (U)",
            checkIcon: "fa-solid fa-underline",
            value: selectedElement.gachChanGiaTri,
            action: () => dispatch(toggleUnderlineGiaTri(id)),
        },
        {
            text: "Toàn bộ viết hoa",
            checkIcon: "fa-solid fa-expand",
            value: selectedElement.upperCaseGiaTri,
            action: () => dispatch(toggleUpperCaseGiaTri(id)),
        },
    ];

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
        <div className={`p-2 text-sm grid grid-cols-2`}>
            <div className="border-r">
                <span className="block w-full text-center italic">
                    (Thuộc tính)
                </span>
                <div className="flex gap-1">
                    {styleTextElement.map((item, idx) => (
                        <OnlyTextTooltip key={idx} text={item.text}>
                            <CheckBox
                                value={item.value}
                                checkIcon={item.checkIcon}
                                action={item.action}
                            />
                        </OnlyTextTooltip>
                    ))}
                </div>
                <div className="flex gap-1">
                    <div>
                        <CheckBox
                            value={displayColor}
                            action={() => setDisplayColor(!displayColor)}
                            checkIcon={"fa-solid fa-palette"}
                        />
                        {displayColor && (
                            <ChromePicker
                                className="absolute"
                                color={selectedElement.mau}
                                onChange={(updatedColor) =>
                                    dispatch(
                                        changeColor({
                                            id: id,
                                            color: updatedColor.hex,
                                        })
                                    )
                                }
                            />
                        )}
                    </div>
                    <CheckBox
                        value={selectedElement.trangThai}
                        checkIcon="fa-solid fa-eye"
                        unCheckIcon="fa-solid fa-eye-slash"
                        action={() => dispatch(toggleElement(id))}
                    />
                </div>
                <input
                    type="text"
                    className="border mt-2 me-2 ps-1"
                    placeholder="Nhập cỡ chữ..."
                    value={selectedElement.fontSize}
                    onChange={(e) => dispatch(changeFontSize({id: id, fontSize: e.target.value}))}
                ></input>
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
                            <span>
                                Ví dụ:1-2 (có 2 ô lần lượt là 1cm và 2cm)
                            </span>
                        </div>
                    )}
                </div>
            </div>
            <div>
                <span className="block w-full text-center italic">
                    (Giá trị)
                </span>

                <div className="flex gap-1">
                    {styleValueOfElement.map((item, idx) => (
                        <OnlyTextTooltip key={idx} text={item.text}>
                            <CheckBox
                                value={item.value}
                                checkIcon={item.checkIcon}
                                action={item.action}
                            />
                        </OnlyTextTooltip>
                    ))}
                </div>
                <div className="flex gap-1">
                    <div>
                        <CheckBox
                            value={displayValueColor}
                            action={() =>
                                setDisplayValueColor(!displayValueColor)
                            }
                            checkIcon={"fa-solid fa-palette"}
                        />
                        {displayValueColor && (
                            <ChromePicker
                                className="absolute"
                                color={selectedElement.mauGiaTri}
                                onChange={(updatedColor) =>
                                    dispatch(
                                        changeColorGiaTri({
                                            id: id,
                                            color: updatedColor.hex,
                                        })
                                    )
                                }
                            />
                        )}
                    </div>
                </div>
                <input
                    type="text"
                    className="border mt-2 ms-2 ps-1"
                    placeholder="Nhập cỡ chữ..."
                    value={selectedElement.fontSizeGiaTri}
                    onChange={(e) => dispatch(changeFontSizeGiaTri({id: id, fontSize: e.target.value}))}
                ></input>
                <span
                    style={{
                        fontWeight: selectedElement.inDamGiaTri
                            ? "bold"
                            : "normal",
                        fontStyle: selectedElement.inNghiengGiaTri
                            ? "italic"
                            : "normal",
                        textDecoration: selectedElement.gachChanGiaTri
                            ? "underline"
                            : "none",
                        fontSize: ptToPx(selectedElement.fontSizeGiaTri),
                        textTransform: selectedElement.upperCaseGiaTri
                            ? "uppercase"
                            : "none",
                        color: selectedElement.mauGiaTri,
                    }}
                    className="block w-full text-center mt-2"
                >
                    (Hiển thị mẫu)
                </span>
            </div>
        </div>
    );

    return (
        <div className="absolute h-[40px] min-w-[20rem]">
            <Tippy
                content={tooltipContent}
                interactive={true} // Cho phép tương tác bên trong
                placement="right"
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

export default CustomTextTooltip;
