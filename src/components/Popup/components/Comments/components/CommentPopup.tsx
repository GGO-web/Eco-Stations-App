import React from 'react';

import { toast } from 'react-toastify';
import { useDeleteCommentWithIdMutation } from '../../../../../redux/services/services';

import { useActions } from '../../../../../hooks/actions';

export function CommentPopup({ id, setPopup }:
{ id: number, setPopup: Function }) {
  const [deleteCommentWithId] = useDeleteCommentWithIdMutation();

  const { deleteComment } = useActions();

  const deleteCommentHandler = () => {
    deleteComment(id);
    deleteCommentWithId(id);

    toast.success('Comment has been deleted 😎', {
      toastId: 'delete-msg',
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1500,
    });
  };

  return (
    <div className="fixed top-0 left-0 grid place-items-center w-full h-screen bg-light z-[100] p-10">
      <div className="max-w-[600px] bg-white p-5 rounded-2xl">
        <h3 className="mb-2 text-center">Are you sure you want to delete this comment?</h3>
        <div className="flex justify-between text-white">
          <button
            onClick={() => setPopup(false)}
            type="button"
            className="p-2 bg-dark-green rounded-2xl cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={deleteCommentHandler}
            type="button"
            className="p-2 bg-red-400 rounded-2xl cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
