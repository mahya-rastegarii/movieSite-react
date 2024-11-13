import { BsGlobe } from "react-icons/bs";



import { FaRegCommentDots } from "react-icons/fa";
import { GrStatusUnknown } from "react-icons/gr";
import { MdOutlineDateRange, MdOutlineTimer } from "react-icons/md";
import { PiTelevisionLight } from "react-icons/pi";
import { RiUserLine } from "react-icons/ri";


import HeaderBackdrop from "../../components/Backdrop/HeaderBackdrop";
import BgRotate from "../../components/BackgroundRotate/BgRotate";
import Button from "../../components/Button/Button";
import DisclosureWrapper from "../../components/Disclosure/Disclosure";
import GenreLabel from "../../components/Label/GenreLabel";
import ImdbLabel from "../../components/Label/ImdbLabel";

import CommentBox from "../../components/box/CommentBox";
import DownloadBox from "../../components/box/DownloadBox";
// import { Images } from "../../fetch/slider3D-data";
// import { Comments } from "../../fetch/comments";
import { useDispatch, useSelector } from "react-redux";
import { supabase } from "../../core/supabaseClient";
import { useEffect, useState } from "react";
// import { LiaKeySolid } from "react-icons/lia";
import { FiHeart } from "react-icons/fi";
import { setFavoritesMovie } from "../../redux/slice/MoviesSlice";

export default function Movie() {
 


  const movieData = useSelector( state => state.movies.movieData)
  const [likeMovie, setLikeMovie]= useState(false);
 
  const [comments, setComments]= useState();
 const [commentText, setCommentText]= useState("");

 const dispatch = useDispatch();
  const fetchComments = async() => {
    const res = await supabase.from('comments').select("*").eq("movieName", movieData.name)
    // setComments(data)
    console.log("data", res)
  }

  const addNewComment = async() => {

    const newComment = {
      useName:"mahya",
      pic:null,
      movieName:movieData.name,
      comment: commentText,
      disLike:0,
      like:0,

    }
    const {data }= await supabase.from('comments').insert(newComment).select("*");
    setComments(data);
  };
  

  const fechFavoriteMovie = () => {

    setLikeMovie(!likeMovie)
    if(likeMovie) {
      dispatch(setFavoritesMovie(movieData))
    }
  }
  useEffect(() => {
    window.scrollTo(top);

   
  }, []);
  
 

  useEffect( () => {

    console.log("movieInfo", movieData)
  }, []);


  useEffect(() => {
    fetchComments()
  }, [])

 
  return (
    <>
     
        <div className=" flex flex-col justify-center items-center mb-16 space-y-20">
          {
          movieData?.map((movie) => (
            <>
          

          <HeaderBackdrop bg={movie?.cover}>
            <div className=" w-full z-10 lg:p-10 flex lg:flex-row  flex-col justify-center items-center p-4 ">
              <div className=" mx-3 w-full lg:w-3/12 flex justify-center lg:justify-end items-center">
                <img
                  className="rounded-2xl shadow-gray-900 shadow-2xl w-80 "
                  src={movie?.pic}
                  alt={movie?.name}
                />
              </div>
              <div className=" mx-3 flex w-7/12 flex-col lg:justify-start justify-center items-start text-white font-semibold space-y-4 ">
                <div className="flex flex-col space-y-2 lg:space-y-0 lg:flex-row w-full justify-center lg:justify-between items-center">
                  <h4 className=" font-bold text-white text-2xl">
                   {movie?.type}   {movie?.name}
                  </h4>

                  {/* <div className=' flex flex-col justify-center  items-center '>
                <div className=' flex justify-center items-center'>
                <span className='  text-white font-semibold text-sm '>10/</span>
                <span className=' font-bold text-color-2 text-lg'>7.1</span>
                </div>
                <span className=' bg-color-hover shadow-md px-2 rounded-md font-bold text-white text-md'> IMDb </span>
             
              </div> */}
<div className=" flex justify-center items-center flex-col space-y-4">

                  <ImdbLabel score={movie?.imdbRating} />
                  <FiHeart className={`text-2xl text-red-700 cursor-pointer hover:fill-red-700 ${likeMovie ? "fill-red-700" : ""}`}  onClick={fechFavoriteMovie}/>
</div>
                </div>
                <div className="flex w-full flex-col text-white  space-y-4 ">
                  <div className=" flex lg:justify-start items-center justify-center text-slate-300">
                    {movie?.genre?.map((genre, index) => (
                      <GenreLabel borderColor="border-slate-300" key={index}>
                        {genre}
                      </GenreLabel>
                    ))}
                  </div>
                  <div className="w-full flex lg:flex-col lg:justify-start justify-center lg:space-y-5 items-center">
                    <div className="w-full flex  lg:justify-start justify-center items-center">
                      <MdOutlineTimer className=" inline ml-2 text-xl text-color-2 mr-7 lg:mr-0" />
                      <span className=" ">زمان : {movie?.time} دقیقه</span>
                    </div>
                  </div>
                  <div className="w-full flex lg:justify-start lg:flex-col justify-center lg:space-y-5 items-center">
                    {movie?.year ? (
                      <div className="w-full flex  lg:justify-start justify-center items-center">
                        <MdOutlineDateRange className=" inline ml-2 text-xl text-color-2" />
                        <span className=" ">
                          {" "}
                          سال انتشار : {movie?.year}
                        </span>
                      </div>
                    ) : movie?.status ? (
                      <div className="w-full flex  lg:justify-start justify-center items-center">
                        <GrStatusUnknown className=" inline ml-2 text-xl text-color-2" />
                        <span className=" ">
                          {" "}
                          وضعیت پخش : {movie?.status}
                        </span>
                      </div>
                    ) : null}
                    {movie?.director ? (
                      <div className="w-full flex  lg:justify-start justify-center items-center">
                        <RiUserLine className=" inline ml-2 text-xl text-color-2 mr-7 lg:mr-0" />
                        <span className=" ">
                          کارگردان : {movie?.director}
                        </span>
                      </div>
                    ) : movie?.tv ? (
                      <div className="w-full flex  lg:justify-start justify-center items-center">
                        <PiTelevisionLight className=" inline ml-2 text-xl text-color-2 mr-7 lg:mr-0" />
                        <span className=" "> شبکه : {movie?.tv}</span>
                      </div>
                    ) : null}
                  </div>
                  {/* <div className='w-full flex justify-start items-center'><PiFilmReelBold className=' inline ml-2 text-xl text-color-2'/><span className=' '>ژانر : </span></div> */}
                  <div className="w-full flex  lg:justify-start justify-center items-center">
                    <BsGlobe className=" inline ml-2 text-xl text-color-2" />
                    <span className=" ">محصول کشور : {movie?.country}</span>
                  </div>

                  <div className="w-full flex lg:justify-start justify-center items-center">
                    <p>{movie?.summary}</p>
                  </div>
                  <div className="flex flex-col lg:flex-row justify-between items-center">
                    <span className="  bg-green-600 p-2 rounded-lg text-sm">
                      زیرنویس چسبیده
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </HeaderBackdrop>
          <div className=" md:w-10/12 w-full lg:w-7/12 flex flex-col p-5 space-y-20">
            {movie?.desc && (
              <BgRotate padding=" p-4">
                <div className="w-full text-right text-color-1">
                  {movie?.desc}
                </div>
              </BgRotate>
            )}

            <BgRotate padding="p-1" rotate1="-rotate-1" rotate2="rotate-1">
              <DisclosureWrapper title="لینک های دانلود" open="true">
                <div className="p-8 flex flex-col space-y-3">
                  <div>
                    <DisclosureWrapper
                      bg="bg-color-2"
                      rounded="rounded-lg"
                      border="border-color-1"
                      title="نسخه زیرنویس چسبیده فارسی"
                    >
                      <div className=" w-full flex flex-col justify-center items-center space-y-6 pt-4">
                        <DownloadBox quality="1080p" />
                        <DownloadBox quality="720p" />
                        <DownloadBox quality="480p" />
                      </div>
                    </DisclosureWrapper>
                  </div>
                  <div>
                    <DisclosureWrapper
                      bg="bg-color-2"
                      rounded="rounded-lg"
                      border="border-color-1"
                      title="نسخه دوبله فارسی"
                    >
                      <div className=" w-full flex flex-col justify-center items-center space-y-6 pt-4">
                        <DownloadBox quality="1080p" />
                        <DownloadBox quality="720p" />
                        <DownloadBox quality="480p" />
                      </div>
                    </DisclosureWrapper>
                  </div>
                </div>
              </DisclosureWrapper>
            </BgRotate>

            <BgRotate padding="p-1" rotate1="-rotate-1" rotate2="rotate-1">
              <DisclosureWrapper title="نظرات" open="true">
                <div className="w-full  flex flex-col justify-center items-center p-4 space-y-2">
                  <textarea
                    rows="6"
                    onChange={(e) => setCommentText(e.target.value)}
                    className="w-full bg-color-2 rounded-md p-2 outline-none  border shadow-sm resize-y focus:placeholder:opacity-75 focus:border-2 border-color-1"
                    value={commentText}
                    placeholder="دیدگاه خود را بنویسید..."
                  />
                  <div className=" w-full flex flex-col justify-center items-center">
                    <Button
                      width="w-3/12"
                      bgColor="bg-color-hover"
                      clicked={addNewComment}
                    >
                      {" "}
                      ارسال دیدگاه{" "}
                    </Button>
                  </div>
                </div>
                <hr className=" border-color-1 opacity-50" />
                <div className=" w-full flex flex-col justify-center items-center space-y-6 pt-4">
                  <div className="w-full flex justify-between px-4">
                    <FaRegCommentDots className="inline text-color-2 text-2xl" />

                    <span className="text-xl text-color-2 ">
                      {comments?.length}
                    </span>
                  </div>

                {
                    comments?.map((comment) => (
                      <CommentBox key={comment.id} {...comment} />
                    ))
                  }
                </div>
              </DisclosureWrapper>
            </BgRotate>
          </div>

          </>
        ))
      }
        </div>
      
    </>
  );
}
