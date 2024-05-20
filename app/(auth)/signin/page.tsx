"use client"

import { signIn } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import findUser from '../../../serverActions/finduser';
import Image from 'next/image';

const Session = () =>{
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (session) {
    router.push('/');
  }

  return null;

}


function Page() {
 Session();
  const router = useRouter();
  const [email, setmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSectionVisible, setPasswordSectionVisible] = useState(false);

  const handleContinue = async () => {

    const data = await findUser(email);
    
    if (data) {
      setPasswordSectionVisible(true);
    } else {
      setError("Email doesn't exist");
    }
  };

  const handleLogin = async () => {
    try {
      const res = await signIn('credentials', {
        email: email,
        password: password,
        redirect: false,
      });
      if (res?.error) {
        console.error('Sign-in error:', res.error);
        setPasswordError('Incorrect password. Please try again.');
        return;
      }
      router.push('/');
    } catch (error) {
      console.error('Unexpected error during sign-in:', error);
    }
  };


  return (
    <div className='bg-dark-1 text-white h-screen w-screen gap-4 flex items-center justify-center align-middle'>
      <div className='p-2 ml-4 bg-dark-2  max-w-[380px]  rounded-[16px] mx-4'>
        <div className='mx-4 mt-12 flex  items-center'><Image alt='logo' src='/logo.png' height={54} width={54} />
          <h2 className='text-2xl  font-extrabold sm:text-3xl'>Meetify</h2></div>
        <p className='ml-6 font-thin '>to continue to Meetify </p>
        <div className='flex mt-6 ml-6'>
          <div onClick={async () => {
            await signIn("google");
          } } className='p-3 text-white   rounded-[16px] mt-6 cursor-pointer border-blue-2 border-4'><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="36" height="36" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
            </svg>
          </div>
          <div onClick={async () => {
            await signIn("github");
          } } className=' ml-4 px-3 pt-3 text-white  rounded-[16px] mt-6 cursor-pointer border-blue-2 border-4'><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="36" height="36" viewBox="0 0 48 48">
              <path d="M17.791,46.836C18.502,46.53,19,45.823,19,45v-5.4c0-0.197,0.016-0.402,0.041-0.61C19.027,38.994,19.014,38.997,19,39 c0,0-3,0-3.6,0c-1.5,0-2.8-0.6-3.4-1.8c-0.7-1.3-1-3.5-2.8-4.7C8.9,32.3,9.1,32,9.7,32c0.6,0.1,1.9,0.9,2.7,2c0.9,1.1,1.8,2,3.4,2 c2.487,0,3.82-0.125,4.622-0.555C21.356,34.056,22.649,33,24,33v-0.025c-5.668-0.182-9.289-2.066-10.975-4.975 c-3.665,0.042-6.856,0.405-8.677,0.707c-0.058-0.327-0.108-0.656-0.151-0.987c1.797-0.296,4.843-0.647,8.345-0.714 c-0.112-0.276-0.209-0.559-0.291-0.849c-3.511-0.178-6.541-0.039-8.187,0.097c-0.02-0.332-0.047-0.663-0.051-0.999 c1.649-0.135,4.597-0.27,8.018-0.111c-0.079-0.5-0.13-1.011-0.13-1.543c0-1.7,0.6-3.5,1.7-5c-0.5-1.7-1.2-5.3,0.2-6.6 c2.7,0,4.6,1.3,5.5,2.1C21,13.4,22.9,13,25,13s4,0.4,5.6,1.1c0.9-0.8,2.8-2.1,5.5-2.1c1.5,1.4,0.7,5,0.2,6.6c1.1,1.5,1.7,3.2,1.6,5 c0,0.484-0.045,0.951-0.11,1.409c3.499-0.172,6.527-0.034,8.204,0.102c-0.002,0.337-0.033,0.666-0.051,0.999 c-1.671-0.138-4.775-0.28-8.359-0.089c-0.089,0.336-0.197,0.663-0.325,0.98c3.546,0.046,6.665,0.389,8.548,0.689 c-0.043,0.332-0.093,0.661-0.151,0.987c-1.912-0.306-5.171-0.664-8.879-0.682C35.112,30.873,31.557,32.75,26,32.969V33 c2.6,0,5,3.9,5,6.6V45c0,0.823,0.498,1.53,1.209,1.836C41.37,43.804,48,35.164,48,25C48,12.318,37.683,2,25,2S2,12.318,2,25 C2,35.164,8.63,43.804,17.791,46.836z"></path>
            </svg>
          </div>
          <div onClick={async () => {
            await signIn("discord");
          } } className=' ml-4 px-3 pt-3 text-white  rounded-[16px] mt-6 cursor-pointer border-blue-2 border-4'><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="36" height="36" viewBox="0 0 48 48">
              <path fill="#8c9eff" d="M40,12c0,0-4.585-3.588-10-4l-0.488,0.976C34.408,10.174,36.654,11.891,39,14c-4.045-2.065-8.039-4-15-4s-10.955,1.935-15,4c2.346-2.109,5.018-4.015,9.488-5.024L18,8c-5.681,0.537-10,4-10,4s-5.121,7.425-6,22c5.162,5.953,13,6,13,6l1.639-2.185C13.857,36.848,10.715,35.121,8,32c3.238,2.45,8.125,5,16,5s12.762-2.55,16-5c-2.715,3.121-5.857,4.848-8.639,5.815L33,40c0,0,7.838-0.047,13-6C45.121,19.425,40,12,40,12z M17.5,30c-1.933,0-3.5-1.791-3.5-4c0-2.209,1.567-4,3.5-4s3.5,1.791,3.5,4C21,28.209,19.433,30,17.5,30z M30.5,30c-1.933,0-3.5-1.791-3.5-4c0-2.209,1.567-4,3.5-4s3.5,1.791,3.5,4C34,28.209,32.433,30,30.5,30z"></path>
            </svg>

          </div>
        </div>
        <div className='mt-6 ml-6'>
          <h2>Email address</h2>
          <input type='email' value={email} placeholder='abc@example.com' className='bg-blue-2 rounded h-10 w-72 pl-4 caret-blue-1  focus:outline-none' onChange={(e: any) => setmail(e.target.value)}></input>

          {error && <p className='text-sm text-red-700'>{error}</p>}
          {!passwordSectionVisible && <button className='bg-blue-1 h-10 w-72 mt-8 rounded-3xl' onClick={handleContinue}>Continue</button>}


          {passwordSectionVisible && (
            <>
              <h2 className='mt-2'>Password</h2>
              <input
                className='bg-blue-2 rounded h-10 w-72 pl-4 caret-blue-1  focus:outline-none'
                type='password'
                value={password}
                placeholder='Enter your password'
                onChange={(e) => setPassword(e.target.value)} />
              {passwordError && (
                <p className='text-sm text-red-700'>{passwordError}</p>
              )}
              <button className='bg-blue-1 h-10 w-80 mt-4 rounded-3xl' onClick={handleLogin}>Login</button>
            </>
          )}


        </div>
        <div className='flex justify-between align-center mt-8 ml-6'>
          <div className='text-sm '>No account? <a className='text-blue-1 cursor-pointer' onClick={() => { router.push('/signup'); } }><br/> Sign up</a></div>
          <div className='flex gap-3 mr-3 text-sm mb-4'><button>Help</button> <button>Privacy</button> <button>Terms</button></div>
        </div>
      </div>

    </div>
  );
}

export default Page;
