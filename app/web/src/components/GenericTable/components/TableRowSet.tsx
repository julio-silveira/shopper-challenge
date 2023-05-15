import { GenericObject } from '@/types/GenericObject'
import { toBrl } from '@/utils/Format'
import { TableBody, TableCell, TableRow } from '@mui/material'
import React from 'react'

type Props = {
  dataList: GenericObject[]
  emptyRows: number
  page: number
  rowsPerPage: number
}

export default function TableRowSet({
  dataList,
  emptyRows,
  page,
  rowsPerPage
}: Props) {
  return (
    <TableBody>
      {dataList
        ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        ?.map((e, i) => (
          <TableRow key={i}>
            {Object.entries(e).map(([key, value], index) =>
              key.includes('Price') ? (
                <TableCell key={`${value} ${index}`}>{toBrl(value)}</TableCell>
              ) : (
                <TableCell key={`${value} ${index}`}>{value}</TableCell>
              )
            )}
          </TableRow>
        ))}
      {emptyRows > 0 && (
        <TableRow
          style={{
            height: 33 * emptyRows
          }}
        >
          <TableCell colSpan={6} />
        </TableRow>
      )}
    </TableBody>
  )
}
