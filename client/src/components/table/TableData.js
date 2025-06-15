
export const sampleData = [
  {
    id: '1',
    name: 'tomato',
    type: 'vegetable',
    price: 5.67,
    amount: '14',
  },
  {
    id: '2',
    name: 'rice',
    type: 'wholgrain',
    price: 2.14,
    amount: '50',
  },
  {
    id: '3',
    name: 'chocolate',
    type: 'sweets',
    price: 15.99,
    amount: '100',
  },
  {
    id: '4',
    name: 'apple',
    type: 'fruit',
    price: 1.69,
    amount: '200',
  },
  {
    id: '5',
    name: 'yogurt',
    type: 'dairy',
    price: 7.77,
    amount: '77',
  },
];

// Custom filter function for numeric columns with logical operators
export const numericFilter = (row, columnId, value) => {
  if (!value) return true;
  
  const cellValue = row.getValue(columnId);
  const numericValue = parseFloat(cellValue);
  
  if (isNaN(numericValue)) return true;
  
  // Check for logical operators
  const operators = ['<=', '>=', '<', '>', '=', '!='];
  let operator = null;
  let filterValue = null;
  
  for (const op of operators) {
    if (value.startsWith(op)) {
      operator = op;
      filterValue = parseFloat(value.slice(op.length).trim());
      break;
    }
  }
  
  // If no operator found, treat as exact match or contains
  if (!operator) {
    filterValue = parseFloat(value);
    if (!isNaN(filterValue)) {
      return numericValue === filterValue;
    }
    // If not a number, fall back to string contains
    return cellValue.toString().toLowerCase().includes(value.toLowerCase());
  }
  
  if (isNaN(filterValue)) return true;
  
  switch (operator) {
    case '<':
      return numericValue < filterValue;
    case '<=':
      return numericValue <= filterValue;
    case '>':
      return numericValue > filterValue;
    case '>=':
      return numericValue >= filterValue;
    case '=':
      return numericValue === filterValue;
    case '!=':
      return numericValue !== filterValue;
    default:
      return true;
  }
};