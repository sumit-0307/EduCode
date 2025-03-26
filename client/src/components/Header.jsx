import {Link} from 'react-router-dom';

export default function Header() {
  return (
    <div className='bg-slate-300'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-5'>
        <Link to={'/'} className='flex items-center space-x-0'>
        <h1 className='text-slate-700 font-bold'>Edu</h1>
        <h1 className='text-slate-900 font-bold'>Code</h1>
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
          <Link to={'/profile'}>
          <li>Profile</li>
          </Link>
          <Link to={'/about'}>
          <li>About</li>
          </Link>
          <Link to={'/sign-in'}>
          <li>Sign in</li>
          </Link> 
        </ul>

      </div>
    </div>
  )
}
