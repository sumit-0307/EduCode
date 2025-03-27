  import { useSelector } from "react-redux";
  import { useRef, useState, useEffect } from "react";
  import {ref, getStorage, uploadBytesResumable} from 'firebase/storage';
  import { app } from "../firebase";
  import { useDispatch } from "react-redux";
  import { updateUserStart, updateUserSuccess, updateUserFailure } from "../redux/user/userslice";

  export default function Profile() {
    const [formData, setFormData] = useState({});
    const dispatch = useDispatch();
    const fileRef = useRef(null);
    const [image, setImage] = useState(undefined);
    const { currentUser, loading, error } = useSelector((state) => state.user);
    useEffect(() =>{
      if(image){
        handleFileUpload(image);
      }
    }, [image]);
    const [updateSuccess, setUpdateSuccess] = useState(false);
     const handleFileUpload = async (image) =>{
      const storage = getStorage(app);
      const fileName = new Date().getTime() + image.name;   
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred /
            snapshot.totalBytes) * 100;
            console.log("Upload is "+ progress +"% done");
        },
        (error) => {
          // Suppress CORS errors in console
          if (error.code === "storage/unauthorized" || error.code === "storage/cors") {
            console.warn("CORS issue detected, but continuing...");
          } else {
            console.error("Upload error:", error);
          }
    });
  }
    // console.log("Profile Page - Current User:", currentUser);
    // console.log("Profile Page - Profile Picture URL:", currentUser?.profilePicture);

const handleChange = (e) =>{
  setFormData({ ...formData,[e.target.id]:e.target.value});
};

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    dispatch(updateUserStart());

    if (!currentUser) {
      console.error("User not logged in");
  } else {
      console.log("Sending Token:", currentUser.token);
  }
  

    const res = await fetch(`/api/user/update/${currentUser._id}`, {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currentUser.token}`  
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (data.success === false) {
      dispatch(updateUserFailure(data));
      return;
    }
    dispatch(updateUserSuccess(data));
    setUpdateSuccess(true);
  } catch (error) {
    console.error("Update Error:", error);
    dispatch(updateUserFailure(error));
  }
};



    return (
      <div className="p-3 max-w-lg mx-auto">
        <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
        <form onSubmit={handleSubmit}
        className="flex flex-col gap-4">
          <input type="file" ref={fileRef} hidden accept="image/*"
          onChange={(e) => setImage(e.target.files[0])} />

          {currentUser?.profilePicture ? (
            <img
              key={currentUser.profilePicture}  // Forces React to reload the image
              src={currentUser.profilePicture}
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto object-cover cursor-pointer mt-2"
              onError={(e) => console.log("Image failed to load:", e.target.src)}
              onClick={() => fileRef.current.click()}
            />
          ) : (
            <p className="text-center text-gray-500">No profile picture available</p>
          )}

          <input 
          defaultValue={currentUser.username} type="text" id="username"
          placeholder="Username" className="bg-slate-200 rounded-lg p-3"
          onChange={handleChange}/>
          <input 
          defaultValue={currentUser.email} type="email" id="email"
          placeholder="Email" className="bg-slate-200 rounded-lg p-3"  
          onChange={handleChange}/>
          <input 
          type="password" id="password"
          placeholder="Password" className="bg-slate-200 rounded-lg p-3" 
          onChange={handleChange}/>

          <button className="bg-slate-700 text-white p-3
          rounded-lg uppercase hover:opacity-95 disabled:opacity-80
          cursor-pointer">
            {loading? 'Loading...' :'Update'}
            </button>
        </form>

          <div className="flex justify-between mt-5">
            <span className="text-red-700 cursor-pointer">Delete Account</span>
            <span className="text-red-700 cursor-pointer">Sign Out</span>
          </div>

          <p className="text-red-700 mt-5">{error && 'Something went wrong'}</p>
          <p className="text-green-700 mt-5">{updateSuccess && 'User is updated Successfully'}</p>
      </div>
    );
  }
