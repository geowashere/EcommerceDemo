import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { IconButton } from "@mui/material";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className=" flex justify-around py-5 px- 15 bg-[#171717] text-white">
      <div>Logo</div>

      <ul className="flex  gap-2">
        <li>
          <Link href="/products" className="hover:underline">
            Products
          </Link>
        </li>
        <li>
          <IconButton sx={{ color: "white", marginTop: -0.9 }}>
            <AddShoppingCartIcon />
          </IconButton>
        </li>
      </ul>
    </div>
  );
}
