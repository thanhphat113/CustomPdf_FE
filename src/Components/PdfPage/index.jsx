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

const SNAP_TOLERANCE = 5;
const SNAP_TOLERANCE_BETWEEN = 50;

function PdfPage({ widthMm, heightMm }) {
    const widthPx = mmToPx(widthMm);
    const heightPx = mmToPx(heightMm);

    const data = useSelector((state) => state.data.elements);

    const tableElements = data.filter((e) => e.type === "table");

    const dispatch = useDispatch();
    const [simpleElements, setSimpleElements] = useState([]);
    const [elementsWithSTT, setElementsWithSTT] = useState([]);
    const [guides, setGuides] = useState({ x: null, y: null });
    const pdfRef = useRef();

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
        console.log("Đây là: ",positionsRef.current[id])

        setGuides({ x: null, y: null });
        dispatch(moveElement({ flatElements, id, snapS: x, snapT: y }));
    };

    const handleStopTable = (id) => {
        const { y } = positionsRef.current[id];

        setGuides({ x: null, y: null });
        dispatch(moveTable({ id, snapT: y }));
    };

    const handleDrag = ( e, data, currentElement) => {
        let snapX = data.x;
        let snapY = data.y;

        let guideX = 0;
        let guideY = 0;

        const flatElements = simpleElements.flat();

        const elementActive = flatElements.filter(
            (item) => item.trangThai
        );

        const textWidth = getTextWidth(currentElement.text) + 10;
        const offset = currentElement.stt ? 30 : 0;
        const centerText = (textWidth + offset) / 2;
        
        const centerElement = data.x + centerText;
        const centerContext = pdfRef.current.offsetWidth / 2;

        if (Math.abs(centerElement - centerContext) < SNAP_TOLERANCE) {
            snapX = centerContext - centerText
            guideX = centerContext ;
        }

        for (const item of elementActive) {
            if (item.idThuocTinh === currentElement.idThuocTinh) continue;

            if (Math.abs(data.x - item.x) < SNAP_TOLERANCE) {
                snapX = item.x;
                guideX = item.x;
            }

            if (Math.abs((data.x + getTextWidth(`${currentElement.noiDung}:`)) - (item.x + getTextWidth(`${item.noiDung}:`))) < SNAP_TOLERANCE) {
                snapX = item.x + getTextWidth(`${item.noiDung}:`) - getTextWidth(`${currentElement.noiDung}:`);
                guideX = item.x + getTextWidth(`${item.noiDung}:`);
            }

            if (Math.abs(data.y - item.y) < SNAP_TOLERANCE) {
                snapY = item.y;
                guideY = item.y + 25;
            }

        }

        setGuides({ x: guideX, y: guideY });
        positionsRef.current[currentElement.idThuocTinh] = { x: snapX, y: snapY };
        console.log(positionsRef.current[currentElement.idThuocTinh])
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
            <div ref={pdfRef} className="relative w-full h-full">
                {guides.x !== null && guides.x !== 0 && (
                    <div
                        className="absolute w-[1px] h-full text-center border border-dotted z-10"
                        style={{ left: guides.x - 0.5 }}
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
                            if (!item.trangThai) return null;
                            return (
                                <SimpleElements
                                    key={item.idThuocTinh}
                                    item={item}
                                    elementsWithSTT={elementsWithSTT}
                                    handleStop={handleStop}
                                    handleDrag={handleDrag}
                                />
                            );
                        })}

                        {el.map((item, idx) => {
                            if (!item.trangThai) return null;
                            let nextIdx = idx + 1;

                            if (el[nextIdx] && !el[nextIdx].trangThai) {
                                nextIdx++;
                            }

                            const next = el[nextIdx];
                            const haveStt = elementsWithSTT.some(
                                (e) => e.idThuocTinh === item.idThuocTinh
                            );

                            const startX =
                                item.x +
                                getTextWidth(item.noiDung) +
                                10 +
                                (haveStt ? 30 : 0);
                            const endX = next
                                ? next.x - 10
                                : widthPx - 20 - cmToPx(1.5);

                            const width = endX - startX;
                            if (!item.dot.visible) return;
                            return (
                                <DrawDot
                                    key={`dot-${item.idThuocTinh}`}
                                    item={item}
                                    startX={startX}
                                    width={width}
                                />
                            );
                        })}

                        {el.map((item, idx) => {
                            if (!item.trangThai) return null;

                            const startX =
                                item.x + getTextWidth(item.noiDung) + 20;

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
                {tableElements &&
                    tableElements.map((item) => (
                        <TableElement
                            handleStop={handleStopTable}
                            handleDrag={handleDrag}
                            key={item.idThuocTinh}
                            table={item}
                        ></TableElement>
                    ))}
            </div>
        </div>
    );
}

export default PdfPage;
