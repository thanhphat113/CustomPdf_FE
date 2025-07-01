export const GroupCol = (table) => {
    if (!table || table.length === 0) return { parents: [], childs: [] };

    let parents = [];
    let childs = [];

    let hasAnyChild = false;

    table.forEach((col) => {
        if (col.columns && col.columns.length > 0) {
            hasAnyChild = true;

            parents.push({
                ...col,
                colSpan: col.columns.length,
                rowSpan: 1,
            });

            col.columns.forEach((child) => {
                if (child) childs.push(child);
            });
        } else {
            parents.push({
                ...col,
                colSpan: 1,
                rowSpan: 2, 
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
