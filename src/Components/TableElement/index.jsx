import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    SortableContext,
    horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDispatch } from "react-redux";
import { moveCol } from "../../redux/Slices/DataSlice";
import Draggable from "react-draggable";
import SortableColumn from "./SortableColumn";
import { GroupCol } from "../../Helpers/GroupCol";

function TableElement({ table, handleDrag, handleStop }) {
    const tableAfterChange = GroupCol(table.columns);

    const dispatch = useDispatch();
    const sensors = useSensors(useSensor(PointerSensor));

    const handleDragEnd = (e) => {
        const { active, over } = e;
        if (!over) return;

        dispatch(moveCol({ id: table.id, active, over }));
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <Draggable
                onStop={() => handleStop(table.id)}
                onDrag={(e, data) => handleDrag(table.id, e, data)}
                position={{ x: table.x, y: table.y }}
                bounds="parent"
                handle=".handle"
            >
                <table className="w-full absolute  z-1">
                    <div className="handle w-[0.6rem] h-[0.6rem] cursor-move border-t border absolute right-[-9px] text-[0.4rem] flex justify-center items-center top-full">
                        <i className="fa-solid fa-up-down-left-right"></i>
                    </div>

                    <thead className="text-center bg-gray-100">
                        <tr className="border text-center">
                            <SortableContext
                                strategy={horizontalListSortingStrategy}
                                items={tableAfterChange.parents.map(
                                    (col) => col.colId
                                )}
                            >
                                {tableAfterChange.parents.map((item, idx) => (
                                    <SortableColumn col={item} key={idx} />
                                ))}
                            </SortableContext>
                        </tr>

                        {tableAfterChange.childs && (
                            <tr className="border text-center">
                                    {tableAfterChange.childs.map(
                                        (item, idx) => (
                                            <th
                                                key={idx}
                                                className="border"
                                            >{item.tenCot}</th>
                                        )
                                    )}
                            </tr>
                        )}
                        {/* <tr className="border text-center">
                            <SortableContext
                                strategy={horizontalListSortingStrategy}
                                items={table.columns.map((col) => col.colId)}
                            >
                                {table.columns.map((col, idx) => (
                                    <SortableColumn col={col} key={idx} />
                                ))}
                            </SortableContext>
                        </tr> */}
                    </thead>
                </table>
            </Draggable>
        </DndContext>
    );
}

export default TableElement;
