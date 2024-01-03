import { useLoaderData } from "react-router-dom";
import Container from "../../shared/container/Container";
import SubFurniBanner from "./SubFurniBanner";
import './index.css';
import FurniCard from "./FurniCard";
import ShowOther from "./ShowOther";
const SubFurniHome = () => {
    const data = useLoaderData()
    const features = (data[0]?.features);
    console.log(data[0]?.category.split("+"));
    return (
        <>
            <SubFurniBanner features={features} />
            <Container>
                <h1 className="text-3xl font-bold relative -top-12 ">{data[0]?.category} is Here....</h1>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-5 mb-12">
               {
                    data?.length > 0 && data?.map(furnitures => <FurniCard
                        key={ furnitures?._id}
                        furniture={furnitures}
                    />)
                }
               </div>
              
                <ShowOther />
            </Container>
        </>
    );
};

export default SubFurniHome;