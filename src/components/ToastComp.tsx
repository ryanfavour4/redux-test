import React from "react";
import toast, { Toast } from "react-hot-toast";

type ToastPropType = { t: Toast; message: string };

export default function ToastComp({ t, message }: ToastPropType) {
    return (
        <div onClick={() => toast.dismiss(t.id)} className="custom-toast show">
            <div className="custom-toast-content">
                <div className="custom-toast-icon">🚀</div>
                <div className="custom-toast-text">{message}</div>
            </div>
        </div>
    );
}
