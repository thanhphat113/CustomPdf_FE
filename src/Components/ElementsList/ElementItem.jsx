import { useDispatch } from "react-redux";
import { toggleElement } from "../../redux/Slices/DataSlice";

function ElementItem({element}) {
    const dispatch = useDispatch();

    return (
        <div className="h-[3.5rem] items-center ps-2 flex gap-3 w-full border-t border-b border-gray-200">
            <input type="checkbox" checked={element.trangThai === 1} onChange={e => {dispatch(toggleElement(element.id))}}/>
            <span className="text-xl">{element.text}</span>
        </div>
    );
}

export default ElementItem;
