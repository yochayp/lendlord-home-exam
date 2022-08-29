const Paginator = ({page,setPage,totalPages}) => {
    return (
        <div className="d-flex pagination-buttons align-items-center">
        <button className="btn btn-primary"
          onClick={() => setPage((old) => Math.max(old - 1, 0))}
          disabled={page === 0}>
          Previous
        </button>
        <div className="mx-3">{page + 1}/{totalPages}</div>
        <button className="btn btn-primary"
          onClick={() => setPage((old) => old + 1)}
          disabled={page === totalPages - 1}>
          Next
        </button>
      </div>
    )
}

export default Paginator;