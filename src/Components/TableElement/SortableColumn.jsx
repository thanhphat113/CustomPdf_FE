import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function SortableColumn({ col }) {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: col.colId });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <th
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            className="border px-2 py-1 text-center cursor-move"
            style={style}
            colSpan={col.colSpan}
            rowSpan={col.rowSpan}
        >
            {col.tenCot}
        </th>
    );
}

export default SortableColumn;
