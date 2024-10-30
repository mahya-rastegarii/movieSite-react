
import { useMovieInfoContext } from "../../../context/MovieInfoContext";
import HeaderBackdrop from "../../Backdrop/HeaderBackdrop";
import Button from "../../Button/Button";
import GenreLabel from "../../Label/GenreLabel";
import ImdbLabel from "../../Label/ImdbLabel";




const SliderContainer = ({ children, movieInfo }) => {


  
  
  return (
    <HeaderBackdrop bg={movieInfo?.pic}>
      <div className="w-full md:w-8/12 lg:w-5/12 flex flex-col justify-center items-center lg:items-start z-10 space-y-4 lg:space-y-14 ">
        <h2 className="font-bold text-2xl text-white ">{movieInfo?.name}</h2>
        <div className="w-9/12 flex-col flex lg:flex-row justify-center lg:justify-start items-center  space-y-3 lg:space-y-0 lg:items-end ">
          <ImdbLabel score={movieInfo?.rate} />

          <div className=" flex justify-between items-center  text-slate-300 space-x-5 ">
            {movieInfo?.genre?.map((genre, index) => (
              <GenreLabel borderColor="border-slate-300" key={index}>
                {genre}
              </GenreLabel>
            ))}
          </div>
        </div>
        <p className=" hidden lg:block  w-9/12  text-md  text-white ">
          {movieInfo?.summary}
        </p>
        <div className="w-5/12 md:w-2/12">
          <Button
            bgColor="bg-color-hover"
           
           
          >
            دانلود
          </Button>
        </div>
      </div>
      <div className=" w-full md:w-8/12 lg:w-5/12  flex justify-center items-center backdrop-blur-md  border shadow-sm border-white border-opacity-5 px-3 py-7 rounded-sm  z-10">
        {children}
      </div>
    </HeaderBackdrop>
  );
}

export default SliderContainer;