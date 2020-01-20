import { useState } from 'react';

function useErrorDialog(): [
  (title: string, message: string) => void,
  boolean,
  string,
  string,
  () => void,
] {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [errorTitle, setErrorTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  function showError(title: string, message: string): void {
    setErrorTitle(title);
    setErrorMessage(message);
    setDialogOpen(true);
  }

  function closeDialog(): void {
    setDialogOpen(false);
  }

  return [showError, dialogOpen, errorTitle, errorMessage, closeDialog];
}

export default useErrorDialog;
