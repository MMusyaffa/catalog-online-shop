import { useTheme } from "./Theme";

const Footer = () => {
    const { theme } = useTheme();

    const footerBgColor = theme === "dark" ? "#EEE5DA" : "#0F9E99";
    const textColor = theme === "dark" ? "text-black" : "text-white";

    return (
        <footer id="footer"
            className={`footer p-10 grid grid-cols-4 gap-50 transition-all duration-300 ${textColor}`}
            style={{ backgroundColor: footerBgColor }}
        >
            <aside>
                <img
                    className="w-20 h-20"
                    src="https://logomakerr.ai/uploads/output/2024/10/19/c78c5d9a64190d68340aaea997cc9a83.jpg"
                    alt="Logo"
                />
                <p>
                    Aldi Thrifting
                    <br />
                    Providing branded thrifting items
                </p>
            </aside>
            <nav>
                <h6 className="footer-title">Contact Us</h6>
                <a href="#" className="link link-hover flex items-center space-x-2">
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv-u8NzRfQDKMCDPoZF4iqpbFoRNz1PfqjfQ&s"
                        className="w-6 h-6"
                        alt="Phone"
                    />
                    <span>0888888</span>
                </a>
                <a href="#" className="link link-hover flex items-center space-x-2">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/3178/3178158.png"
                        className="w-6 h-6"
                        alt="Email"
                    />
                    <span>Aldi@gmail.com</span>
                </a>
                <a href="#" className="link link-hover flex items-center space-x-2">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/25/25694.png"
                        className="w-6 h-6"
                        alt="Location"
                    />
                    <span>JL. Bahabshdad, Sleman</span>
                </a>
            </nav>
            <nav>
                <h6 className="footer-title">Social</h6>
                <a href="#" className="link link-hover flex items-center space-x-2">
                    <img
                        src="https://freepnglogo.com/images/all_img/1714299307tiktok-shop-icon-png.png"
                        className="w-6 h-6"
                        alt="Tiktok Shop"
                    />
                    <span>Tiktok Shop</span>
                </a>
                <a href="#" className="link link-hover flex items-center space-x-2">
                    <img
                        src="https://w7.pngwing.com/pngs/245/945/png-transparent-shopee-indonesia-online-shopping-android-receive-link-free-android-text-rectangle-orange-thumbnail.png"
                        className="w-6 h-6"
                        alt="Shopee"
                    />
                    <span>Shopee</span>
                </a>
            </nav>
        </footer>
    );
};

export default Footer;
