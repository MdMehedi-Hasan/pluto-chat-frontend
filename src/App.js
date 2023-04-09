import { Icon } from '@iconify/react';
import image from './Assets/dummy.jpeg'
import io from 'socket.io-client'
const socket = io.connect("http://localhost:5000");

function App() {
  const message = () => {
    console.log('inside');
  }
  return (
    <section className='h-screen flex'>
      {/* Left bar */}
      <div className='w-3/12 h-full bg-purple-600'>

      </div>
      {/* right field */}
      <div className='bg-gray-50 w-10/12 h-full flex flex-col justify-between'>
        <div>
          <div className='bg-gray-200 flex pl-8 py-2'>
            <div class="avatar">
              <div class="w-6 rounded-full">
                <img src={image} />
              </div>
            </div>
            <h5 className='bg-transparent pl-2 font-semibold'>Rakib Hossain</h5>
          </div>
          <div className='overflow-y-auto'>
            <div className="chat chat-start mt-5">
              <div className="chat-bubble chat-bubble-primary">Sending message through client side</div>
            </div>
            <div class="chat chat-end">
              <div class="chat-bubble chat-bubble-info">So what?</div>
            </div>
          </div>
        </div>
        <div className='w-full flex items-center border-2 border-gray-400 rounded-t bg-white'>
          {/* <input className='w-full h-full text-black appearance-none border-0 outline-0 px-5' type='textarea' name=""/> */}
          <textarea className='w-full h-full text-black appearance-none border-0 outline-0 px-5 resize-none overflow-hidden' rows="" cols=""></textarea>
          <Icon className='btn bg-transparent border-0 p-0 hover:bg-transparent text-4xl text-purple-600' icon="carbon:send-filled" onClick={message} />
        </div>
      </div>
    </section>
  );
}

export default App;
