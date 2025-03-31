import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { IconButton } from "@mui/material";
import Link from "next/link";
import { useAuth } from "../context/authContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function Navbar() {
  const { role, token, firstName, lastName } = useAuth();

  console.log("ROle: ", role);

  return (
    <div className=" flex justify-around py-5 px- 15 bg-[#171717] text-white">
      <div>Logo</div>

      <ul className="flex  gap-2">
        <li>
          <Link href="/products" className="hover:underline">
            Products
          </Link>
        </li>
        {token && (
          <li>
            <Link href={"/cart"}>
              <IconButton sx={{ color: "white", marginTop: -0.9 }}>
                <AddShoppingCartIcon />
              </IconButton>
            </Link>
          </li>
        )}
        {role === "ADMIN" && (
          <li>
            <Link href="/admin" className="hover:underline">
              Admin
            </Link>
          </li>
        )}
        <li className="flex">
          <IconButton sx={{ color: "white", marginTop: -0.9 }}>
            <AccountCircleIcon />
          </IconButton>
          <p>
            {firstName} {lastName}
          </p>
        </li>
      </ul>
    </div>
  );
}
