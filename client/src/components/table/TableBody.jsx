import React from 'react';
import { flexRender } from '@tanstack/react-table';

const TableBody = ({ table, columns }) => {
  const styles = {
    tableWrapper: {
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      overflow: 'hidden',
      marginBottom: '16px',
      maxHeight: '500px',
      overflowY: 'auto',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
    },
    th: {
      backgroundColor: '#f8f9fa',
      padding: '12px',
      textAlign: 'left',
      borderBottom: '1px solid #e0e0e0',
      cursor: 'pointer',
      userSelect: 'none',
      position: 'sticky',
      top: 0,
      zIndex: 5,
    },
    td: {
      padding: '12px',
      borderBottom: '1px solid #e0e0e0',
    },
    sortIcon: {
      marginLeft: '8px',
      fontSize: '12px',
      color: '#666',
    },
  };

  return (
    <div style={styles.tableWrapper}>
      <table style={styles.table}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  style={styles.th}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder ? null : (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getCanSort() && (
                        <span style={styles.sortIcon}>
                          {header.column.getIsSorted() === 'asc' ? '↑' : 
                           header.column.getIsSorted() === 'desc' ? '↓' : '↕'}
                        </span>
                      )}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} style={styles.td}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} style={{ ...styles.td, textAlign: 'center', height: '100px' }}>
                No results found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableBody;