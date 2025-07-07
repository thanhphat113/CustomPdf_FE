import { useSelector } from "react-redux";
import TextInput from "../Inputs/TextInput";
import ElementItem from "./ElementItem";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function ElementsList() {
    const elements = useSelector((state) => state.data.elements);
    const { isLoading } = useSelector((state) => state.announcement);

    return (
        <div className="w-[95%] h-[70%] flex flex-col">
            {/* <TextInput
                className="w-full h-[2.5rem] ps-1 "
                placeholder="Nhập tên thuộc tính..."
            /> */}
            <div className={`border w-full max-h-[100%] overflow-y-auto`}>
                {elements.map((element) => (
                    <ElementItem key={element.idThuocTinh} element={element} />
                ))}
            </div>
        </div>
    );
}

export default ElementsList;
