import type { FC } from 'react';

interface Props {
  page: number;
  totalPages: number;
  changePage: (page: number) => void;
}

export const Pagination: FC<Props> = ({ page, totalPages, changePage }) => {
  const pageNumbers = [];

  const pageWindow = 5;
  let start = Math.max(page - pageWindow, 1);
  let end = Math.min(page + pageWindow, totalPages);

  if (page <= pageWindow) {
    end = start + pageWindow * 2;
  }
  if (page > totalPages - pageWindow) {
    start = totalPages - pageWindow * 2;
  }

  start = Math.max(start, 1);
  end = Math.min(end, totalPages);

  for (let i = start; i <= end; i++) {
    pageNumbers.push(
      <button key={i} onClick={() => changePage(i)} disabled={i === page} style={{ fontWeight: i === page ? 'bold' : 'normal' }}>
        {i}
      </button>
    );
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 20 }}>
      {page > 1 && <button onClick={() => changePage(1)}>First</button>}
      <button onClick={() => changePage(Math.max(1, page - 1))} disabled={page === 1}>
        Previous
      </button>
      {pageNumbers}
      <button onClick={() => changePage(Math.min(totalPages, page + 1))} disabled={page === totalPages}>
        Next
      </button>
      {page < totalPages && <button onClick={() => changePage(totalPages)}>Last</button>}
    </div>
  );
};
