import hulkAppsLogo from "../assets/hulk-apps-logo.webp";
export default function Header() {
    return (
        <header>
            <img
                src={hulkAppsLogo}
                alt="hulks apps logo"
                className="w-[200px] h-[79px] shadow-2xl"
            />
        </header>
    );
}
