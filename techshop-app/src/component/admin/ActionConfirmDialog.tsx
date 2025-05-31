type ActionConfirmDialogProps = {
    display: boolean;
    onClose: () => void;
    onConfirm: () => void;
    message?: string;
    description?: string;
}
export default function ActionConfirmDialog({
    display,
    onClose,
    onConfirm,
    message = "Bạn có chắc chắn muốn thực hiện hành động này?",
    description
}: ActionConfirmDialogProps) {
    if (!display) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white p-3 rounded shadow-lg w-80">
                <h2 className="text-lg font-bold mb-4">Xác nhận</h2>
                <p className="mb-3">{message}</p>
                <p className="mb-3 text-sm">{description}</p>
                <div className="grid grid-cols-2 gap-2">
                    <button onClick={onClose} className="px-4 py-2 font-bold bg-gray-300 hover:shadow-md rounded">Huỷ</button>
                    <button onClick={onConfirm} className="px-4 py-2 font-bold bg-red-500 hover:shadow-md text-white rounded">Xác nhận</button>
                </div>
            </div>
        </div>
    );
}