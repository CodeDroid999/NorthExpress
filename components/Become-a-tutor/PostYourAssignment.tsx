import React from 'react'

export default function PostYourAssignment() {
    return (
        <div className="sm:px-18  flex h-[50vh] flex-col-reverse items-center  bg-violet-100  px-4 py-8  lg:px-24 xl:my-10 xl:flex-row  xl:px-36">
            <div className="container">
                <div className="flex flex-1 flex-col items-center justify-center">
                    <p className="text-center text-4xl  font-bold text-yellow-500 md:mt-5 md:mb-10 ">
                        Why you should tutor on studypool
                    </p>
                    <div className="flex justify-center w-full flex-col md:flex-row md:space-x-6">
                        <div className="col-md-4">
                            <div className="p2">
                                <h3 className="text-blue-950 font-semibold uppercase">
                                    Lowest service fees
                                </h3>
                                <p>
                                    Starting at 20%, Qualityunitedwriters charges the lowest service fees in the market. We like to give our tutors what they earn
                                </p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="p2">
                                <h3 className="text-blue-950 font-semibold uppercase">
                                    Reliable Income
                                </h3>
                                <p>
                                    Make good money using nothing more than your knowledge and your keyboard.
                                </p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <h3 className="text-blue-950 font-semibold uppercase whitespace-nowrap">
                                Freedom and Flexibility
                            </h3>
                            <p>
                                Choose when to work and where you want to work from. There is no boss, no office and no quotas. Create your own Schedule.
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
