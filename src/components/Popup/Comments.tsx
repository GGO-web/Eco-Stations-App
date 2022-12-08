import React, {
  useEffect,
  useId, useState,
} from 'react';

import { v4 } from 'uuid';
import { useDebounce } from '../../hooks/debounce';
import { useAppSelector } from '../../hooks/redux';

import { IComment } from '../../models/comment.model';
import { useChangeCommentPersistentMutation, useGetServicesOfProviderQuery } from '../../redux/services/services';

import './Comments.scss';

export function Comments({ comments }: { comments: IComment[] | undefined }) {
  return (
    <ul className="comments mb-3">
      {comments?.map((comment: IComment) => {
        const [commentState] = useState(comment);
        const persistentId = useId();

        const [persistent, setPersistent] = useState(comment.persistent);
        const persistentDebounced = useDebounce(persistent, 400);
        const [changeCommentPersistent] = useChangeCommentPersistentMutation();

        const { data: providerServices } = useGetServicesOfProviderQuery();
        const currentService = useAppSelector((store) => store.service.service);

        const changeCommentPersistentHandler = () => {
          changeCommentPersistent({
            id: commentState.id,
            persistent,
          });
        };

        const isServiceOwner = () => providerServices?.some(
          (service) => service.id === currentService.id,
        );

        useEffect(() => {
          changeCommentPersistentHandler();
        }, [persistentDebounced]);

        return (
          <li key={v4()} className="comments__item p-3 bg-light-green rounded-tr-[20px] rounded-bl-[20px] mb-4">
            <header className="comments__item-persistent flex items-center justify-between">
              <time className="comments__item-time text-dark text-sm" dateTime={commentState.timeStamp}>
                {commentState.timeStamp}
              </time>

              {isServiceOwner()
              && (
              <div className="ml-auto comments__item-persistent flex items-center text-dark text-sm">
                <span className="mr-[5px]">Apply Persistent</span>

                <div className="switch">
                  <input
                    onChange={(e) => {
                      setPersistent(e.target.checked);
                    }}
                    checked={persistentDebounced}
                    id={persistentId}
                    type="checkbox"
                  />
                  <label htmlFor={persistentId} />
                </div>
              </div>
              )}
            </header>

            <p className="comments__item-content text-white text-lg">{commentState.content}</p>
          </li>
        );
      })}
    </ul>
  );
}
