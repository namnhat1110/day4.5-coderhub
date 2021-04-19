import { Pagination } from "react-bootstrap"

const PaginationBar = ({ pageNumber, onSearchCoderHub, totalPage }) => {

    if (pageNumber === 0) return ``
    return (
        <Pagination>
            <Pagination.First />
            <Pagination.Prev />
            <Pagination.First onClick={(e) => onSearchCoderHub(e, 1)} />
            {pageNumber > 1 && (
                <Pagination.Item onClick={(e) => onSearchCoderHub(e, pageNumber - 1)}>{pageNumber - 1}</Pagination.Item>)
            }
            <Pagination.Item onClick={(e) => onSearchCoderHub(e, pageNumber)}>{pageNumber}</Pagination.Item>
            <Pagination.Item onClick={(e) => onSearchCoderHub(e, pageNumber + 1)}>{pageNumber + 1}</Pagination.Item>
            <Pagination.Next onClick={(e) => onSearchCoderHub(e, pageNumber + 1)} />
            <Pagination.Last onClick={(e) => onSearchCoderHub(e, totalPage + 1)} />
        </Pagination >
    )
}

export default PaginationBar;