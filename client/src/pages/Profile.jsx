import { useSelector } from "react-redux";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);

  console.log("Profile Page - Current User:", currentUser);
  console.log("Profile Page - Profile Picture URL:", currentUser?.profilePicture);

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className="flex flex-col gap-4">
        {currentUser?.profilePicture ? (
          <img
            key={currentUser.profilePicture}  // Forces React to reload the image
            src={currentUser.profilePicture}
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto object-cover cursor-pointer mt-2"
            onError={(e) => console.log("Image failed to load:", e.target.src)}
          />
        ) : (
          <p className="text-center text-gray-500">No profile picture available</p>
        )}

        <input defaultValue={currentUser.username} type="text" id="username"
        placeholder="Username" className="bg-slate-200 rounded-lg p-3"  />
        <input defaultValue={currentUser.email} type="email" id="email"
        placeholder="Email" className="bg-slate-200 rounded-lg p-3"  />
        <input type="password" id="password"
        placeholder="Password" className="bg-slate-200 rounded-lg p-3"  />

        <button className="bg-slate-700 text-white p-3
        rounded-lg uppercase hover:opacity-95 disabled:opacity-80">Update</button>
      </form>

        <div className="flex justify-between mt-5">
          <span className="text-red-700 cursor-pointer">Delete Account</span>
          <span className="text-red-700 cursor-pointer">Sign Out</span>
        </div>

    </div>
  );
}
