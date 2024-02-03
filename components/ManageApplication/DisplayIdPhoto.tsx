import React, { useEffect, useState } from 'react';
import { getDownloadURL, ref, getStorage } from 'firebase/storage';
import { UserAuth } from 'context/AuthContext';
import Image from 'next/image';

const DisplayIDPhotos = ({ userId, applicationId }) => {
    const { user } = UserAuth();
    const storage = getStorage();

    const [frontUrl, setFrontUrl] = useState(null);
    const [backUrl, setBackUrl] = useState(null);

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const frontPath = `${userId}_${applicationId}_frontId}`;
                const backPath = `${userId}_${applicationId}_backId`;

                const frontRef = ref(storage, frontPath);
                const backRef = ref(storage, backPath);

                const frontDownloadURL = await getDownloadURL(frontRef);
                const backDownloadURL = await getDownloadURL(backRef);

                setFrontUrl(frontDownloadURL);
                setBackUrl(backDownloadURL);
            } catch (error) {
                console.error('Error fetching photos:', error);
            }
        };

        if (userId && applicationId) {
            fetchPhotos();
        }
    }, [userId, applicationId]);

    return (
        <div>
            {frontUrl && (
                <div>
                    <p>Front Photo:</p>
                    <Image src={frontUrl} alt="Front ID" />
                </div>
            )}

            {backUrl && (
                <div>
                    <p>Back Photo:</p>
                    <Image src={backUrl} alt="Back ID" />
                </div>
            )}
        </div>
    );
};

export default DisplayIDPhotos;
