import { useEffect, useState, useContext } from "react";
import axios from "../../api/axios.js";
import Slider from "react-slick";
import { useCart } from "../Context/CartContext.jsx";
import { AuthContext } from "../Context/AuthContext.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-[-2rem] top-1/2 transform -translate-y-1/2 bg-[#FF9130] text-white p-3 rounded-full opacity-75 hover:opacity-100 z-20 display-block"
  >
    ❮
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-[-2rem] top-1/2 transform -translate-y-1/2 bg-[#FF9130] text-white p-3 rounded-full opacity-75 hover:opacity-100 z-20 display-block"
  >
    ❯
  </button>
);

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const { addToCart } = useCart();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const res = await axios.get("/api/menu");
        const items = res.data;
        console.log("Fetched menu items:", items);
        const uniqueItems = Array.from(
          new Map(items.map((item) => [item._id, item])).values()
        );
        setMenuItems(uniqueItems);
        console.log("Unique menu items set:", uniqueItems);
      } catch (err) {
        console.error("Failed to fetch menu:", err);
        toast.error("Failed to load menu");
      }
    };

    fetchMenuItems();
  }, []);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
    arrows: true,
    autoplay: false,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleAddToCart = (item) => {
    if (!token) {
      toast.error("Please log in to add items to cart");
      navigate("/login");
      return;
    }
    addToCart(item);
    toast.success(`${item.name} added to cart!`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-6 text-center text-[#8A4B08]">
        Our Menu
      </h2>
      {menuItems.length === 0 ? (
        <p className="text-center">No menu items available.</p>
      ) : (
        <div className="relative">
          <Slider {...settings}>
            {menuItems.map((item) => (
              <div key={item._id} className="px-2">
                <div className="bg-white shadow-md p-4 rounded-lg text-center">
                  <img
                    src={item.imgUrl}
                    alt={item.name}
                    className="w-full h-40 object-cover rounded mb-4 mx-auto"
                    onError={(e) => {
                      console.error(`Image load error: ${item.imgUrl}`);
                      e.target.src = "/placeholder.jpg";
                    }}
                  />
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                  <p className="font-bold mt-2">${item.price}</p>
                  <Button
                    onClick={() => handleAddToCart(item)}
                    className="w-full rounded-md bg-[#FF9130] hover:bg-[#E07B00] py-2 text-white flex mx-auto justify-center mt-4"
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      )}
    </div>
  );
};

export default Menu;
