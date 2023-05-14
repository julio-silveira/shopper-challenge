import React, { useMemo } from 'react'
import { TableCell, TableHead, TableRow, useTheme } from '@mui/material'

type Props = {
  columns: string[]
  manage?: boolean
}

export default function TableHeader({ columns, manage }: Props) {
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
        {columns.map((column) =>
            <TableCell sx={headerSyles} key={column}>
              {column}
            </TableCell>
        )}
        
      </TableRow>
    </TableHead>
  )
}