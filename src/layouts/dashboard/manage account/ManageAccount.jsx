import { MdManageAccounts } from "react-icons/md";
import useAllUsers from "../../../hooks/useAllUsers";
import { MdAnnouncement } from "react-icons/md";
import img from '../../../assets/image/feature/banner-1.png'
import { useState } from "react";


const ManageAccount = () => {
    const [search, setSearch] = useState('')
    const allUsers = useAllUsers(search)
    console.log(allUsers);
    const handleSearch = (e) => {
        e.preventDefault();
        const form = e.target;
        const searchValue = form.search.value;
        setSearch(searchValue)
        console.log(searchValue);
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-center flex items-center justify-center gap-3">Manage Account <MdManageAccounts className="w-8 h-8 text-fuchsia-500" /></h1>
            <div>
                <form onSubmit={handleSearch} className="flex items-center justify-center gap-2 relative w-full md:w-[80%] lg:w-[70%] mx-auto mt-5">
                    <input onChange={() => setSearch(event.target.value)} type="search" name="search" placeholder="Search Your Account......" className="input input-bordered input-info w-full pr-28" />
                    <button type="submit" className="btn  absolute right-0 top-0 text-white bg-gradient-to-r from-[#0939e8] to-[#ff0fdb] text-[18px] hover:text-blue-300">Search</button>
                </form>

                {
                    allUsers?.length <= 0 ? <>
                        <div className="flex flex-col gap-3 items-center justify-center w-full h-[40vh]">
                            <h1 className="text-2xl mt-10">Not Found Your Account <span className="text-fuchsia-600 text-4xl">!</span></h1>
                            <div><MdAnnouncement className="w-10 h-10 text-fuchsia-600" /></div>
                        </div>
                    </> : allUsers?.map(user => <div key={user._id} className="flex items-center justify-between w-full md:w-[70%] lg:w-[30%] mx-auto mt-10">
                        <div className=" flex items-center justify-center gap-5 flex-1 py-1">
                            <figure className="w-20 h-20">
                                <img src={img} className="w-full h-full rounded-full" alt="account-image" />
                            </figure>
                            <div className="flex flex-col gap-2 items-start justify-center">
                                <h1 className="text-xl">Sushil</h1>
                                <p>sushil500530@gmail.com</p>
                            </div>
                        </div>
                        <div>
                            <button className="btn text-white bg-gradient-to-r from-[#0939e8] to-[#ff0fdb] text-[18px] hover:text-blue-300">Add Your Account</button>
                        </div>
                    </div>)
                }

            </div>
        </div>
    );
};

export default ManageAccount;