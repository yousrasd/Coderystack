import React, { useEffect, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

export default function Pagination(props: any) {
  let paginationSize = props.paginationSize;
  const [activePage, setActivePage] = useState(props.activePage);

  useEffect(() => {
    return () => setActivePage(0);
  }, []);

  const generatePageView = (isActive: boolean, page: number) => (
    <a
      key={page}
      className={`${
        isActive && "bg-primary-color text-white py-2 px-3.5 rounded-md"
      } mx-3 `}
      href={page == 1 ? "/" : `/page/${page}`}
    >
      <span>{page}</span>
    </a>
  );

  return (
    <div className="flex flex-row items-center">
      {activePage > 1 && (
        <a href={activePage == 2 ? "/" : `/page/${activePage - 1}`}>
          <MdChevronLeft size={25} />
        </a>
      )}
      {Array.from({ length: paginationSize }, (_, index) =>
        generatePageView(index + 1 == activePage, index + 1)
      )}
      {activePage < paginationSize && (
        <a href={`/page/${activePage + 1}`}>
          <MdChevronRight size={25} />
        </a>
      )}
    </div>
  );
}
