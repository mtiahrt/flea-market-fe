import * as React from 'react';

export function useSnackbar() {
  debugger;
  const [isActive, setIsActive] = React.useState(false);
  const [message, setMessage] = React.useState();

  React.useEffect(() => {
    if (isActive === true) {
      setIsActive(false);
    }
  }, [isActive]);

  const openSnackBar = (msg = 'Something went wrong...') => {
    setMessage(msg);
    setIsActive(true);
  };

  return { isActive, message, openSnackBar };
}
