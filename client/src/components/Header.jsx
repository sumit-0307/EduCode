import {Link} from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  console.log("Current User from Redux:", currentUser);
console.log("Profile Picture URL:", currentUser?.profilePicture);

  return (
    <div className='bg-slate-300'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-5'>
        <Link to={'/'} className='flex items-center space-x-0'>
        <h1 className='text-slate-700 font-bold text-4xl'>Edu</h1>
        <h1 className='text-slate-900 font-bold text-4xl'>Code</h1>
        </Link>
        <ul className='flex gap-6'>
          <Link to={'/'}>
          <li>Dashboard</li>
          </Link>
          <Link to={'/tasks'}>
          <li>Tasks</li>
          </Link>
          <Link to={'/eduler'}>
          <li>Eduler</li>
          </Link>
          <Link to={'/edubot'}>
          <li>EduBot</li>
          </Link>
          <Link to={'/about'}>
          <li>About</li>
          </Link>
          <Link to={'/profile'}>
          {currentUser ? (
            <img
            key={currentUser.profilePicture}  // Forces React to reload the image
            src={currentUser.profilePicture}
            alt="profile"
            className="h-7 w-7 rounded-full object-cover"
            onError={(e) => console.log("Image failed to load:", e.target.src)}
          />
          
          ):(
            <li>Sign In</li>
          )}
          </Link> 
        </ul>

      </div>
    </div>
  )
}
