import React, { useId, useRef } from 'react';

import { RiDeleteBin5Fill } from 'react-icons/Ri';

import { debounceFunction } from '../../../../../helpers/debounceFunction';

import { useGetProviderServices } from '../../../../../hooks/providerServices';
import { useAppSelector } from '../../../../../hooks/redux';
import { useActions } from '../../../../../hooks/actions';

import { IComment } from '../../../../../models/comment.model';
import { useDeleteCommentWithIdMutation } from '../../../../../redux/services/services';

export function Comment({ comment }: { comment: IComment }) {
  const persistentId = useId();
  const persistentRef = useRef<HTMLInputElement>(null);

  const { changePersistentOfComment, setComment, deleteComment } = useActions();

  const providerServices = useGetProviderServices();
  const currentService = useAppSelector((store) => store.service.service);
  const [deleteCommentWithId] = useDeleteCommentWithIdMutation();

  const isServiceOwner = () => providerServices?.some(
    (service) => service.id === currentService.id,
  );

  const changePersistentDebounced = debounceFunction(() => {
    const changePersistent = async () => {
      const result: any = await changePersistentOfComment({
        id: comment.id,
        persistent: persistentRef.current?.checked as boolean,
      });

      setComment(result.data as IComment);
    };

    if (comment.persistent !== persistentRef.current?.checked) {
      changePersistent();
    }
  }, 500);

  const deleteCommentHandler = () => {
    deleteComment(comment.id);
    deleteCommentWithId(comment.id);
  };

  return (
    <li className="comments__item p-3 bg-light-green rounded-tr-[20px] rounded-bl-[20px] mb-4">

      <header className="comments__item-persistent flex items-center justify-between mb-2">
        <time className="comments__item-time text-dark text-sm" dateTime={comment.timeStamp}>
          {comment.timeStamp}
        </time>

        {isServiceOwner() && (
          <div className="ml-auto comments__item-persistent flex items-center text-dark text-sm">
            <span className="mr-[5px]">Apply Persistent</span>

            <div className="switch">
              <input
                ref={persistentRef}
                defaultChecked={comment.persistent}
                onChange={() => changePersistentDebounced()}
                id={persistentId}
                type="checkbox"
              />
              <label htmlFor={persistentId} />
            </div>
          </div>
        )}
      </header>

      <p className="comments__item-content text-white text-lg">{comment.content}</p>

      {isServiceOwner() && (
        <div className="comments__item-remove flex items-center justify-end mt-2">
          <RiDeleteBin5Fill className="w-[30px] h-[30px] text-white cursor-pointer" onClick={() => deleteCommentHandler()} />
        </div>
      )}
    </li>
  );
}
