import { useSnackbar, type OptionsObject, type SnackbarMessage } from "notistack";

let useSnackbarRef: any
export const SnackbarUtilsConfig = () => {
    useSnackbarRef = useSnackbar();
    return null;
};

export const notify = {
    success(msg: SnackbarMessage, options?: OptionsObject) {
        useSnackbarRef.enqueueSnackbar(msg, { variant: 'success', ...options });
    },
    error(msg: SnackbarMessage, options?: OptionsObject) {
        useSnackbarRef.enqueueSnackbar(msg, { variant: 'error', ...options });
    },
    info(msg: SnackbarMessage, options?: OptionsObject) {
        useSnackbarRef.enqueueSnackbar(msg, { variant: 'info', ...options });
    }
}