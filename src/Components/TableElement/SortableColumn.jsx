import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useEffect, useRef } from "react";

function SortableColumn({ col, onPositionChange }) {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: col.idCot });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };
    const thRef = useRef(null); 

    useEffect(() => {
        if (thRef.current && onPositionChange) {
            const rect = thRef.current.getBoundingClientRect();
            onPositionChange(col.idCot, rect);
        }
    }, [col.idCot, onPositionChange]);


    return (
        <th
            ref={(node) => {
                setNodeRef(node);   // dnd-kit ref
                thRef.current = node; // ref để lấy tọa độ
            }}
            {...attributes}
            {...listeners}
            className="border px-2 py-1 text-center cursor-move"
            style={style}
            // colSpan={col.colSpan}
            // rowSpan={col.rowSpan}
        >
            {col.tenCot}
        </th>
    );
}

export default SortableColumn;
