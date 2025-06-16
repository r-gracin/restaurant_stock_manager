import React from 'react';

const ColumnFilters = ({ columns, columnFilters, setColumnFilters }) => {
  const getColumnFilterValue = (columnId) => {
    const filter = columnFilters.find(filter => filter.id === columnId);
    return filter ? filter.value : '';
  };

  const setColumnFilterValue = (columnId, value) => {
    setColumnFilters(prev => {
      if (!value) {
        return prev.filter(filter => filter.id !== columnId);
      }
      
      const existingFilterIndex = prev.findIndex(filter => filter.id === columnId);
      if (existingFilterIndex >= 0) {
        const newFilters = [...prev];
        newFilters[existingFilterIndex] = { id: columnId, value };
        return newFilters;
      } else {
        return [...prev, { id: columnId, value }];
      }
    });
  };

  const styles = {
    columnFiltersContainer: {
      marginBottom: '16px',
      padding: '16px',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      border: '1px solid #e0e0e0',
      position: 'sticky',
      top: '60px',
      zIndex: 9,
    },
    columnFiltersGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '12px',
    },
    filterGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
    },
    filterLabel: {
      fontSize: '12px',
      fontWeight: 'bold',
      color: '#555',
    },
    filterInput: {
      padding: '6px 8px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      fontSize: '12px',
    },
    helpText: {
      fontSize: '11px',
      color: '#666',
      fontStyle: 'italic',
      marginTop: '2px',
    },
  };

  return (
    <div style={styles.columnFiltersContainer}>
      <div style={{ marginBottom: '12px', fontWeight: 'bold', color: '#333' }}>
        Column Filters
      </div>
      <div style={styles.columnFiltersGrid}>
        {columns.map((column) => (
          <div key={column.accessorKey} style={styles.filterGroup}>
            <label style={styles.filterLabel}>
              {column.header}
            </label>
            <input
              style={styles.filterInput}
              placeholder={
                column.accessorKey === 'salary' 
                  ? 'e.g. >50000, <=85000' 
                  : `Filter ${column.header.toLowerCase()}...`
              }
              value={getColumnFilterValue(column.accessorKey)}
              onChange={(e) => setColumnFilterValue(column.accessorKey, e.target.value)}
            />
            {column.accessorKey === 'salary' && (
              <div style={styles.helpText}>
                Use operators: &lt;, &lt;=, &gt;, &gt;=, =, !=
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColumnFilters;