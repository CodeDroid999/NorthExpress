import React from 'react'
import Link from 'next/link'
import { MdArrowForward } from 'react-icons/md'

const FAQItem: React.FC<{ question: string; answer: string }> = ({
  question,
  answer,
}) => {
  return (
    <div className="py-2">
      <details className="group">
        <summary className="items-left flex cursor-pointer list-none justify-between bg-neutral-200 p-3 font-medium">
          <span className='text-green-900'>{question}</span>
          <span className="transition group-open:rotate-180">
            <svg
              fill="none"
              height="24"
              shapeRendering="geometricPrecision"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              width="24"
            >
              <path d="M6 9l6 6 6-6"></path>
            </svg>
          </span>
        </summary>
        <p className="group-open:animate-fadeIn bg-white p-3 text-neutral-600">
          {answer}
        </p>
      </details>
    </div>
  )
}

const FAQAccordion: React.FC = () => {
  const faqData = [
    {
      question: 'What is QualityUnitedWriters?',
      answer:
        'QualityUnitedWriters is your go-to platform for getting things done quickly, precisely, and efficiently as well as getting your next job.Get your work done as a Client, Get your next side-hustle as a Tutor '
    }, {
      question: 'What services are available on QualityUnitedWriters?',
      answer:
        'We offer a wide range of services, from posting assignments to finding the ideal candidate for your specific needs. From Technical writing which involves taking highly technical information like user manuals and research and turning it into content that the average person can understand. We have also a bunch of interesting assignments as well, for example, Web content and blog writing, Copywriting, Newswriting, Business writing, Ghostwritering, Instructional writing, and Resume writing. The customer will let you know if the assignment needs to be completed in person or remote and provide dates that assignments need to be completed by.',
    }, {
      question: 'What assignments are available for me to do?',
      answer:
        'There’s a wide range of assignments on QualityUnitedWriters. From Technical writing which involves taking highly technical information like user manuals and research and turning it into content that the average person can understand. We have also a bunch of interesting assignments as well, for example, Web content and blog writing, Copywriting, Newswriting, Business writing, Ghostwritering, Instructional writing, and Resume writing. The customer will let you know if the assignment needs to be completed in person or remote and provide dates that assignments need to be completed by.',
    },
    {
      question: 'How do i get paid?',
      answer:
        ' You may commence the assignment assured that QualityUnitedWriters has guaranteed the payment from the Student. Once you finish the job and claim payment, the Student will receive a notification to release the funds to your designated bank account. QualityUnitedWriters will deduct a service fee, encompassing transactional, insurance, and maintenance costs, upon the release of payment to upgrade and advance the QualityUnitedWriters platform, hence, increasing the potential for you to generate more earnings',
    },
    {
      question: 'Is there insurance?',
      answer:
        'So you can post or earn with peace of mind please refer to Airtsker Insurance page - terms and conditions apply.',
    },
    {
      question: 'Can I get alerts or notifications for assignments?',
      answer:
        'Of course! Set up assignment alerts in your account settings and we will let you know when any new assignments appear that match your interests.',
    },
    // Add more FAQ items as needed...
  ]

  return (
    <div className="p-4   bg-gray-100">
      <div className="items-left flex flex-col">
        <h2 className="mt-5 text-5xl font-bold tracking-tight text-green-900">
          Frequently Asked Questions
        </h2>
      </div>
      <div className="mx-auto mt-8 grid w-full divide-y divide-green-700 ">
        {faqData.map((faqItem, index) => (
          <FAQItem
            key={index}
            question={faqItem.question}
            answer={faqItem.answer}
          />
        ))}
      </div>

    </div>
  )
}

export default FAQAccordion
