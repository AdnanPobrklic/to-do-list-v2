import shopCircleLogo from "../assets/shop-circle-logo.png";

export default function Footer() {
    return (
        <footer className="w-full text-center py-2 flex items-center justify-center gap-2 xl:gap-5 select-none text-[12px] xl:text-[14px]">
            <p>Powered by Shop Circle</p>
            <img
                src={shopCircleLogo}
                alt="shop circle logo"
                className="w-[26px] h-[26px] xl:w-[32px] xl:h-[32px]"
            />
        </footer>
    );
}
