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
      className={`mx-2 text-sm ${
        isActive
          ? "text-primary-color font-medium"
          : "text-text-meta dark:text-text-meta-dark hover:text-text-heading dark:hover:text-text-heading-dark"
      }`}
      href={page == 1 ? "/" : `/page/${page}`}
    >
      <span>{page}</span>
    </a>
  );

  return (
    <div className="flex flex-row items-center font-mono">
      {activePage > 1 && (
        <a
          href={activePage == 2 ? "/" : `/page/${activePage - 1}`}
          className="text-text-meta dark:text-text-meta-dark hover:text-text-heading dark:hover:text-text-heading-dark mr-2"
        >
          <MdChevronLeft size={20} />
        </a>
      )}
      {Array.from({ length: paginationSize }, (_, index) =>
        generatePageView(index + 1 == activePage, index + 1)
      )}
      {activePage < paginationSize && (
        <a
          href={`/page/${activePage + 1}`}
          className="text-text-meta dark:text-text-meta-dark hover:text-text-heading dark:hover:text-text-heading-dark ml-2"
        >
          <MdChevronRight size={20} />
        </a>
      )}
    </div>
  );
}
