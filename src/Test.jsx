import React from 'react';
import { useTable, useBlockLayout, useResizeColumns } from 'react-table';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';

function Table({ columns, data }) {
  const defaultColumn = React.useMemo(
    () => ({
      width: 150,
      minWidth: 50,
      maxWidth: 400,
    }),
    []
  );

  const tableInstance = useTable(
    { columns, data, defaultColumn },
    useBlockLayout,
    useResizeColumns
  );

  const {
    getTableProps,
    headerGroups,
    getTableBodyProps,
    rows,
    prepareRow
  } = tableInstance;

  return (
    <div {...getTableProps()} style={{ overflowX: 'auto' }}>
      {headerGroups.map(headerGroup => (
        <div {...headerGroup.getHeaderGroupProps()} style={{ display: 'flex' }}>
          {headerGroup.headers.map(column => (
            <div
              {...column.getHeaderProps()}
              style={{
                borderBottom: '2px solid #ddd',
                padding: '8px',
                position: 'relative',
                userSelect: 'none'
              }}
            >
              <ResizableBox
                width={column.width}
                height={0}
                axis="x"
                resizeHandles={['e']}
                handle={
                  <div
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: 0,
                      bottom: 0,
                      width: '5px',
                      cursor: 'col-resize',
                      backgroundColor: 'transparent'
                    }}
                  />
                }
                onResizeStop={(e, { size }) => column.setWidth(size.width)}
              >
                <div style={{ width: '100%' }}>{column.render('Header')}</div>
              </ResizableBox>
            </div>
          ))}
        </div>
      ))}
      <div {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <div {...row.getRowProps()} style={{ display: 'flex' }}>
              {row.cells.map(cell => (
                <div
                  {...cell.getCellProps()}
                  style={{
                    padding: '8px',
                    borderBottom: '1px solid #eee',
                    overflow: 'hidden'
                  }}
                >
                  {cell.render('Cell')}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Table;
