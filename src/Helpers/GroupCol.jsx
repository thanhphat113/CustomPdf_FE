export const GroupCol = (table) => {
    if (!table || table.length === 0) return { parents: [], childs: [] };

    let parents = [];
    let childs = [];

    let hasAnyChild = false;

    const maxRow = Math.max(...table.map(item => item.chilCol.length || 1))

    table.forEach((col) => {
        if (col.chilCol && col.chilCol.length > 0) {
            hasAnyChild = true;

            parents.push({
                ...col,
                colSpan: col.chilCol.length,
                rowSpan: 1,
            });

            col.chilCol.forEach((child) => {
                if (child) childs.push(child);
            });
        } else {
            parents.push({
                ...col,
                colSpan: 1,
                rowSpan: maxRow, 
            });
        }
    });

    if (!hasAnyChild) {
        parents = table.map((col) => ({
            ...col,
            colSpan: 1,
            rowSpan: 1,
        }));

        return { parents, childs: [] };
    }

    return { parents, childs };
};
