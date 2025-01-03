import React, { useMemo, useState } from 'react';
import { useTable, useGlobalFilter, useSortBy, usePagination } from 'react-table';

// A simple global filter component
function GlobalFilter({ globalFilter, setGlobalFilter }) {
  return (
    <span>
      Search:{' '}
      <input
        value={globalFilter || ''}
        onChange={(e) => setGlobalFilter(e.target.value || undefined)}
        placeholder="Type to search..."
        style={{ margin: '0 0.5rem', padding: '0.2rem' }}
      />
    </span>
  );
}

const ClientTableComponent = ({ data, columns }) => {
  const [globalFilter, setGlobalFilter] = useState('');

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter: setTableGlobalFilter,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
  } = useTable(
    {
      columns,
      data,
      initialState: { globalFilter: '', pageSize: 5 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  // Update the table's global filter whenever the input changes
  React.useEffect(() => {
    setTableGlobalFilter(globalFilter);
  }, [globalFilter, setTableGlobalFilter]);

  return (
    <div>
      <GlobalFilter globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
      <table {...getTableProps()} style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  style={{
                    border: '1px solid black',
                    padding: '0.5rem',
                    background: column.isSorted
                      ? column.isSortedDesc
                        ? '#ffa1a1'
                        : '#a1ffa1'
                      : '#f0f0f0',
                    cursor: 'pointer',
                  }}
                >
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      border: '1px solid black',
                      padding: '0.5rem',
                      textAlign: 'center',
                    }}
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>
        <span>
          Page{' '}
          <strong>
            {state.pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>
        <select
          value={state.pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[5, 10, 20, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ClientTableComponent;

