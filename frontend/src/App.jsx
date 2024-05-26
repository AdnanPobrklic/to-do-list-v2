import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Main from "./Components/Main";
import gsap from "gsap";
function App() {
    return (
        <div className="min-h-dvh min-w-[315px] max-w-[1000px] flex flex-col gap-[50px] xl:gap-[50px] items-center pt-[50px] w-[60%] mx-auto text-slate-200 font-poppins ">
            <Header />
            <Main />
            <Footer />
        </div>
    );
}

export default App;
