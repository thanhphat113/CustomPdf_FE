import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// Khởi tạo nhóm với cột con
const initialGroups = [
  { id: "A", columns: ["D"] },
  { id: "B", columns: ["E"] },
  { id: "C", columns: ["F", "G", "H"] },
];

function SortableGroup({ id }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id, data: { type: "group" } });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <th
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      colSpan={id === "C" ? 3 : 1}
      className="bg-gray-200 px-4 py-2 border text-center cursor-move"
      style={style}
    >
      {id}
    </th>
  );
}

function SortableColumn({ id }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id, data: { type: "column" } });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <th
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="border px-2 py-1 text-center cursor-move"
      style={style}
    >
      {id}
    </th>
  );
}

export default function TableWithColspanDrag() {
  const [groups, setGroups] = useState(initialGroups);
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;
    const type = active.data.current.type;

    if (type === "group") {
      // Reorder nhóm
      const oldIndex = groups.findIndex((g) => g.id === active.id);
      const newIndex = groups.findIndex((g) => g.id === over.id);
      setGroups((g) => arrayMove(g, oldIndex, newIndex));
    } else {
      // Reorder cột con trong cùng nhóm
      setGroups((prev) => {
        const next = [...prev];
        // Tìm index nhóm chứa active, nhóm chứa over
        const srcGroupIndex = next.findIndex((g) =>
          g.columns.includes(active.id)
        );
        const dstGroupIndex = next.findIndex((g) =>
          g.columns.includes(over.id)
        );
        const srcCols = [...next[srcGroupIndex].columns];
        const dstCols =
          srcGroupIndex === dstGroupIndex
            ? srcCols
            : [...next[dstGroupIndex].columns];

        const oldIdx = srcCols.indexOf(active.id);
        const newIdx = dstCols.indexOf(over.id);
        const [moved] = srcCols.splice(oldIdx, 1);
        dstCols.splice(newIdx, 0, moved);

        next[srcGroupIndex] = {
          ...next[srcGroupIndex],
          columns: srcCols.filter((c) => c !== moved),
        };
        next[dstGroupIndex] = {
          ...next[dstGroupIndex],
          columns: dstCols,
        };
        return next;
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <table className="table-auto border w-full">
        <thead>
          {/* Kéo nhóm (A, B, C) */}
          <SortableContext
            items={groups.map((g) => g.id)}
            strategy={horizontalListSortingStrategy}
          >
            <tr>
              {groups.map((g) => (
                <SortableGroup key={g.id} id={g.id} />
              ))}
            </tr>
          </SortableContext>

          {/* Kéo cột con trong từng nhóm */}
          <SortableContext
            items={groups.flatMap((g) => g.columns)}
            strategy={horizontalListSortingStrategy}
          >
            <tr>
              {groups.flatMap((g) =>
                g.columns.map((col) => (
                  <SortableColumn key={col} id={col} />
                ))
              )}
            </tr>
          </SortableContext>
        </thead>
        <tbody>
          <tr>
            {groups.flatMap((g) =>
              g.columns.map((col) => (
                <td key={col} className="border text-center px-2 py-1">
                  {/* Ví dụ dữ liệu */}
                  {col}
                </td>
              ))
            )}
          </tr>
        </tbody>
      </table>
    </DndContext>
  );
}
