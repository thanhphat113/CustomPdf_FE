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
import { moveCol, movePositionCol } from "../../redux/Slices/DataSlice";
import Draggable from "react-draggable";
import SortableColumn from "./SortableColumn";
import { GroupCol } from "../../Helpers/GroupCol";
import { useEffect, useRef } from "react";

function TableElement({ table, handleDrag, handleStop, refParent }) {
    // const tableAfterChange = GroupCol(table.columns);

    const positionRef = useRef([]);
    const dispatch = useDispatch();
    const sensors = useSensors(useSensor(PointerSensor));

    const handleDragEnd = (e) => {
        const { active, over } = e;
        if (!over) return;

        dispatch(moveCol({ id: table.idThuocTinh, active, over }));
    };

    useEffect(() => {
        positionRef.current = table.cots;
        console.log(positionRef.current)

        // console.log(positionRef.current.map(item => ({...item, x : item.})))
    }, [table.cots]);

    const handlePositionChange = (idCot, rectChild) => {
            const rect = refParent.current.getBoundingClientRect()
            dispatch(movePositionCol({id: table.idThuocTinh,position: {x:rectChild.x - rect.x , y:rectChild.y- rect.y, rong: rectChild.width },idCot}))
};


    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <Draggable
                onStop={() => handleStop(table.idThuocTinh)}
                onDrag={(e, data) => handleDrag(e, data, table.idThuocTinh)}
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
                                items={Array.from(table.cots).map(
                                    (col) => col.idCot
                                )}
                            >
                                {table.cots.map((item) => (
                                    <SortableColumn
                                        onPositionChange={handlePositionChange}
                                        col={item}
                                        key={item.idCot}
                                    />
                                ))}
                            </SortableContext>
                        </tr>
                    </thead>
                </table>
            </Draggable>
        </DndContext>
    );
}

export default TableElement;
