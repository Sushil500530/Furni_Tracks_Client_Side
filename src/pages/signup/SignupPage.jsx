import { Link, useLocation, useNavigate } from 'react-router-dom';
import loginImage from '../../assets/image/authentication/undraw_secure_files_re_6vdh.svg'
import Container from '../../shared/container/Container';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth';
import { imageUpload } from '../../api/getData';
import toast from 'react-hot-toast';
import SocialAccount from '../../shared/socialAccount/SocialAccount';
import useaxiosPbulic from '../../hooks/useAxiosSecure';
import { useState } from 'react';
import { FaSpinner } from 'react-icons/fa';


const SignupPage = () => {
    const axiosPbulic = useaxiosPbulic();
    const navigate = useNavigate();
    const location = useLocation();
    const [loading,setLoading] = useState(false)
    const { createUser, updataUserProfile, googleSignIn } = useAuth();
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const handleSignIn = async (data) => {
        setLoading(true)
        const imageFile = data?.image[0];
        const loadImage = await imageUpload(imageFile)
        const image = loadImage?.data?.display_url;
        await createUser(data?.email, data?.password)
            .then(res => {
                updataUserProfile(data?.name, image)
                    .then(() => {
                        const userInfo = {
                            name: data?.name,
                            email: data?.email,
                            image,
                            role: 'guest',
                            status: 'Verified',
                        };
                        axiosPbulic.post('/users', userInfo)
                            .then(res => {
                                console.log(res.data);
                            })
                            .catch(error => console.log(error));
                    })
                    .catch(err => toast.error(err.message));

                if (res.user) {
                    setLoading(false)
                    navigate(location.state ? location?.state : '/')
                    return toast.success('Login Successfull...!');
                }
            })
            .catch(error => toast.error(error.message));

    }
    const handleGoogleSignIn = async() => {
        setLoading(true)
       await googleSignIn()
            .then(res => {
                if (res.user) {
                    const userInfo = {
                        name: res.user.displayName,
                        email: res.user.email,
                        image: res.user.photoURL,
                        role: 'guest',
                        status: 'Verified',
                    };
                    axiosPbulic.post('/users', userInfo)
                        .then(res => {
                            console.log(res.data);
                        })
                        .catch(error => toast.error(error.message))
                    navigate(location.state ? location?.state : '/');
                    return toast.success('Login Successfull...!');
                }
            })
            .catch(error => toast.error(error.message))
    }

    return (
        <Container>
            <div className="container mx-auto dark:text-white mb-12 flex flex-col lg:flex-row items-center justify-center gap-5">
                <div className="bg-[url('https://i.ibb.co/VHvdndf/Animated-Shape.png')] w-full lg:w-3/5 h-[80vh] bg-no-repeat bg-center bg-cover flex items-center justify-center p-5 rounded-md">
                    <img src={loginImage} alt="" />
                </div>
                <div className="card-body p-0 lg:p-8 border m-5 w-full lg:w-1/2">
                    <form onSubmit={handleSubmit(handleSignIn)} className="p-5 space-y-3">
                        <h1 className="text-3xl font-bold mb-12">Please Register Now🤠</h1>
                        <div className="space-y-3">
                            <label className="text-[18px]  font-medium">Username </label>
                            <input type="text"  {...register("name", { required: true })} name="name" className="input input-bordered input-info bg-[#F3F3F3] w-full border-blue-500 dark:text-black mb-2" id="" placeholder="Enter your name" />
                            {errors.name && <span className="text-red-500 mt-2">name is required!</span>}
                        </div>
                        <div className="space-y-3">
                            <label className="text-[18px]  font-medium">Email Address</label>
                            <input type="email"  {...register("email", { required: true })} name="email" className="input input-bordered input-info bg-[#F3F3F3] w-full border-blue-500 dark:text-black mb-1" id="" placeholder="Enter your username or address" />
                            {errors.email && <span className="text-red-500 mt-1">email is required!</span>}
                        </div>
                        <div className="space-y-3">
                            <label className="text-[18px] font-medium">Password</label>
                            <input type="password"  {...register("password", {
                                required: true, minLength: 6,
                                pattern: /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/
                            })} name="password" className="input input-bordered input-info bg-[#F3F3F3] w-full border-blue-500 dark:text-black" id="" placeholder="Enter your password" />
                            {errors.password?.type === "minLength" && <span className="text-red-600">password length must be 6 characters or longer!</span>}
                            {errors.password?.type === 'pattern' && <span className="text-red-600">password must have one uppercase one lowercase one number and one special character!</span>}
                            {errors.password?.type === "required" && (
                                <p className="text-red-600">password is required!</p>
                            )}
                        </div>
                        <div className="space-y-3">
                            <label className="text-[18px]  font-medium">Set Your Profile Picture</label>
                            <input type="file"  {...register("image", { required: true })} name="image" className="file-input file-input-bordered file-input-info w-full border dark:text-black mb-1" id="" />
                            {errors.image && <span className="text-red-500 mt-1">image is required!</span>}
                        </div>
                        <p className="text-base font-medium my-8"> have an account?{' '} Please <Link to='/login' className="text-blue-500 underline">Sign In</Link></p>
                        <button type='submit' className="btn px-8 text-white bg-gradient-to-r from-[#0939e8] to-[#ff0fdb] text-[18px] font-medium hover:text-blue-500 w-full">
                        {loading ? (
                           <span className='flex items-center justify-center gap-3'> <FaSpinner className='m-auto animate-spin' size={24} /> Processing....</span>
                        ) : (
                            'Sign Up'
                        )}
                        </button>
                    </form>
                    <div className="w-3/5 mx-auto pb-6">
                        <div className="divider text-2xl">Or</div>
                        <SocialAccount handleGoogleSignIn={handleGoogleSignIn} name={'Sign in With Google'} />
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default SignupPage;