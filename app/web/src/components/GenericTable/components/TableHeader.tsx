import { TableCell, TableHead, TableRow, useTheme } from '@mui/material'
import React, { useMemo } from 'react'

type Props = {
  columns: string[]
}

export default function TableHeader({ columns }: Props) {
  const { palette } = useTheme()

  const headerSyles = useMemo(
    () => ({
      bgcolor: palette.primary.main,
      fontWeight: 700,
      color: '#f2f2f2'
    }),
    [palette]
  )
  return (
    <TableHead>
      <TableRow>
        {columns.map((column) => (
          <TableCell sx={headerSyles} key={column}>
            {column}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}
