import GenericTable from '@/components/GenericTable/GenericTable'
import { useDialog } from '@/hooks'
import api from '@/services/api'
import MainContainer from '@/styles/MainContainer'
import { Fab, Stack } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const tableHeaders = [
  'Código',
  'Nome do Produto',
  'Preço de custo',
  'Preço de venda'
]

export default function Products() {
  const { handleOpenDialog } = useDialog()

  const fetchProducts = async () => {
    const { data } = await api.get('/products')
    return data
  }

  const { isLoading, data } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts
  })

  return (
    <MainContainer>
      <Stack spacing={1} direction="row" alignSelf="flex-end" mb={1}>
        <Fab
          color="primary"
          variant="extended"
          onClick={() => handleOpenDialog('updateProduct')}
        >
          Atualizar Preços
        </Fab>
      </Stack>
      <GenericTable
        dataList={data}
        loading={isLoading}
        columnList={tableHeaders}
      />
    </MainContainer>
  )
}
