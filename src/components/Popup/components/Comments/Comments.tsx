import React, {
  useId, useRef, useState,
} from 'react';

import { v4 } from 'uuid';

import {
  useLazyChangeCommentPersistentQuery,
} from '../../../../redux/services/services';

import { useAppSelector } from '../../../../hooks/redux';

import { IComment } from '../../../../models/comment.model';
import { debounceFunction } from '../../../../helpers/debounceFunction';

import './Comments.scss';
import { useGetProviderServices } from '../../../../hooks/providerServices';

export function Comments({ comments }: { comments: IComment[] | undefined }) {
  return (
    <ul className="comments mb-3">
      {comments?.map((comment: IComment) => {
        const persistentId = useId();
        const persistentRef = useRef<HTMLInputElement>(null);

        const [changeCommentPersistent] = useLazyChangeCommentPersistentQuery();

        const providerServices = useGetProviderServices();
        const currentService = useAppSelector((store) => store.service.service);

        const isServiceOwner = () => providerServices?.some(
          (service) => service.id === currentService.id,
        );

        const changeCommentPersistentHandler = () => {
          const changePersistent = async () => {
            const changedComment = await changeCommentPersistent({
              id: comment.id,
              persistent: persistentRef.current?.checked as boolean,
            }).unwrap();

            console.log(changedComment);
          };

          changePersistent();
        };

        const changePersistentDebounced = debounceFunction(changeCommentPersistentHandler, 400);

        return (
          <li key={v4()} className="comments__item p-3 bg-light-green rounded-tr-[20px] rounded-bl-[20px] mb-4">
            <header className="comments__item-persistent flex items-center justify-between">
              <time className="comments__item-time text-dark text-sm" dateTime={comment.timeStamp}>
                {comment.timeStamp}
              </time>

              {isServiceOwner()
              && (
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
      })}
    </ul>
  );
}
