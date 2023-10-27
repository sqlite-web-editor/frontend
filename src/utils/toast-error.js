import toast from "react-hot-toast";
import colors from 'tailwindcss/colors';


export const toastError = (msg) => {
    toast.error(msg, {
        className: "bg-red-50 text-black rounded-lg border-2 border-red-300 dark:bg-gray-800 dark:text-white dark:border-red-500"
    })
}