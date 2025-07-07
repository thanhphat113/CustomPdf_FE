import { useEffect, useState } from "react";
import Input from "./Components/Inputs/TextInput";
import PdfPage from "./Components/pdfPage";
import SelectTypePdf from "./Components/Selects/SelectTypePdf";
import ElementsList from "./Components/ElementsList";
import { useDispatch, useSelector } from "react-redux";
import { saveAllElements, savePdfSize } from "./redux/Actions/DataAction";
import Announcement from "./Components/Announcement";
import { AnimatePresence } from "framer-motion";
import Button from "./Components/Button";
import DropdownButton from "./Components/Button/DropdownButton";
import { setWidthPdf,setHeightPdf } from "./redux/Slices/DataSlice";

function App() {
    const {elements, pdf } = useSelector((state) => state.data);
    const [widthMm, setWidthMm] = useState(pdf?.rong || 210);
    const [heightMm, setHeightMm] = useState(pdf?.dai || 297);

    useEffect(() => {
        dispatch(setWidthPdf(widthMm))
    },[widthMm])

    useEffect(() => {
        dispatch(setHeightPdf(widthMm))
    },[heightMm])

    const dispatch = useDispatch();
    const { isLoading, isSuccess, message } = useSelector(
        (state) => state.announcement
    );

    const saveElements = async () => {
        await dispatch(saveAllElements(elements));
    };

    const savePdf = async () => {
        await dispatch(savePdfSize(pdf));
    };

    const Actions = [
        {
            text: "Lưu vị trí các thuộc tính",
            className: "px-1 border-b text-left hover:bg-gray-200",
            action: () => saveElements(),
        },
        {
            text: "Lưu kích thước pdf",
            className: "px-1 text-left hover:bg-gray-200",
            action: () => savePdf(),
        },
    ];

    return (
        <div className="flex">
            <AnimatePresence>
                {message && (
                    <Announcement message={message} isSuccess={isSuccess} />
                )}
            </AnimatePresence>

            <aside className="bg-white h-screen py-6 w-70 flex flex-col items-center gap-5">
                <div className="flex justify-center gap-1">
                    <div>
                        <Input
                            text={widthMm}
                            onChange={setWidthMm}
                            className={`w-[4rem] text-center`}
                        ></Input>{" "}
                        <span>(mm)</span>
                    </div>
                    x
                    <div>
                        <Input
                            text={heightMm}
                            onChange={setHeightMm}
                            className={`w-[4rem] text-center`}
                        ></Input>{" "}
                        <span>(mm)</span>
                    </div>
                </div>
                <SelectTypePdf></SelectTypePdf>
                <ElementsList />
                <div className="flex gap-2">
                    <Button
                        text={"Gọi dữ liệu"}
                        className={"rounded px-1 border text-xl"}
                    ></Button>

                    <DropdownButton
                        Actions={Actions}
                        text={"Lưu"}
                        className={"px-1 border text-xl rounded"}
                    />
                </div>
            </aside>
            <div className="bg-[#808080] flex-1 h-screen justify-center overflow-auto">
                <PdfPage widthMm={widthMm} heightMm={heightMm}></PdfPage>
            </div>
        </div>
    );
}

export default App;

// import React, { useState } from 'react';
// import Draggable from 'react-draggable';

// const SNAP_TOLERANCE = 7;

// export default function SnapWithGuides() {
//   const [boxes, setBoxes] = useState([
//     { id: 1, x: 100, y: 100 },
//     { id: 2, x: 300, y: 200 },
//     { id: 3, x: 150, y: 350 }
//   ]);

//   const [guides, setGuides] = useState({ x: null, y: null });

//   const handleStop = () => {
//     setGuides({ x: null, y: null }); // ẩn đường căn sau khi kéo xong
//   };

//   return (
//     <div className="relative w-full h-[500px] bg-gray-100 border border-dashed overflow-hidden">
//       {/* Hiện đường căn nếu có */}
//       {guides.x !== null && (
//         <div
//           className="absolute w-[1px] h-full bg-pink-500 z-10"
//           style={{ left: guides.x }}
//         />
//       )}
//       {guides.y !== null && (
//         <div
//           className="absolute h-[1px] w-full bg-pink-500 z-10"
//           style={{ top: guides.y }}
//         />
//       )}

//       {boxes.map(box => (
//         <Draggable
//           key={box.id}
//           position={{ x: box.x, y: box.y }}
//           onDrag={(e, data) => handleDrag(box.id, e, data)}
//           onStop={handleStop}
//         >
//           <div
//             className="absolute bg-blue-500 text-white font-bold flex items-center justify-center cursor-move"
//           >
//             Box {box.id}
//           </div>
//         </Draggable>
//       ))}
//     </div>
//   );
// }

// import React, { useState } from "react";
// import Draggable from "react-draggable";

// export default function SnapInsertDemo() {
//   const [lines, setLines] = useState([
//     {
//       id: 1,
//       label: "Tên:",
//       content: [
//         { type: "dots", id: "dots-1" }
//       ]
//     },
//     {
//       id: 2,
//       label: "Tuổi:",
//       content: [
//         { type: "dots", id: "dots-2" }
//       ]
//     }
//   ]);

//   const [draggingItem, setDraggingItem] = useState(null);

//   const handleStop = (e, data, draggedLineId) => {
//     const draggedLine = lines.find((l) => l.id === draggedLineId);
//     const otherLines = lines.filter((l) => l.id !== draggedLineId);

//     const lineHeight = 64; // ước lượng chiều cao mỗi dòng
//     const dropY = data.y;
//     const dropX = data.x;

//     const targetIndex = Math.floor(dropY / lineHeight);
//     const targetLine = otherLines[targetIndex];

//     if (targetLine) {
//       const newLines = otherLines.map((line) => {
//         if (line.id === targetLine.id) {
//           const newContent = [...line.content];
//           const insertIndex = newContent.findIndex((p) => p.type === "dots");
//           newContent.splice(insertIndex, 0, {
//             type: "box",
//             id: `box-${draggedLineId}`,
//             label: draggedLine.label
//           });
//           return { ...line, content: newContent };
//         }
//         return line;
//       });

//       setLines(newLines);
//     }
//   };

//   return (
//     <div className="p-4 w-full max-w-2xl mx-auto">
//       <h2 className="font-bold text-lg mb-4">Kéo dòng "Tuổi:" lên dòng "Tên:"</h2>

//       {lines.map((line) => (
//         <div key={line.id} className="relative h-16">
//           {line.label === "Tuổi:" ? (
//             <Draggable
//               onStart={() => setDraggingItem(line.id)}
//               onStop={(e, data) => handleStop(e, data, line.id)}
//               bounds="parent"
//             >
//               <div className="absolute cursor-move bg-white shadow border px-2 py-1 rounded flex items-center space-x-2">
//                 <span className="whitespace-nowrap font-semibold">{line.label}</span>
//                 <div className="flex-grow border-t border-dotted border-black h-[1px] w-40"></div>
//               </div>
//             </Draggable>
//           ) : (
//             <div className="flex items-center space-x-2 border px-2 py-1 rounded h-full">
//               <span className="whitespace-nowrap font-semibold">{line.label}</span>
//               {line.content.map((item) => {
//                 if (item.type === "dots") {
//                   return <div key={item.id} className="flex-grow border-t border-dotted border-black h-[1px]"></div>;
//                 } else if (item.type === "box") {
//                   return (
//                     <div key={item.id} className="px-2 py-1 bg-blue-500 text-white rounded">
//                       {item.label}
//                     </div>
//                   );
//                 }
//               })}
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default function PreciseDotsLine() {
//     const textPositions = [
//       { id: 1, text: "text1", x: 50 , y:100 },
//       { id: 2, text: "Thanh Phát", x: 300, y:100 },
//       { id: 3, text: "text3", x: 600, y:100 }
//     ];

//     const divRef = useRef()

//     const font = "16px Arial";
//     const containerWidth = 800;

//     return (
// <div className="relative w-full h-50 bg-white border mx-auto">
//   {/* Text elements */}
//   {textPositions.map((item) => (
//     <Draggable key={item.id}>
//         <div
//           className="absolute top-1/2 -translate-y-1/2 whitespace-nowrap font-medium"
//           style={{ left: item.x, top: item.y }}
//         >
//           {item.text}
//         </div>
//     </Draggable>
//   ))}

//         {/* Dấu chấm giữa các đoạn */}
// {
//     textPositions.map((item, idx) => {
//         const next = textPositions[idx + 1];

//         const startX = item.x + getTextWidth(item.text) + 20;
//         const endX = next ? next.x - 20 : containerWidth - 20; // cuối cùng kéo đến maxWidth - 20

//         const width = endX - startX;

//         return (
//             <div
//                 key={`dots-${item.id}`}
//                 className="absolute top-1/2 -translate-y-1/2 border-t border-dotted "
//                 style={{
//                     left: startX,
//                     top: item.y + 12,
//                     width: width > 0 ? width : 0,
//                 }}
//             />
//         );
//     });
// }
//       </div>
//     );
//   }
