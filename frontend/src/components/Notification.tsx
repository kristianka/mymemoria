// interface props {
//     content: string | null;
//     type: string | null;
// }

interface props {
    message: string;
    type: "info" | "success" | "warning" | "error";
}

import { ToastContainer, toast } from "react-toastify";

const Notification = (props: props) => {
    const { message, type } = props;
    console.log("Notification", message, type);
    if (!message || !type) {
        return null;
    }

    return null;
};

export default Notification;
