import ApplicationsStatsCard from 'components/AdminDasboard/ApplicationsStatsCard';
import AssignmentsStatsCard from 'components/AdminDasboard/AsssignmentsStatsCard';
import ManageAdminsCard from 'components/AdminDasboard/ManageAdminsCard';
import UsersStatsCard from 'components/AdminDasboard/UsersStatsCard';
import Navbar from 'components/AdminLayout/Navbar';
import AdminSideNav from 'components/AdminLayout/SideNav';
import Footer from 'components/unAuthed/Footer';
import { UserAuth } from 'context/AuthContext';
import AdminAccess from 'hooks/AdminHook';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';

const AdminDashboard: React.FC = () => {
    const router = useRouter();
    const { userRole } = UserAuth(); // Access the userRole from the context

    useEffect(() => {
        const redirectToRolePage = () => {
            if (userRole) {
                switch (userRole) {
                    case 'Student':
                        // Redirect Student to post-assignment
                        toast.success("You need an Admin account to access this.");
                        router.push('/dashboard');
                        break;
                    case 'Tutor':
                        // Redirect Tutor to dashboard
                        toast.success("You need an Admin account to access this.");
                        router.push('/dashboard');
                        break;
                    case 'Admin':
                        // Redirect Tutor to dashboard
                        toast.success("You are an Admin ");
                        break;
                    default:
                        // Redirect others to a default page
                        router.push('/');
                        break;
                }
            }
        };

        redirectToRolePage();
    }, [userRole, router]);


    return (
        <>
            <Head>
                <title>
                    QualityUnitedWriters - Your Academic Research and Project Partner
                </title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta
                    name="description"
                    content="Discover a dedicated platform for students and tutors offering expert assistance in a wide range of academic research and projects. Quality Unitted Writers connects you with quality solutions for your educational needs. Whether you're seeking help with essays, theses, or any academic work, our talented team is here to assist you."
                />
                <meta name="keywords" content="Academic writing services, Expert academic writers, Professional research assistance, High-quality research papers, Academic project support, Thesis and dissertation help, Essay writing service, Top-rated tutors, Academic success tips, Homework assistance, Online tutoring, Quality writing solutions, Best essay writers, Custom research papers, Academic support platform, Tutoring for students, Research paper editing, Writing and editing services, Academic guidance, Homework help for students" />
                <meta name="author" content="QualityUnitedWriters" />
                <meta name="robots" content="index, follow" />
                <meta name="og:title" property="og:title" content="QualityUnitedWriters - Your Academic Research and Project Partner" />
                <meta
                    name="og:description"
                    property="og:description"
                    content="Discover a dedicated platform for students and tutors offering expert assistance in a wide range of academic research and projects. Quality Unitted Writers connects you with quality solutions for your educational needs. Whether you're seeking help with essays, theses, or any academic work, our talented team is here to assist you."
                />
                <meta name="og:image" property="og:image" content="public/sync-my-socials-logo.png" />

                <meta name="og:url" property="og:url" content="https://www.qualityunitedswriters.com" />
            </Head>
            <Navbar />
            <div className="row flex pt-12 mt-8">
                <div className="container flex">
                    <div className="col-md-2 mx-auto ">
                        <AdminSideNav />
                    </div>
                    <div className="col-md-10 mx-auto h-full pl-2 shadow-inner">
                        <div className="row min-w-100 ">
                            <div className="row w-full mx-auto">
                                <div className="col-md-6 p-2">
                                    <ApplicationsStatsCard />

                                </div>
                                <div className="col-md-6 p-2">
                                    <AssignmentsStatsCard />
                                </div>
                            </div>
                            <div className="row w-full mx-auto">
                                <div className="col-md-6 p-2">
                                    <UsersStatsCard />
                                </div>
                                <div className="col-md-6 p-2">
                                    <ManageAdminsCard />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );


};

export default AdminDashboard;