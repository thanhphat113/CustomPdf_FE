import { cmToPx } from "../../Helpers/unitConverter";

function DrawBox({item, startX}) {
    return (
        <div
            className="flex absolute"
            style={{
                left: startX,
                top: item.y + 5,
            }}
        >
            {Array.from(item.box.list).map((box, id) => (
                <div
                    key={id}
                    className={`h-[30px] border`}
                    style={{ width: cmToPx (box) }}
                ></div>
            ))}
        </div>
    );
}

export default DrawBox;
