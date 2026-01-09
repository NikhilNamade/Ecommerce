import { Link } from "@tanstack/react-router";
const Navbar = () => {
  return (
    <nav className="w-full z-50 flex items-center justify-between px-6 py-4 bg-primary text-primary-foreground shadow-md">
      <h1 className="text-xl font-bold tracking-wide">Admin</h1>

      <div className="flex gap-6">
        <Link
          to="/"
          className="text-sm font-medium hover:underline"
          activeProps={{ className: "underline underline-offset-4" }}
        >
          Home
        </Link>

        <Link
          to="/addProducts"
          className="text-sm font-medium hover:underline"
          activeProps={{ className: "underline underline-offset-4" }}
        >
          + Products
        </Link>

        <Link
          to="/orders"
          className="text-sm font-medium hover:underline"
          activeProps={{ className: "underline underline-offset-4" }}
        >
          Orders
        </Link>
        <Link
          to="/coupons"
          className="text-sm font-medium hover:underline"
          activeProps={{ className: "underline underline-offset-4" }}
        >
          Coupons
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
