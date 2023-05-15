import { DialogContext } from '@/context';
import { useContext } from 'react';

export default function useDialog() {
  const {isOpen, dialogType, validating, handleCloseDialog, handleOpenDialog, setValidating} = useContext(DialogContext)

  return {isOpen, dialogType,validating , handleCloseDialog, handleOpenDialog, setValidating}
}
