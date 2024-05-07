import React, { Children, ReactNode } from 'react'
import StreamVideoProvider from '../providers/streamClientProvider';
import "react-datepicker/dist/react-datepicker.css"
import '@stream-io/video-react-sdk/dist/css/styles.css';
const Rootlayout = ({children}:{children:ReactNode}) => {
  return (
    <StreamVideoProvider>
      <div>
       {children}
      </div>
  </StreamVideoProvider>
 
  )
}

export default Rootlayout;
