import { DialogContext } from '@/context';
import { useContext } from 'react';

export default function useDialog() {
  const {isOpen, dialogType, handleCloseDialog, handleOpenDialog} = useContext(DialogContext)

  return {isOpen, dialogType , handleCloseDialog, handleOpenDialog}
}
