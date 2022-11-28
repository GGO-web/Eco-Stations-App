import React from 'react';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AskForm({ setQuestion }: { setQuestion: Function }) {
  const handleSubmit = () => {
    toast.success('Question has been sent 🚀', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1500,
    });
    setQuestion(false);
  };

  return (
    <div className="bg-[#35374f] mt-4 p-4 rounded-2xl">
      <div className="mb-2">
        <label htmlFor="username" className="text-[#f2f1f1]">Your Username</label>
        <input className="rounded-2xl w-full p-2 " placeholder="Enter Your Username..." id="username" type="text" />
      </div>
      <div className="mb-2">
        <label htmlFor="question" className="text-[#f2f1f1]">Your Question</label>
        <textarea className="rounded-2xl w-full p-2 h-[100px] resize-none" placeholder="Enter Your Question..." id="question" />
      </div>
      <div className="flex justify-between">
        <button onClick={() => setQuestion(false)} className="text-sm py-2 px-8 max-[325px]:px-4 font-semibold uppercase rounded text-white bg-[#b14e46]" type="button">Quit</button>
        <button onClick={handleSubmit} className="text-sm py-2 px-8 max-[325px]:px-4 font-semibold uppercase rounded text-white bg-[#7bae37]" type="button">Submit</button>
      </div>
    </div>
  );
}

export default AskForm;
