import React, { useId, useRef } from 'react';

import { debounceFunction } from '../../../../../helpers/debounceFunction';

import { useGetProviderServices } from '../../../../../hooks/providerServices';
import { useAppSelector } from '../../../../../hooks/redux';
import { useActions } from '../../../../../hooks/actions';

import { IComment } from '../../../../../models/comment.model';

export function Comment({ comment }: { comment: IComment }) {
  const persistentId = useId();
  const persistentRef = useRef<HTMLInputElement>(null);

  const { changePersistentOfComment, setComment } = useActions();

  const providerServices = useGetProviderServices();
  const currentService = useAppSelector((store) => store.service.service);

  const isServiceOwner = () => providerServices?.some(
    (service) => service.id === currentService.id,
  );

  const changeCommentPersistentHandler = () => {
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
  };

  const changePersistentDebounced = debounceFunction(changeCommentPersistentHandler, 500);

  return (
    <li className="comments__item p-3 bg-light-green rounded-tr-[20px] rounded-bl-[20px] mb-4">
      <header className="comments__item-persistent flex items-center justify-between">
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
    </li>
  );
}
