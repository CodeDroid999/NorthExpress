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
          <span>{question}</span>
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

const Accordion: React.FC = () => {
  const faqData = [
    {
      question: 'What is QualityunitedWriters?',
      answer:
        'QualityunitedWriters is your go-to platform for getting things done quickly, precisely, and efficiently as well as getting your next job.Get your work done as a Client, Get your next side-hustle as a Tutor '
    },
    {
      question: 'Who is a Student?',
      answer: "A student is someone who posts assignments or work on the website. It typically means a user or contributor who shares Research, Technical, Assignments, or any form of work on our platform. Posters are members of our online community, researchers, students, professors, developers  bloggers, writers, photographers, or anyone who actively posts things to be done.",
    },
    {
      question: 'Who is a Tutor',
      answer: "A tutor is someone who takes on the assignments or work posted by the student. Taskers play a pivotal role on our platform, and they are the individuals who bring the posted projects and assignments to life. Taskers can encompass a wide range of skills and expertise, making them valuable assets to our online community."
    },
    {
      question: 'What services are available on QualityunitedWriters?',
      answer:
        'We offer a wide range of services, from posting assignments to finding the ideal candidate for your specific needs. From Technical writing which involves taking highly technical information like user manuals and research and turning it into content that the average person can understand. We have also a bunch of interesting assignments as well, for example, Web content and blog writing, Copywriting, Newswriting, Business writing, Ghostwritering, Instructional writing, and Resume writing. The customer will let you know if the assignment needs to be completed in person or remote and provide dates that assignments need to be completed by.',
    }, {
      question: 'What assignments are available for me to do?',
      answer:
        'There’s a wide range of assignments on QualityunitedWriters. From Technical writing which involves taking highly technical information like user manuals and research and turning it into content that the average person can understand. We have also a bunch of interesting assignments as well, for example, Web content and blog writing, Copywriting, Newswriting, Business writing, Ghostwritering, Instructional writing, and Resume writing. The customer will let you know if the assignment needs to be completed in person or remote and provide dates that assignments need to be completed by.',
    },
    {
      question: 'How do i get paid?',
      answer:
        ' You may commence the assignment assured that QualityunitedWriters has guaranteed the payment from the Student. Once you finish the job and claim payment, the Student will receive a notification to release the funds to your designated bank account. QualityunitedWriters will deduct a service fee, encompassing transactional, insurance, and maintenance costs, upon the release of payment to upgrade and advance the QualityunitedWriters platform, hence, increasing the potential for you to generate more earnings',
    },
    {
      question: 'Is there insurance?',
      answer:
        'So you can post or earn with peace of mind please refer to QualityunitedWriters Insurance page - terms and conditions apply.',
    },
    {
      question: 'Can I get alerts or notifications for assignments?',
      answer:
        'Of course! Set up assignment alerts in your account settings and we will let you know when any new assignments appear that match your interests.',
    },
    // Add more FAQ items as needed...
  ]

  return (
    <div className="mx-5 mx-auto my-4 min-h-screen max-w-screen-xl bg-neutral-100">
      <div className="mx-auto mt-8 grid w-full divide-y divide-neutral-200">
        {faqData.map((faqItem, index) => (
          <FAQItem
            key={index}
            question={faqItem.question}
            answer={faqItem.answer}
          />
        ))}
      </div>
      <div className="flex space-x-2">
        <div className="w-full max-w-sm rounded-full bg-green-900 px-1 py-1 pt-4 sm:w-[300px]  xl:my-1  xl:py-2 ">
          <Link
            href="/become-a-tutor"
            className="flex w-full flex-row justify-center text-lg font-semibold text-white"
          >
            Join QualityunitedWriters
            <MdArrowForward size={28} className="ml-3 pt-1 " />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Accordion
