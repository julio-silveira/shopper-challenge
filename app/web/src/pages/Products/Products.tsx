import React from 'react'
import GenericTable from '@/components/GenericTable/GenericTable'
import api from '@/services/api'
import MainContainer from '@/styles/MainContainer'
import { useQuery } from '@tanstack/react-query'
import { Button, Stack } from '@mui/material'
import { useDialog } from '@/hooks'

const tableHeaders = ["Código", "Nome do Produto", "Preço de custo", "Preço de venda"]

export default function Products() {
  const {handleOpenDialog} = useDialog()

  const fetchProducts = async () => {
    const {data} = await api.get('/products')
    return data
  }

  const {isLoading, data} = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts
  })


  return (
    <MainContainer>
      <Stack spacing={1} direction="row" alignSelf="flex-end" mb={1}>
      <Button variant="contained" onClick={() => handleOpenDialog('updateProduct')}>Atualizar Preços</Button>
      {/* <Button variant="contained" onClick={() => handleOpenDialog('createProduct')}>Cadastrar Produto</Button> */}
      </Stack>
      <GenericTable dataList={data} loading={isLoading} columnList={tableHeaders} />
    </MainContainer>
  )
  }
