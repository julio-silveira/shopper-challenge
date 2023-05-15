import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { UpdatePriceEntity } from '@/types/UpdateProductPrice';
import { Stack, Tooltip } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { toBrl } from '@/utils/Format';

type Props = {
  product: UpdatePriceEntity
}

export default function ProductItem({ product }: Props) {
  return (
        <Accordion square elevation={2}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
          >
            <Stack sx={{width: "100%"}} direction="row" justifyContent="space-between">
            <Typography sx={{ fontWeight: 'bold' }} ml={1}>{`Produto ${product.code}`}</Typography>
            {product.valid
              ? (
                  <Tooltip title="Produto válido" placement="top">
                    <CheckCircleOutlineIcon color="success" />
                  </Tooltip>
                )
              : (
                  <Tooltip title="Produto inválido" placement="top">
                    <ErrorOutlineIcon color="error" />
                  </Tooltip>
                )}
            </Stack>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant='body2'>{product.name}</Typography>

            <Stack sx={{width: "100%"}} direction="row" justifyContent="space-evenly">
            <Typography mt={1} variant='body2'>
            {`Preço atual: ${toBrl(product?.currentPrice)}`}
            </Typography>
            <Typography mt={1} variant='body2'>
            {`Novo preço: ${toBrl(product?.newPrice)}`}
            </Typography>
            </Stack>

            {product?.valid? null : (
              <>
              <Typography color="error" mt={1} variant='body1'>Erros:</Typography>
              {product.message?.map((message) => (<Typography color="error" mt={1} variant='body2'>{message}</Typography>))}
              </>
            )}
          </AccordionDetails>
        </Accordion>
  );
}
