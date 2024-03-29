import { useEffect, useRef, useState } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import toast from 'react-hot-toast';
import { SignalIcon } from '@heroicons/react/24/solid';
import { PageTitle } from './PageTitle';

const BASE_WS_URL = 'ws://localhost:9090/ws/chat/';

export default function Chat() {
  const [mesageHistory, setMessageHistory] = useState([]);
  const [roomName, setRoomName] = useState('public');
  const [displayRoomName, setDisplayRoomName] = useState(roomName);
  const newComment = useRef('');

  const { sendMessage, lastMessage, readyState } = useWebSocket(
    BASE_WS_URL + roomName,
    {
      shouldReconnect: closeEvent => true,
      reconnectAttempts: 10,
      // attemptNumber will be 0 the first time it attempts to reconnect,
      // so this equation results in a reconnect pattern of 1 second, 2 seconds,
      // 4 seconds, 8 seconds, and then caps at 10 seconds until
      // the maximum number of attempts is reached
      reconnectInterval: attemptNumber =>
        Math.min(Math.pow(2, attemptNumber) * 1000, 10000),
    }
  );

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory(prev => prev.concat(lastMessage));
    }
  }, [lastMessage, setMessageHistory]);

  const connectionStatus = {
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  function handleSubmitNewComment(event) {
    event.preventDefault();
    sendMessage(`Anonymous: ${newComment.current}`);
    newComment.current = '';
    event.target.reset();
  }

  function submitOnEnter(event) {
    event.preventDefault(); // Prevents the addition of a new line in the text field
    if (event.key === 'Enter' && !event.shiftKey) {
      if (newComment.current.trim() === '') {
        newComment.current = '';
        event.target.value = '';
        return;
      }
      sendMessage(`Anonymous: ${newComment.current}`);
      newComment.current = '';
      event.target.value = '';
    }
  }

  return (
    <div className="text-white">
      <PageTitle title="Chatroom" />
      <h2 className="text-sm md:text-md lg:text-lg opacity-80">
        You are currently in the{' '}
        <span className="text-bittersweet font-semibold">{roomName}</span>{' '}
        chatroom
      </h2>
      <form
        onSubmit={e => {
          e.preventDefault();
          // TODO: More in-depth form validation
          if (roomName === displayRoomName) {
            toast.success(`You are already in the ${roomName} chatroom!`, {
              iconTheme: { primary: 'orange' },
            });
            return;
          }
          setRoomName(displayRoomName);
          setMessageHistory([]);
        }}
      >
        <input
          type="text"
          placeholder="Enter chatroom name"
          onChange={e => setDisplayRoomName(e.target.value)}
          className="text-black"
        />
        <span className="bg-midnight px-2 py-1 rounded-md">
          <input type="submit" value="Join" />
        </span>
      </form>
      <div className="py-2" />
      <MessageHistory
        history={mesageHistory}
        connectionStatus={connectionStatus}
      />

      <div className="py-2" />
      <form onKeyUp={submitOnEnter} onSubmit={handleSubmitNewComment}>
        <fieldset>
          <div className="grid justify-center">
            <label>
              <textarea
                name="content"
                type="text"
                className="text-black p-0.5 rounded h-auto w-auto sm:w-[400px] md:w-[600px] lg:w-[800px]"
                onChange={e => (newComment.current = e.target.value)}
              />
            </label>
            <label>
              <div className="flex justify-end py-1">
                <div className="p-1 rounded w-fit bg-bittersweet">
                  <input type="submit" value="Submit" />
                </div>
              </div>
            </label>
          </div>
        </fieldset>
      </form>
    </div>
  );
}

const MessageHistory = ({ history, connectionStatus }) =>
  history.length > 0 && (
    <div className="grid justify-center px-1 min-h-[50px] max-h-[350px] sm:min-h-[400px] sm:max-h-[550px] lg:min-h-[500px] lg:max-h-[600px] overflow-y-scroll">
      <div className="p-3 rounded bg-gainsboro text-black">
        {/*Show connection status only if it's unstable*/}
        {connectionStatus !== 'Open' && (
          <div className="flex justify-end">
            <SignalIcon className="w-4 h-4" />
            <span className="px-1" />
            {connectionStatus}
          </div>
        )}
        <ul className="w-auto sm:w-[400px] md:w-[600px] lg:w-[800px]">
          {history.map((msg, idx) => (
            <li
              key={idx}
              className={`py-0.5 px-1 text-left ${
                idx % 2 === 0 ? 'bg-eggshell' : ''
              }`}
            >
              <MessageData msg={msg} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

const MessageData = ({ msg }) => {
  if (!msg || !msg.data) return null;
  const splitMessage = msg.data.split(' ');
  // This is a defined format coming in from the backend with a date in ISO format, e.g.
  // Anonymous: this is an example message 2024-01-01T00:00:00.000Z
  const author = splitMessage[0];
  const comment = splitMessage.slice(1, -1).join(' ');
  const date = new Date(splitMessage.at(-1)).toLocaleTimeString();
  return (
    <div className="flex justify-between">
      <div className="flex overflow-x-hidden text-sm">
        <div className="font-semibold pr-1">{author}</div>
        <div>{comment}</div>
      </div>
      <div className="opacity-0 text-xs md:pl-1 md:opacity-70 md:text-xs md:min-w-[75px]">
        {date}
      </div>
    </div>
  );
};
