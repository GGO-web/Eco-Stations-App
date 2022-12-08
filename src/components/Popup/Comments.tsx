import React from 'react';

import { v4 } from 'uuid';

import { IComment } from '../../models/comment.model';

import './Comments.scss';

export function Comments({ comments }: { comments: IComment[] | undefined }) {
  return (
    <ul className="comments">
      {comments?.map((comment: IComment) => (
        <li key={v4()} className="comments__item p-3 bg-light-green rounded-tr-[20px] rounded-bl-[20px] mb-4">
          <time className="comments__item-time text-dark text-sm" dateTime={comment.timeStamp}>{comment.timeStamp}</time>
          <p className="comments__item-content text-white text-lg">{comment.content}</p>
        </li>
      ))}
    </ul>
  );
}
