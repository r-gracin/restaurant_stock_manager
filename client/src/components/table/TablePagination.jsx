import React from 'react';

const TablePagination = ({ table }) => {
  const styles = {
    paginationContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '16px',
      position: 'sticky',
      bottom: 0,
      backgroundColor: 'white',
      paddingTop: '8px',
      zIndex: 10,
    },
    paginationControls: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
    },
    select: {
      padding: '4px 8px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      fontSize: '14px',
    },
    button: {
      padding: '8px 16px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      backgroundColor: 'white',
      cursor: 'pointer',
      fontSize: '14px',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
    },
    buttonDisabled: {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  };

  return (
    <div style={styles.paginationContainer}>
      <div style={styles.paginationControls}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '14px' }}>Rows per page</span>
          <select
            style={styles.select}
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value))
            }}
          >
            {[5, 10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>
        <div style={{ fontSize: '14px' }}>
          Page {table.getState().pagination.pageIndex + 1} of{' '}
          {table.getPageCount()}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button
          style={{
            ...styles.button,
            ...(table.getCanPreviousPage() ? {} : styles.buttonDisabled)
          }}
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          ← Previous
        </button>
        <button
          style={{
            ...styles.button,
            ...(table.getCanNextPage() ? {} : styles.buttonDisabled)
          }}
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default TablePagination;