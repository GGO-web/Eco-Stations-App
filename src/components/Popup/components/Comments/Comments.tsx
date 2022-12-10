import React from 'react';
import { v4 } from 'uuid';

import { IComment } from '../../../../models/comment.model';

import './Comments.scss';

import { Comment } from './components/Comment';

export function Comments({ comments }: { comments: IComment[] | undefined }) {
  return (
    <ul className="comments mb-3">
      {comments?.map((comment: IComment) => <Comment key={v4()} comment={comment} />)}
    </ul>
  );
}
