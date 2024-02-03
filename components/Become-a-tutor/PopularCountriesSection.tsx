import React from 'react';

const PopularCountries = () => {
    const popularCountries = [
        'Canada',
        'India',
        'Poland',
        'Indonesia',
        'Malaysia',
        'Mexico',
        'Nigeria',
        'Kenya',
        'Pakistan',
        'Philippines',
    ];

    return (
        <div className="bg-green-900  px-4 py-16 ">
            <div className="container">
                <div className="flex flex-1 flex-col items-center justify-center">
                    <h1 className="text-center  md:text-2xl font-bold text-gray-100 pt-2 pb-4  ">
                        Popular Tutor Countries
                    </h1>
                    <div className="row justify-between md:border">
                        {popularCountries.map((country, index) => (
                            <span key={index} className="col-sm-2 md:col-md-1 py-2 px-2 md:text-lg text-gray-300 underline font-extrabold md:border">
                                {country}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    );
};

export default PopularCountries;
