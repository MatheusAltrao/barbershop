import toast from "react-hot-toast";

export const toastSuccessAction = (message: string) =>
  toast.success(` ${message} `);

export const toastErrorAction = (message: string) =>
  toast.error(` ${message} `);

export const toastLoadingAction = (message: string) =>
  toast.loading(` ${message}...`, {
    duration: 5000,
  });
