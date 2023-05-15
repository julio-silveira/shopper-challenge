import React, { FormEvent, useEffect, useState } from 'react'
import api from '@/services/api'
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormHelperText,
  Stack,
  Typography
} from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDialog, useSnackBar } from '@/hooks'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { LoadingButton } from '@/components/LoadingButton'
import { MuiFileInput } from 'mui-file-input'
import ProductList from '@/components/ProductList/ProductList'
import { UpdatePriceEntity } from '@/types/UpdateProductPrice'
import { UpdatePriceDto } from '@/types/UpdatePriceDto'


export default function ValidateForm() {
  const queryClient = useQueryClient()
  const { handleOpenSnackBar } = useSnackBar()
  const { handleCloseDialog, validating, setValidating } = useDialog()
  const [value, setValue] = useState<File | null>(null)
  const [validationData, setValidationData] = useState<UpdatePriceEntity[]>([])

  const handleChange = (newValue: File | null) => {
    setValue(newValue)
  }

  const handleMutation = async (data: FormData | UpdatePriceDto) =>
   validating ? await api.put('/products/prices',data) : await api.post('/products/validate', data)

  const { mutate } = useMutation({
    mutationFn: handleMutation,
    onError: (err) => {
      const e = err as AxiosError
      handleOpenSnackBar({ message: e?.message })
    },
    onSuccess: (response) => {
      if(validating) {
        handleCloseDialog()
        handleOpenSnackBar({ message: 'Preços atualizados com sucesso!', color: "success" })
        queryClient.invalidateQueries(['products'])
      }else {
      const data = response.data
      setValidating(true)
      console.log(data);
      setValidationData(data)
      }
    }
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let body: FormData | UpdatePriceDto

    if (validating) {
      const mappedProducts = validationData.map((product) => ({code: product.code, newPrice: product.newPrice}))
      body = {products: mappedProducts}
    } else {
      body =  new FormData()
      body.append('file', value as File)
    }
    mutate(body)
  }

  const isReady = () => {
    if(!validating) return false
    return !validationData.every((product) => product.valid)
  }

  return (
    <Box
      component="form"
      px={{xs: 1, md: 4}}
      py={1}
      sx={{textAlign: 'center'}}
      onSubmit={handleSubmit}
    >
      <DialogTitle>Atualizar preços</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2}>
          {validating ? <ProductList products={validationData} />: ( <FormControl>
          <MuiFileInput
            inputProps={{accept:".csv"}}
            size='small'
            value={value}
            onChange={handleChange}
          />
          <FormHelperText>Escolha o arquivo .csv</FormHelperText>
          </FormControl>
        )}
        </Stack>
      </DialogContent>
      {!isReady() ? null : (
        <DialogContentText mt={1} color="error" variant='body2'>
          Não é possível atualizar, verifique os erros.
        </DialogContentText>)}

      <DialogActions>
        <Button onClick={handleCloseDialog} variant="outlined">
          Cancelar
        </Button>

        <Button
          variant='contained'
          disabled={isReady()}
          type="submit"
        >
          {validating ? 'Atualizar' : 'Validar'}
        </Button>
      </DialogActions>
    </Box>
  )
}
