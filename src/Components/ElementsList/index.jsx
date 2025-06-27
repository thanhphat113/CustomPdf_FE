import { useSelector } from "react-redux";
import TextInput from "../Inputs/TextInput";
import ElementItem from "./ElementItem";

function ElementsList() {
    const elements = useSelector((state) => state.data.elements);

    return (
        <div className="w-[95%] flex-1 flex flex-col">
            <TextInput
                className="w-full h-[2.5rem] ps-1 "
                placeholder="Nhập tên thuộc tính..."
            />
            <div className="border w-full max-h-[70%] overflow-auto">
                {elements.map((element) => (
                    <ElementItem key={element.id} element={element} />
                ))}
            </div>
        </div>
    );
}

export default ElementsList;
