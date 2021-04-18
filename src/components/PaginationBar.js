import { Pagination } from "react-bootstrap"

const PaginationBar = ({ pageNumber, onSearchCoderHub }) => {

    if (pageNumber === 0) return ``
    return (
        <Pagination>
            <Pagination.First />
            <Pagination.Prev />
            {pageNumber > 1 && (
                <Pagination.Item onClick={() => onSearchCoderHub()}>{pageNumber - 1}</Pagination.Item>)
            }
            <Pagination.Item onClick={(e) => onSearchCoderHub(e, pageNumber)}>{pageNumber}</Pagination.Item>
            <Pagination.Item onClick={(e) => onSearchCoderHub(e, pageNumber + 1)}>{pageNumber + 1}</Pagination.Item>
            <Pagination.Next />
            <Pagination.Last />
        </Pagination >
    )
}

export default PaginationBar;