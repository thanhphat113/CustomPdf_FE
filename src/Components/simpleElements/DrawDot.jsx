function DrawDot({item, startX, width}) {
    return (
        <div
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
}

export default DrawDot;
