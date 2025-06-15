import React from 'react';

const GlobalSearch = ({ globalFilter, setGlobalFilter, totalRows, filteredRows }) => {
  const styles = {
    searchContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '16px',
      position: 'sticky',
      top: 0,
      backgroundColor: 'white',
      zIndex: 10,
      paddingBottom: '8px',
    },
    searchInput: {
      padding: '8px 12px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      fontSize: '14px',
      maxWidth: '300px',
    },
  };

  return (
    <div style={styles.searchContainer}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>🔍</span>
        <input
          style={styles.searchInput}
          placeholder="Global search..."
          value={globalFilter ?? ''}
          onChange={(event) => setGlobalFilter(String(event.target.value))}
        />
      </div>
      <div style={{ fontSize: '14px', color: '#666' }}>
        Showing {totalRows} of {filteredRows} employee(s)
      </div>
    </div>
  );
};

export default GlobalSearch;