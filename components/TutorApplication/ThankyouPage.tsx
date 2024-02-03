import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { UserAuth } from 'context/AuthContext';

const ThankYouPage = () => {
  const router = useRouter();
  const { user } = UserAuth();
  const userId = user?.userId;


  const handleFinish = (e) => {
    router.push(`/application-history/${user?.userId}`);
  };
  const handleView = (e) => {
    router.push(`/application-history/${user?.userId}`);

  };




  return (
    <div className="p-3 bg-white">
      <p className="text-3xl font-bold text-blue-950 mb-4">Thank You for Your Application!</p>
      <p className="text-lg mb-4">
        Your application has been successfully submitted. We appreciate your interest in becoming a tutor.
      </p>
      <div className="flex gap-4">
        <button
          type="button"
          className="flex-1 cursor-pointer rounded-xl bg-gray-300 py-2 text-center text-gray-700"
          onClick={handleFinish}
        >

          Finish
        </button>
        <button
          type="button"
          className="flex-1 cursor-pointer rounded-xl bg-green-900 py-2 text-center text-white"
          onClick={handleView}
        >
          View Application history
        </button>
      </div>

    </div >
  );
};

export default ThankYouPage;
