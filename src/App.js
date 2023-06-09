import { Icon } from '@iconify/react';
import image from './Assets/dummy.jpeg'
import logo from './Assets/logo.png'
import io from 'socket.io-client'
import { useEffect, useState } from 'react';

function App() {
  const socket = io.connect("http://localhost:5000");
  const [newMessage, setNewMessage] = useState([])
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  // initially set the theme and "listen" for changes to apply them to the HTML tag
  useEffect(() => {
    document.querySelector('html').setAttribute('data-theme', theme);
  }, [theme]);

  const message = async () => {
    const room = 'abcd'
    const message = document.getElementById('msgBox').value
    const data = {
      message, room
    }
    // console.log('inside',message);
    document.getElementById('msgBox').value = ''
    socket.emit('join_room', room);
    await socket.emit('send_message', data)
  }
  useEffect(() => {
    socket.on('receive_message', (data) => {
      // console.log('front-end useEffect',data);
      setNewMessage(list => [...list, data])
    })
  }, [socket])
  return (
    <section className='h-screen flex'>
      {/* Left bar */}
      <div className='w-3/12 h-full bg-purple-600'>
        <div className='flex justify-between mt-2 ml-2'>
          <img src={logo} alt="" className='w-12' />
          <label className="swap swap-rotate">

            {/* <!-- this hidden checkbox controls the state --> */}
            <input type="checkbox" onClick={toggleTheme} />

            {/* <!-- sun icon --> */}
            <svg className="swap-on fill-current w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>

            {/* <!-- moon icon --> */}
            <svg className="swap-off fill-current w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>

          </label>
        </div>

      </div>
      {/* right field */}
      <div className='bg-gray-50 w-10/12 h-screen flex flex-col justify-between'>
      <div className='bg-gray-200 flex pl-8 py-2'>
            <div className="avatar">
              <div className="w-6 rounded-full">
                <img src={image} alt='test'/>
              </div>
            </div>
            <h5 className='bg-transparent pl-2 font-semibold'>Rakib Hossain</h5>
          </div>

          <div className='h-full overflow-y-scroll'>
            {newMessage && newMessage.map(message =>
              <div className="chat chat-start mt-5">
                <div className="chat-bubble chat-bubble-primary">{message.message}</div>
              </div>)
            }
            {/* <div className="chat chat-end">
              <div className="chat-bubble chat-bubble-info">So what?</div>
            </div> */}
        </div>
        <div className='w-full flex items-center border-2 border-gray-400 rounded-t bg-white'>
          {/* <input className='w-full h-full text-black appearance-none border-0 outline-0 px-5' type='textarea' name=""/> */}
          <textarea id='msgBox' className='w-full h-full text-black appearance-none border-0 outline-0 px-5 resize-none overflow-hidden' rows="" cols=""></textarea>
          <Icon className='btn bg-transparent border-0 p-0 hover:bg-transparent text-4xl text-purple-600' icon="carbon:send-filled" onClick={message} />
        </div>
      </div>
    </section>
  );
}

export default App;
