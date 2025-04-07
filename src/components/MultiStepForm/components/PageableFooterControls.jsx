import * as React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import { PaginationText } from './PaginationText'
import { PaginationButtons } from './PaginationButtons'

 

export const PageableFooterControls = ({
  isLoading,
  setPageSize,
  pageOptions,
  pageIndex,
  pageSize,
  totalCount,
  pageCount,
  gotoPage,
  previousPage,
  canPreviousPage,
  canNextPage,
  nextPage,
}) =>
  !isLoading && (
    <Container fluid style={{ marginTop: '1rem' }}>
      <Row className='ui stackable two column grid'>
        <Col className='column' md={12} lg={6}>
          {pageCount > 1 && (
            <PaginationButtons
              pageIndex={pageIndex}
              pageCount={pageCount}
              gotoPage={gotoPage}
              previousPage={previousPage}
              canPreviousPage={canPreviousPage}
              canNextPage={canNextPage}
              nextPage={nextPage}
            />
          )}
        </Col>

        <Col className='column' md={12} lg={6}>
          <PaginationText
            setPageSize={setPageSize}
            pageOptions={pageOptions}
            pageIndex={pageIndex}
            pageSize={pageSize}
            totalCount={totalCount}
            pageCount={pageCount}
          />
        </Col>
      </Row>
    </Container>
  )
