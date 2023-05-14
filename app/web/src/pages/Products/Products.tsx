import React from 'react'
import GenericTable from '@/components/GenericTable/GenericTable'
import api from '@/services/api'
import MainContainer from '@/styles/MainContainer'
import { Button } from '@mui/material'
import { useQuery } from '@tanstack/react-query'

const tableHeaders = ["Código", "Nome do Produto", "Preço de custo", "Preço de venda"]

export default function Products() {

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
      <GenericTable dataList={data} loading={isLoading} columnList={tableHeaders} />
    </MainContainer>
  )
  }
