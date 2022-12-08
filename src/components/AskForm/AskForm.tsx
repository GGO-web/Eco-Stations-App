import React, { useRef } from 'react';

import { toast } from 'react-toastify';

import { useCreateServiceCommentMutation } from '../../redux/services/services';
import { useAppSelector } from '../../hooks/redux';

import { IComment } from '../../models/comment.model';

import 'react-toastify/dist/ReactToastify.css';

export function AskForm({ serviceId, setQuestion }: { serviceId: number, setQuestion: Function }) {
  const msgRef = useRef<HTMLTextAreaElement>(null);

  const [createServiceComment] = useCreateServiceCommentMutation();

  const isAuth = useAppSelector((store) => store.auth.isAuth);

  const handleSubmit = () => {
    if (!isAuth) {
      toast.error('Please register in a system 😉', {
        toastId: 'error-msg',
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1500,
      });

      return;
    }

    if (msgRef.current?.value === '') {
      toast.error('Please write your the question 😅', {
        toastId: 'error-msg',
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1500,
      });

      return;
    }

    const newComment: IComment = {
      id: serviceId,
      content: msgRef.current?.value as string,
      persistent: false,
    };

    createServiceComment(newComment);

    toast.success('Question has been sent 🚀', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1500,
    });

    setQuestion(false);
  };

  return (
    <div className="bg-[#35374f] mt-4 p-4 rounded-2xl">
      <div className="mb-2">
        <label htmlFor="question" className="text-[#f2f1f1]">Your Question</label>

        <textarea
          ref={msgRef}
          value={msgRef?.current?.value}
          onChange={(e) => e.target.value}
          className="rounded-2xl w-full p-2 mt-2 h-[100px] resize-none"
          placeholder="Enter Your Question..."
          id="question"
        />
      </div>

      <div className="flex justify-between">
        <button onClick={() => setQuestion(false)} className="text-sm py-2 px-8 max-[325px]:px-4 font-semibold uppercase rounded text-white bg-[#b14e46]" type="button">Quit</button>

        <button onClick={handleSubmit} className="text-sm py-2 px-8 max-[325px]:px-4 font-semibold uppercase rounded text-white bg-[#7bae37]" type="button">Submit</button>
      </div>
    </div>
  );
}
