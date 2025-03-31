import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { IconButton, Typography } from "@mui/material";
import Link from "next/link";
import { useAuth } from "../context/authContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { role, token, firstName, lastName, logout } = useAuth();

  console.log("ROle: ", role);
  const router = useRouter();
  return (
    <div className=" flex justify-around py-5 px- 15 bg-[#171717] text-white">
      <div className="hidden md:block">Logo</div>

      <ul className="flex  gap-2 items-start">
        <li>
          <Link href={"/cart"}>
            <IconButton sx={{ color: "white", marginTop: -0.9 }}>
              <AddShoppingCartIcon />
            </IconButton>
          </Link>
        </li>
        <li>
          <Link href="/products" className="hover:underline hidden sm:block">
            Products
          </Link>
        </li>
        {token ? (
          <li
            onClick={async () => {
              await logout();
              router.push("/login");
            }}
            className="cursor-pointer hover:underline"
          >
            <Typography sx={{ fontSize: 14, marginTop: 0.4 }}>
              Logout{" "}
            </Typography>
          </li>
        ) : (
          <li>
            <Link href={"/login"}>
              <Typography>Login </Typography>
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
