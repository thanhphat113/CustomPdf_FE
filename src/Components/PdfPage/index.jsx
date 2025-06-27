import Draggable from "react-draggable";
import { GroupByY } from "../../Helpers/GroupByY";
import { cmToPx, mmToPx } from "../../Helpers/unitConverter";
import { getTextWidth } from "../../Helpers/GetTextWidth";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { moveElement } from "../../redux/Slices/DataSlice";
import CheckboxTooltip from "../Tooltips";
import Tippy from "@tippyjs/react";

const SNAP_TOLERANCE = 10;

function PdfPage({ widthMm, heightMm }) {
    const widthPx = mmToPx(widthMm);
    const heightPx = mmToPx(heightMm);

    const data = useSelector((state) => state.data.elements);
    const dispatch = useDispatch();
    const [elements, setElements] = useState([]);

    const positionsRef = useRef({});

    useEffect(() => {
        setElements(GroupByY(data));

        data.forEach((item) => {
            positionsRef.current[item.id] = { x: item.x, y: item.y };
        });
        console.log(positionsRef);
    }, [data]);

    const handleStop = (id, e, data) => {
        let snapS = data.x;
        let snapT = data.y;
        // let snapB = data.x;
        // let snapE = data.x;

        let guideX = 0;
        let guideY = 0;

        const flatElements = elements.flat();
        const elementNoActive = flatElements.filter(
            (item) => item.trangThai === 1
        );

        for (const item of elementNoActive) {
            if (item.id === id) continue;

            if (Math.abs(data.x - item.x) < SNAP_TOLERANCE) {
                snapS = item.x;
                guideX = item.x;
            }

            if (Math.abs(data.y - item.y) < SNAP_TOLERANCE) {
                snapT = item.y;
                guideY = item.y;
            }
        }
        const { x, y } = positionsRef.current[id];

        dispatch(moveElement({ flatElements, id, snapS: x, snapT: y }));
    };

    const handleDrag = (id, e, data) => {
        let snapS = data.x;
        let snapT = data.y;
        // let snapB = data.x;
        // let snapE = data.x;

        let guideX = 0;
        let guideY = 0;

        console.log(Object.values(positionsRef.current));

        for (const [otherId, pos] of Object.entries(positionsRef.current)) {
            console.log(otherId, ", ", pos);
        }

        const flatElements = elements.flat();

        const elementNoActive = flatElements.filter(
            (item) => item.trangThai === 1
        );

        for (const item of elementNoActive) {
            if (item.id === id) continue;

            if (Math.abs(data.x - item.x) < SNAP_TOLERANCE) {
                snapS = item.x;
                guideX = item.x;
            }

            if (Math.abs(data.y - item.y) < SNAP_TOLERANCE) {
                snapT = item.y;
                guideY = item.y;
            }
        }

        //   if (Math.abs(data.y - box.y) < SNAP_TOLERANCE) {
        //     snapY = box.y;
        //     guideY = box.y;
        //   }
        // }

        positionsRef.current[id] = { x: snapS, y: snapT };
    };

    return (
        <div
            id="pdfContext"
            style={{
                width: `${widthPx}px`,
                height: `${heightPx}px`,
            }}
            className="bg-white my-6 shadow-[0_0_15px_rgba(0,0,0,0.3)] relative px-1 mx-2 py-2"
        >
            {elements.map((el, idx) => (
                <>
                    {el.map((item) => {
                        if (item.trangThai === 0) return null;

                        return (
                            <Draggable
                                onStop={(e, data) =>
                                    handleStop(item.id, e, data)
                                }
                                onDrag={(e, data) =>
                                    handleDrag(item.id, e, data)
                                }
                                position={{ x: item.x, y: item.y }}
                                key={item.id}
                                bounds="parent"
                            >
                                <div className="absolute select-none">
                                    <CheckboxTooltip id={item.id}>
                                        <span className="hover:border-black border-transparent border border-dotted cursor-move whitespace-nowrap">
                                            {item.text} :
                                        </span>
                                    </CheckboxTooltip>
                                </div>
                            </Draggable>
                        );
                    })}

                    {el.map((item, idx) => {
                        if (item.trangThai === 0) return null;
                        let nextIdx = idx + 1;

                        if (el[nextIdx] && el[nextIdx].trangThai === 0) {
                            nextIdx++;
                        }

                        const next = el[nextIdx];

                        const startX = item.x + getTextWidth(item.text) + 20;
                        const endX = next ? next.x - 10 : widthPx - 20;

                        const width = endX - startX;
                        if (!item.dot.visible) return;
                        return (
                            <div
                                key={`dots-${item.id}`}
                                className="absolute border-t border-dotted "
                                style={{
                                    left: startX,
                                    top: item.y + 30,
                                    width:
                                        item.dot.width !== 0
                                            ? item.dot.width
                                            : width > 0
                                            ? width
                                            : 0,
                                }}
                            />
                        );
                    })}

                    {el.map((item, idx) => {
                        if (item.trangThai === 0) return null;

                        const startX = item.x + getTextWidth(item.text) + 20;

                        if (!item.box.visible) return;

                        return (
                            <div
                                key={idx}
                                className="flex absolute"
                                style={{
                                    left: startX,
                                    top: item.y + 10,
                                }}
                            >
                                {Array.from(item.box.list).map((box, id) => (
                                    <div
                                        key={id}
                                        className={`h-[30px] border`}
                                        style={{ width: cmToPx(box) }}
                                    ></div>
                                ))}
                            </div>
                        );
                    })}
                </>
            ))}
        </div>
    );
}

export default PdfPage;
