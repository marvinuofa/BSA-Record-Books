import { useState } from "react";
import { Link } from "react-router";
/* import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../supabase-client"; */

const VideoIcon = (
  <svg
    className="h-5"
    viewBox="200 20 800 900"
  >
    <title>Video</title>
    <g fill="#ffcc08" fillRule="evenodd">
      <path d="M768 304.64v414.72H256V304.64h512zm-460.8 51.301v312.94h409.6V355.94H307.2z" />
      <path d="M604.086 513.28l-142.988-96v192z" />
    </g>
  </svg>
);



/* const checkIsAdmin = async (email: string): Promise<boolean> => {
  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("id")
    .eq("email", email)
    .single();

  console.log(userData)

  if (userError || !userData) {
    return false;
  }

  const { data: adminData, error: adminError } = await supabase
    .from("admin")
    .select("admin_id")
    .eq("admin_id", userData.id);

  if (adminError) {
    throw new Error(adminError.message);
  }

  return adminData.length > 0;
};
 */
export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
/*   const { signInWithGit, signOut, user } = useAuth();
 */
  /* const { data: isAdmin = false, isLoading, error } = useQuery({
    queryKey: ["isAdmin", user?.email],
    queryFn: async () => {
      if (!user?.email) return false;
      return checkIsAdmin(user.email);
    },
    enabled: !!user?.email,
  }); */

  return (
    <nav className="border-b border-[#ffcc08] shadow-md">
      <div className="max-w-6xl mx-auto px-4 flex items-center h-16">
        <div className="flex items-center gap-40">
          <Link to="/" className="text-lg font-semibold">
            <span className="text-[#ffcc08] font-bold">UABSA</span> Record Books
          </Link>

          <div className="hidden md:flex gap-6 text-sm font-medium">
            <Link className="hover:text-[#ffcc08] transition-colors" to="/">Home</Link>
            <Link className="hover:text-[#ffcc08] transition-colors" to="/fixtures">Fixtures</Link>
            <Link className="flex items-center hover:text-[#ffcc08] transition-colors" to="/Live">Live {VideoIcon}</Link>
            <Link className="hover:text-[#ffcc08] transition-colors" to="/stats">Stats</Link>
            <Link className="hover:text-[#ffcc08] transition-colors" to="/leaderboard">Leaderboard</Link>

           {/*  {!isLoading && !error && isAdmin && (
              <Link className="hover:text-[#ffcc08]" to="/Admin">Admin</Link>
            )}

            {user ? (
              <button onClick={signOut}>Sign Out</button>
            ) : (
              <button onClick={signInWithGit}>Sign In</button>
            )} */}
          </div>
        </div>

        <div className="ml-auto flex items-center">
          <Link to="/">
            <img
              src="/photo.png"
              alt="UABSA logo"
              className="h-8 w-auto"
            />
          </Link>
        </div>

        <button
          className="md:hidden ml-4 border border-neutral-700 px-3 py-1 rounded hover:border-[#ffcc08]"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-neutral-800">
          <div className="max-w-6xl mx-auto flex flex-col gap-3 py-4 px-4">
            <Link className="hover:text-[#ffcc08]" to="/">Home</Link>
            <Link className="hover:text-[#ffcc08]" to="/fixtures">Fixtures</Link>
            <Link className="flex items-center hover:text-[#ffcc08] transition-colors" to="/Live">Live {VideoIcon}</Link>
            <Link className="hover:text-[#ffcc08]" to="/stats">Stats</Link>
            <Link className="hover:text-[#ffcc08]" to="/leaderboard">Leaderboard</Link>

           {/*  {!isLoading && !error && isAdmin && (
              <Link className="hover:text-[#ffcc08]" to="/Admin">Admin</Link>
            )} */}
          </div>
        </div>
      )}
    </nav>
  );
};