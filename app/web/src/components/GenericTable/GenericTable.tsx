import { GenericObject } from '@/types/GenericObject'
import {
  Paper,
  Table,
  TableContainer,
  TablePagination,
  Typography
} from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'

import { Loading } from '../Loading'
import TableHeader from './components/TableHeader'
import TableRowSet from './components/TableRowSet'

type Props = {
  loading: boolean
  dataList: GenericObject[]
  columnList?: string[]
}

function GenericTable({ loading, dataList, columnList }: Props) {
  const [page, setPage] = useState(0)
  const [rowsPerPage] = useState(10)
  const count = dataList?.length

  const handlePageChange = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  if (loading) return <Loading />

  if (count < 1 && !loading)
    return (
      <Box
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Typography pt={2} px={4} variant="body1">
          Informação não encontrada!
        </Typography>
      </Box>
    )

  const columns = columnList || Object.keys(dataList[0])
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - count) : 0

  return (
    <TableContainer component={Paper} elevation={5} sx={{ mb: 4 }}>
      <Table size="small" stickyHeader sx={{ minWidth: 300 }}>
        <TableHeader columns={columns} />
        <TableRowSet
          page={page}
          rowsPerPage={rowsPerPage}
          dataList={dataList}
          emptyRows={emptyRows}
        />
      </Table>
      <TablePagination
        component="div"
        count={count}
        onPageChange={handlePageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[rowsPerPage]}
      />
    </TableContainer>
  )
}

export default GenericTable
