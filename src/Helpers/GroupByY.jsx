export function GroupByY(elements) {
    const resultRows = [];

    elements.forEach((el) => {
        // if (el.trangThai === 0 ) return
        let group = resultRows.find((group) => group[0].y === el.y);
        if (group) {
            group.push(el);
            group.sort((a, b) => a.x - b.x);
        } else {
            resultRows.push([el]);
        }
    });

    return resultRows;
}
