import { useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useLoaderData, useNavigate } from "react-router-dom";
import useFurCategory from "../../../../hooks/useFurCategory";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { imageUpload } from "../../../../api/getData";
import { useAuth } from "../../../../hooks/useAuth";
import { FaSpinner } from "react-icons/fa";
import Loader from "../../../../shared/Loader";

const UpdatedProduct = () => {
    const findUpdataData = useLoaderData();
    const [loading, setLoading] = useState(false);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [category, ,isLoading] = useFurCategory();

    if (isLoading) {
        return <Loader />
    }
    const handleAddedProduct = async (e) => {
        e.preventDefault();
        setLoading(true);
        const form = e.target;
        const product_name = form.product_name.value;
        const image = form.image?.files[0];
        const thumb1 = form.thumbnail1.files[0];
        const thumb2 = form.thumbnail2.files[0];
        const description = form.description.value;
        const quantity = form.quantity.value;
        const category = form.category.value;
        const rating = form.rating.value;
        const price = form.product_cost.value;
        const product_prof = form.product_profit.value;
        const product_profit = parseInt(product_prof)
        const discount = form.discount.value;
        const owner_name = user?.displayName;
        const email = user?.email;
        const location = form.location.value;

        try {
            const loadImage = await imageUpload(image);
            const thmbnl1 = await imageUpload(thumb1);
            const thmbnl2 = await imageUpload(thumb2);
            const updatedProducts = {
                title: product_name,
                quantity,
                category,
                rating,
                price,
                image: loadImage?.data?.display_url,
                product_profit,
                thumbnail1: thmbnl1?.data?.display_url,
                thumbnail2: thmbnl2?.data?.display_url,
                discount,
                description,
                location,
                email,
                owner_name
            };
            // console.log(updatedProducts);
            axiosSecure.patch(`/updated/${findUpdataData?._id}`, updatedProducts)
                .then(res => {
                    setLoading(false)
                    if (res.data?.modifiedCount > 0) {
                        Swal.fire({
                            title: "Updated Successfull!",
                            text: "You clicked the button!",
                            icon: "success",
                            timer: 1000
                        });
                          return navigate('/dashboard/my-product')
                    }
                })
        }
        catch (error) {
            setLoading(false);
            toast.error(error.message)
        }
    }


    return (
        <div className="w-[90%] mx-auto dark:text-white">
            {/* <Helmet>
                <title>Product Added | Inventory M</title>
            </Helmet> */}
            <h3 className="text-3xl text-center font-bold mt-12 mb-5 flex items-center justify-center gap-2 font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0939e9] to-[#ff0fdb]">Update Product  </h3>
            <div className="container mx-auto mt-12">
                <form onSubmit={handleAddedProduct}>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
                        <div className='space-y-6'>
                            <div className="flex flex-col md:flex-row lg:flex-row w-full gap-4">
                                <div className='space-y-1 w-full'>
                                    <label htmlFor='location' className='dark:text-white block text-black font-medium'>
                                        Product Name
                                    </label>
                                    <input className='w-full px-4 py-3 text-gray-800 border rounded-md input input-info ' name='product_name' defaultValue={findUpdataData?.title} id='product_name' type='text' placeholder='Product name' required
                                    />
                                </div>
                                <div className='space-y-1 w-full'>
                                    <label htmlFor='location' className='block dark:text-white text-black font-medium'>
                                        Location
                                    </label>
                                    <input className='w-full px-4 py-3 text-gray-800 border rounded-md input input-info '
                                        name='location' defaultValue={findUpdataData?.location} id='location' type='text' placeholder='Location' required
                                    />
                                </div>
                            </div>

                            <div className='space-y-1 w-full'>
                                <label htmlFor='location' className='block dark:text-white text-black font-medium'>
                                    Image
                                </label>
                                <div className=' bg-white w-full m-auto rounded-lg'>
                                    <label className="my-5"></label>
                                    <div className='file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg overflow-hidden'>
                                        <input type='file' name='image' id='image' accept='image/*' className="file-input w-full file-input-info focus:border-none " />
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row lg:flex-row w-full gap-4">
                                <div className='space-y-1 w-full'>
                                    <label htmlFor='location' className='block dark:text-white text-black font-medium'>
                                        Set Thumbnail1
                                    </label>
                                    <div className=' bg-white w-full m-auto rounded-lg'>
                                        <label className="my-5"></label>
                                        <div className='file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg overflow-hidden'>
                                            <input type='file' name='thumbnail1' id='thumbnail1' accept='image/*' className="file-input w-full file-input-info focus:border-none " />
                                        </div>
                                    </div>
                                </div>
                                <div className='space-y-1 w-full'>
                                    <label htmlFor='location' className='block dark:text-white text-black font-medium'>
                                        Set Thumbnail2
                                    </label>
                                    <div className=' bg-white w-full m-auto rounded-lg'>
                                        <label className="my-5"></label>
                                        <div className='file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg overflow-hidden'>
                                            <input type='file' name='thumbnail2' id='thumbnail2' accept='image/*' className="file-input w-full file-input-info focus:border-none " />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row lg:flex-row w-full gap-4">
                                <div className='space-y-1 w-full'>
                                    <label htmlFor='location' className='block dark:text-white text-black font-medium'>
                                        Quantity
                                    </label>
                                    <input className='w-full px-4 py-3 text-gray-800 border rounded-md input input-info ' name='quantity'defaultValue={findUpdataData?.quantity}  id='quantity' type='number' placeholder='Enter quantiey' required
                                    />
                                </div>
                                <div className='space-y-1 w-full'>
                                    <label htmlFor='location' className='block dark:text-white text-black font-medium'>
                                        Product Price
                                    </label>
                                    <input className='w-full px-4 py-3 text-gray-800 border rounded-md input input-info ' name='product_cost' defaultValue={findUpdataData?.price} id='product_cost' type='number' placeholder='Product Cost' required
                                    />
                                </div>
                            </div>
                        </div>


                        <div className='space-y-6'>
                            <div className="flex flex-col md:flex-row lg:flex-row w-full gap-4">
                                <div className='space-y-1 w-full'>
                                    <label htmlFor='location' className='block dark:text-white text-black font-medium'>
                                        Category
                                    </label>
                                    <select name="category" defaultValue={findUpdataData?.category} id="category" className="select select-info w-full max-w-xs">
                                        <option disabled selected required>{findUpdataData?.category}</option>
                                        {
                                            category?.length > 0 && category.map(categ => <option key={categ?._id}  required>
                                                {categ?.category}
                                            </option>)
                                        }
                                    </select>
                                </div>
                                <div className='space-y-1 w-full'>
                                    <label htmlFor='location' className='block dark:text-white text-black font-medium'>
                                        Rating
                                    </label>
                                    <input className='w-full px-4 py-3 text-gray-800 border rounded-md input input-info ' name='rating' defaultValue={findUpdataData?.rating} id='rating' type='number' placeholder='Product Cost' required
                                    />
                                </div>
                            </div>
                            <div className='space-y-1'>
                                <label htmlFor='description' className='block font-medium'>
                                    Description
                                </label>
                                <textarea id='description' className='block focus:rose-300 w-full h-32 px-4 py-3 text-gray-800  border rounded-md input input-info ' name='description' defaultValue={findUpdataData?.description}  placeholder="Write description"
                                ></textarea>
                            </div>
                            <div className="flex flex-col md:flex-row lg:flex-row w-full gap-4">
                                <div className='space-y-1 w-full'>
                                    <label htmlFor='location' className='block dark:text-white text-black font-medium'>
                                        Product Profit
                                    </label>
                                    <input className='w-full px-4 py-3 text-gray-800 border rounded-md input input-info ' name='product_profit' defaultValue={findUpdataData?.product_profit} id='product_profit' type='number' placeholder='Product Profit' required
                                    />
                                </div>
                                <div className='space-y-1 w-full'>
                                    <label htmlFor='location' className='block dark:text-white text-black font-medium'>
                                        Discount %
                                    </label>
                                    <input className='w-full px-4 py-3 text-gray-800 border rounded-md input input-info ' name='discount' defaultValue={findUpdataData?.discount} id='discount' type='number' placeholder='Discount %' required
                                    />
                                </div>
                            </div>
                            <button type='submit' className='btn w-full mt-5 p-3 text-[18px] text-center font-medium hover:text-white transition duration-200 rounded shadow-md bg-gradient-to-r from-[#0939e8] to-[#ff0fdb] text-black '>
                                {loading ? (
                                    <span className='flex items-center justify-center gap-3'> <FaSpinner className='m-auto animate-spin' size={24} /> Processing....</span>
                                ) : (
                                    'Update Product'
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdatedProduct;