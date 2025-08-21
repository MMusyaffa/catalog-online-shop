import React from "react";

export default function ModalDelete({ isOpen, onClose, onConfirm, item }) {
    if (!isOpen) return null;

    return (
        <dialog id="delete_modal" className="modal modal-bottom sm:modal-middle select-none" open>
            <div className="modal-box">
                <h3 className="font-bold text-lg">Confirm Delete</h3>
                <p className="py-4">
                    Are you sure you want to delete <b>{item?.name || "this item"}</b>?
                </p>
                <div className="modal-action flex justify-between">
                    <button
                        className="btn btn-error" type="button"
                        onClick={() => {
                            onConfirm(item.id);
                            onClose();
                        }}
                    > Delete
                    </button>
                    <button className="btn ml-78" type="button" onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </dialog>
    );
}
