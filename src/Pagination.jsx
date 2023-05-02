const Pagination = ({ tasksPerPage, totalTasks, paginate }) => {
    const pageNumbers = [];
  
    for (let i = 1; i <= Math.ceil(totalTasks / tasksPerPage); i++) {
      pageNumbers.push(i);
    }
  
    return (
      <div className="flex flex-wrap justify-center items-center mt-4">
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => paginate(pageNumber)}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 mx-2 rounded"
          >
            {pageNumber}
          </button>
        ))}
      </div>
    );
  };
  
  export default Pagination;