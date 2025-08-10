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

const borderWidth = 0.5;

function TableElement({ table, handleDrag, handleStop, refParent }) {
    const positionRef = useRef({});
    const prevPosRef = useRef({});
    const dispatch = useDispatch();
    const sensors = useSensors(useSensor(PointerSensor));

    const tableAfterGroup = GroupCol(table.cots);

    const handleDragEnd = (e) => {
        const { active, over } = e;
        if (!over) return;

        dispatch(moveCol({ id: table.idThuocTinh, active, over }));
    };

    const handlePositionChange = (idCot, rectChild) => {
        const rect = refParent.current.getBoundingClientRect();

        const x = rectChild.x - rect.x - borderWidth;
        const y = rectChild.y - rect.y - borderWidth;
        const rong = rectChild.width;
        const cao = rectChild.height;

        const prev = prevPosRef.current[idCot] || {};
        if (prev.x === x && prev.y === y && prev.rong === rong && prev.cao === cao) return;

        // Update cache
        prevPosRef.current[idCot] = { x, y, rong, cao };

        const listChild =
            positionRef.current &&
            Object.entries(positionRef.current).map(([id, el]) => {
                const rectItemChilCol = el.getBoundingClientRect();

                const x = rectItemChilCol.left - rect.left - borderWidth;
                const y = rectItemChilCol.top - rect.top - borderWidth;
                const rong = rectItemChilCol.width;
                const cao =rectItemChilCol.height;

                return {
                    id,
                    x,
                    y,
                    rong,
                    cao
                };
            });

        dispatch(
            movePositionCol({
                id: table.idThuocTinh,
                position: { x, y, rong, cao },
                child: listChild,
                idCot,
            })
        );
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
                                {tableAfterGroup.parents.map((item) => (
                                    <SortableColumn
                                        onPositionChange={handlePositionChange}
                                        col={item}
                                        key={item.idCot}
                                    />
                                ))}
                            </SortableContext>
                        </tr>
                        <tr>
                            {tableAfterGroup.childs.map((item) => (
                                <th
                                    key={item.idCot}
                                    className="border px-2 py-1 text-center cursor-move"
                                    ref={(el) => {
                                        if (el) {
                                            positionRef.current[item.idCot] =
                                                el;
                                        }
                                    }}
                                >
                                    {item.tenCot}
                                </th>
                            ))}
                        </tr>
                    </thead>
                </table>
            </Draggable>
        </DndContext>
    );
}

export default TableElement;
