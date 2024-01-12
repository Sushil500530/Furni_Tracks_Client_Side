import coverImage from '../../../assets/image/setting2..gif'
import { FcBusinessman } from "react-icons/fc";
import useRole from '../../../hooks/useRole';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { imageUpload } from '../../../api/getData';

const Setting = () => {
    const [users, refetch, ] = useRole();
    const axiosSecure = useAxiosSecure();
    // console.log(users);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.name.value;
        const image = form.image.files[0];
        const status = form.status.value;

        try {
            const loadImage = await imageUpload(image);
            const changeData = {
                name,
                email,
                image: loadImage?.data?.display_url,
                status,
            }
            console.log(changeData);
            await axiosSecure.put(`/user/${users?._id}`, changeData)
                .then(res => {
                    console.log(res.data);
                    if (res.data?.modifiedCount > 0) {
                        refetch()
                        toast.success('updated successfully')
                    }
                })
        }
        catch (error) {
            toast.error('Please Choose file or select Image!');
        }
    }
    return (
        <div className='mb-12'>
            <div className="bg-[url('https://i.ibb.co/grk28gT/settng.gif')] w-full h-[60vh] bg-cover bg-no-repeat object-cover relative">
                <figure className='w-[250px] h-[250px] rounded-full absolute top-1/3 left-[25%] md:left-1/3 lg:left-[42%] border-4 border-fuchsia-500 cursor-pointer opacity-100 z-50 hover:border-blue-700'>
                    <img src={users?.image} alt="profile_image" className='w-full h-full rounded-full' />
                </figure>
                <div className='bg-black absolute w-full h-full opacity-60 '></div>
            </div>
            <h1 className="text-2xl font-bold text-center flex items-center gap-2 justify-center mt-8"> Settings to Your Profile <FcBusinessman className="w-6 h-6" /></h1>
            <div className='flex flex-col md:flex-row lg:flex-row gap-8 w-full md:w-[90%] lg:w-[70%] mx-auto mt-10'>
                <div className='flex flex-col gap-2 items-center justify-center border py-8 w-full h-[350px] mt-6'>
                    <h1 className='text-xl font-bold'>Name: {users?.name}</h1>
                    <h1 className='text-xl font-bold'>Email: {users?.email}</h1>
                    <h1 className='text-xl font-bold'>Profile Photo</h1>
                    <figure className='w-20 h-20'>
                        <img src={users?.image} alt="profile_image" className='w-full h-full rounded-full' />
                    </figure>
                    <h1 className='px-8 py-3 bg-fuchsia-600 text-white rounded-full text-xl font-bold mb-3'>Role: {users?.role}</h1>
                    <h1 className='text-xl font-bold'>Status: {users?.status}</h1>
                </div>
                <form onSubmit={handleSubmit} className='flex flex-col gap-2 items-start justify-center border py-8 text-xl px-3 md:px-4 lg:px-7 w-full h-auto mb-20'>
                    <label>Name*</label>
                    <input type="text" name='name' defaultValue={users?.name} className="input input-bordered input-info w-full max-w-xs" required />
                    <label>Email*</label>
                    <input type="text" name='email' defaultValue={users?.email} className="input input-bordered input-info w-full max-w-xs" required />
                    <div>
                        <h1 className='text-xl mb-2'>Profile Photo</h1>
                        <div className="bg-clip-content p-6 bg-violet-600 border-4 border-violet-300 border-dashed w-full">
                            <input type="file" name='image' className="file-input file-input-bordered file-input-primary w-full max-w-xs" required />
                        </div>
                    </div>
                    <label>Status*</label>
                    <input type="text" name='status' defaultValue={users?.status} className="input input-bordered input-info w-full max-w-xs" />
                    <button className='btn text-white bg-gradient-to-r from-[#0939e8] to-[#ff0fdb] my-3 text-[17px] hover:text-blue-300' type='submit'>Save Chnages</button>
                </form>
            </div>
        </div>
    );
};

export default Setting;