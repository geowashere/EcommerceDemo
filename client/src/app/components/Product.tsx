import { Button } from "@mui/material";

export default function Product() {
  return (
    <div className="flex flex-col gap-3 w-[80%] bg-[#ccc] rounded-lg p-5">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold">Product Title</h3>
        <p className="font-bold text-2xl">50$</p>
      </div>
      <div className="flex justify-between">
        <p className="w-[72%]">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate
          qui natus porro unde aut vitae cum sit ea error molestiae.
        </p>
        <Button variant="contained">Add To Cart</Button>
      </div>
    </div>
  );
}
