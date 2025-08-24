import SearchBar from "./SearchBar";
import homeImg from "../assets/images/home-img.png";

function Home() {
    return (
      <div className="paper-grid w-full md:h-[100vh] overflow-y-hidden overflow-x-hidden">
        <div className="wrapper z-10 h-[10%] flex justify-between py-4 items-center">
          <div className="bg-white md:text-lg font-500 black-box-shadow border-2 border-black py-1 px-4">
            Created At
          </div>
          <div className="bg-white md:text-lg font-500 black-box-shadow border-2 border-black py-1 px-4 hover:scale-95">
            @why_deepanshux
          </div>
        </div>
        <div className="wrapper mt-8 md:mt-2 flex flex-col md:flex-row justify-between gap-4 md:h-4/5">
          <div className="flex-1 justify-center md:h-full">
            <SearchBar />
          </div>
          <div className="flex-1 md:h-full w-full">
            <img src={homeImg} alt="Home Image" className="md:h-full"/>
          </div>
        </div>
        <div className="h-[10%] bg-black flex justify-center items-center py-1 w-full">
            <div className="text-white text-center">I am Spiderman in a Peter Parker Suit - Dex</div>
        </div>
      </div>
    );
}
export default Home;