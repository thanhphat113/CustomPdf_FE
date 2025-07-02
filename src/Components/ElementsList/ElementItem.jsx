import { useDispatch } from "react-redux";
import { toggleElement } from "../../redux/Slices/DataSlice";

function ElementItem({element}) {
    const dispatch = useDispatch();

    return (
        <div className="h-[3.5rem] items-center ps-2 flex gap-3 w-full border-t border-b border-gray-200">
            <input type="checkbox" checked={element.trangThai} onChange={e => {dispatch(toggleElement(element.idThuocTinh))}}/>
            <span className="text-xl">{element.noiDung}</span>
        </div>
    );
}

export default ElementItem;
