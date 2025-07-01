import { GroupByY } from "../../Helpers/GroupByY";
import { mmToPx, cmToPx } from "../../Helpers/unitConverter";
import { getTextWidth } from "../../Helpers/GetTextWidth";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { moveElement, moveTable } from "../../redux/Slices/DataSlice";
import { SetSTT } from "../../Helpers/SetSTT";
import SimpleElements from "../simpleElements";
import DrawDot from "../simpleElements/DrawDot";
import DrawBox from "../simpleElements/DrawBox";
import TableElement from "../TableElement";

const SNAP_TOLERANCE = 10;

function PdfPage({ widthMm, heightMm }) {
    const widthPx = mmToPx(widthMm);
    const heightPx = mmToPx(heightMm);

    const data = useSelector((state) => state.data.elements);

    const tableElements = data.filter((e) => e.type === "table");

    const dispatch = useDispatch();
    const [simpleElements, setSimpleElements] = useState([]);
    const [elementsWithSTT, setElementsWithSTT] = useState([]);
    const [guides, setGuides] = useState({ x: null, y: null });

    const positionsRef = useRef({});

    useEffect(() => {
        setSimpleElements(GroupByY(data.filter((e) => e.type !== "table")));
        setElementsWithSTT(SetSTT(data));

        data.forEach((item) => {
            positionsRef.current[item.id] = { x: item.x, y: item.y };
        });
        console.log(positionsRef);
    }, [data]);

    const handleStop = (id) => {
        const flatElements = simpleElements.flat();
        const { x, y } = positionsRef.current[id];

        setGuides({ x: null, y: null });
        dispatch(moveElement({ flatElements, id, snapS: x, snapT: y }));
    };

    const handleStopTable = (id) => {
        const { y } = positionsRef.current[id];

        setGuides({ x: null, y: null });
        dispatch(moveTable({ id, snapT: y }));
    };

    const handleDrag = (id, e, data) => {
        let snapX = data.x;
        let snapY = data.y;

        let guideX = 0;
        let guideY = 0;

        const flatElements = simpleElements.flat();

        const elementActive = flatElements.filter(
            (item) => item.trangThai === 1
        );

        for (const item of elementActive) {
            if (item.id === id) continue;

            if (Math.abs(data.x - item.x) < SNAP_TOLERANCE) {
                snapX = item.x;
                guideX = item.x;
            }

            if (Math.abs(data.y - item.y) < SNAP_TOLERANCE) {
                snapY = item.y;
                guideY = item.y + 30;
            }
        }

        setGuides({ x: guideX, y: guideY });
        positionsRef.current[id] = { x: snapX, y: snapY };
    };

    return (
        <div
            id="pdfContext"
            style={{
                width: `${widthPx}px`,
                height: `${heightPx}px`,
                padding: `${cmToPx(1)}px`,
            }}
            className="bg-white my-6 shadow-[0_0_15px_rgba(0,0,0,0.3)] mx-auto"
        >
            <div className="relative w-full h-full">
                {guides.x !== null && guides.x !== 0 && (
                    <div
                        className="absolute w-[1px] h-full text-center border border-dotted z-10"
                        style={{ left: guides.x }}
                    ></div>
                )}
                {guides.y !== null && guides.y !== 0 && (
                    <div
                        className="absolute h-[1px] w-full border border-dotted z-10"
                        style={{ top: guides.y }}
                    />
                )}
                {simpleElements.map((el, idx) => (
                    <>
                        {el.map((item) => {
                            if (item.trangThai === 0) return null;
                            return (
                                <SimpleElements
                                    key={item.id}
                                    item={item}
                                    elementsWithSTT={elementsWithSTT}
                                    handleStop={handleStop}
                                    handleDrag={handleDrag}
                                />
                            );
                        })}

                        {el.map((item, idx) => {
                            if (item.trangThai === 0) return null;
                            let nextIdx = idx + 1;

                            if (el[nextIdx] && el[nextIdx].trangThai === 0) {
                                nextIdx++;
                            }

                            const next = el[nextIdx];
                            const haveStt = elementsWithSTT.some(
                                (e) => e.id === item.id
                            );

                            const startX =
                                item.x +
                                getTextWidth(item.text) +
                                20 +
                                (haveStt ? 30 : 0);
                            const endX = next
                                ? next.x - 10
                                : widthPx - 20 - cmToPx(1.5);

                            const width = endX - startX;
                            if (!item.dot.visible) return;
                            return (
                                <DrawDot
                                    key={`dot-${item.id}`}
                                    item={item}
                                    startX={startX}
                                    width={width}
                                />
                            );
                        })}

                        {el.map((item, idx) => {
                            if (item.trangThai === 0) return null;

                            const startX =
                                item.x + getTextWidth(item.text) + 20;

                            if (!item.box.visible) return;

                            return (
                                <DrawBox
                                    key={idx}
                                    item={item}
                                    startX={startX}
                                />
                            );
                        })}
                    </>
                ))}
                {tableElements && tableElements.map((item) => (
                    <TableElement
                        handleStop={handleStopTable}
                        handleDrag={handleDrag}
                        key={item.id}
                        table={item}
                    ></TableElement>
                ))}

            </div>
        </div>
    );
}

export default PdfPage;
