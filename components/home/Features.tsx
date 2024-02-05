import React from 'react';
import Image from 'next/image';
import { BiDollar, BiStar } from 'react-icons/bi';
import { SiAdguard } from 'react-icons/si';
import photo3 from 'public/photo3.jpg';
import Link from 'next/link';

export default function Features() {
  const features = [
    {
      title: 'Value for your money',
      content:
        'Concentrate on your travel arrangements knowing that we have your finances in mind. If you need help, we offer support around-the-clock.',
      icon: <BiDollar size={28} />,
    },
    {
      title: 'Comfort',
      content:
        ' At North Express, we are redefining comfort.Our buses are equipped with large and comfortable seats.',
      icon: <BiStar size={28} />,
    },
    {
      title: 'Safe and Secure',
      content:
        'We have 24/7 surveillance on sll our premises. Our insured shuttles are proven to have an excellent safety score.',
      icon: <SiAdguard size={24} />,
    },
  ];

  return (
    <div className="w-full pt-5 pb-5 flex flex-1 items-start justify-start bg-gray-100">
      <div className="container">
        <div className="pb-4">
          <h1 className="font-bold text-center text-4xl text-green-950 ">
            Why travel with us?
          </h1>
        </div>

        <div className="row flex flex-row flex-wrap justify-between">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`w-full col-md-3 xl:w-[30%] mb-6 md:mb-0 md:pr-5 feature-card border border-green-100 rounded p-2 shadow`}
            >
              <div className="flex justify-center">
                <div className="pt-1 text-blue-600 text-4xl">{feature.icon}</div>
              </div>
              <div className="ml-3 flex flex-col">
                <h4 className="text-2xl text-center font-semibold text-green-900">
                  {feature.title}
                </h4>
                <p className="mt-1 text-center text-[18px] font-[490] leading-[22px] text-green-950">
                  {feature.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
