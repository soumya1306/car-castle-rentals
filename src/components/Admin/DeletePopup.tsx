import React from "react";
import { LuX } from "react-icons/lu";

type DeletePopupProps = {
  setRemovePopupActive: (active: boolean) => void;
  handleDelete: () => void;
};

const DeletePopup = ({
  setRemovePopupActive,
  handleDelete,
}: DeletePopupProps) => {
  return (
    <div className="fixed inset-0 w-screen h-screen bg-black/50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg p-6 w-[400px] max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center">
          <h2 className="text-primary/90 text-[18px]">Confirm Deletion</h2>
          <button
            className="cursor-pointer text-primary/70"
            onClick={() => setRemovePopupActive(false)}
          >
            <LuX size={20} />
          </button>
        </div>
        <p className="text-[16px] mt-4">
          Are you sure you want to delete this car?
        </p>
        <div className="flex justify-end gap-4 mt-6">
          <button
            className="bg-gray-200/80 hover:bg-gray-200 rounded-md px-2 py-1 cursor-pointer"
            onClick={() => setRemovePopupActive(false)}
          >
            Cancel
          </button>
          <button
            className="bg-red-600/90 hover:bg-red-600 text-white rounded-md px-2 py-1 cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePopup;
