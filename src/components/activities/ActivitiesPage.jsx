import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageTitle } from '../PageTitle';
import { ChevronRightIcon } from '@heroicons/react/24/solid';

const text =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fermentum et sollicitudin ac orci phasellus egestas tellus rutrum tellus. Aliquam sem fringilla ut morbi. Arcu dui vivamus arcu felis bibendum ut tristique et egestas. Erat pellentesque adipiscing commodo elit at. Vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare. Libero id faucibus nisl tincidunt eget nullam non. Mattis enim ut tellus elementum sagittis. Fermentum et sollicitudin ac orci phasellus egestas tellus rutrum. Fermentum iaculis eu non diam phasellus vestibulum lorem sed. Accumsan in nisl nisi scelerisque eu. Mi in nulla posuere sollicitudin aliquam.  \nNeque egestas congue quisque egestas. Lacus vestibulum sed arcu non odio. Eget egestas purus viverra accumsan in nisl nisi scelerisque. Vel quam elementum pulvinar etiam non quam lacus suspendisse faucibus. Nulla aliquet enim tortor at auctor. Vitae turpis massa sed elementum tempus egestas sed. Augue eget arcu dictum varius. Volutpat diam ut venenatis tellus. Tortor consequat id porta nibh venenatis cras sed. Faucibus turpis in eu mi bibendum neque.';

export default function Activities() {
  return (
    <>
      <PageTitle title="Activities" />
      {/*Accordion menu*/}
      <div className="flex justify-center px-2 py-5">
        <div className="grid grid-cols-1 gap-2">
          <AccordionPiece
            label="John Conway's Game of Life"
            navigateTo="game-of-life"
            description={text}
          />
          <AccordionPiece
            label="Snake"
            navigateTo="snake"
            description={"It's Snake - the classic game about Snake!"}
          />
        </div>
      </div>
    </>
  );
}

/**
 * @param {string} label
 * @param {string} navigateTo - The subroute to navigate to
 * @param {string | JSX.Element} description - The long description of the item
 * @returns {JSX.Element}
 */
function AccordionPiece({ label, navigateTo, description }) {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="grid grid-cols-1 max-w-2xl">
      <div className="flex bg-gray-500 rounded-t min-w-fit hover:opacity-80">
        <button className="flex px-4 py-2" onClick={() => navigate(navigateTo)}>
          <h2 className="text-white underline text-sm md:text-lg">{label}</h2>
          <span className="sm:px-24" />
        </button>
        <button
          className="px-2 ml-auto"
          onClick={() => setExpanded(prev => !prev)}
        >
          <div className="flex">
            <span className="sm:px-2" />
            <ChevronRightIcon
              className={`w-6 h-6 text-gainsboro stroke-midnight hover:opacity-80 transition-all ${
                expanded && 'rotate-90'
              }`}
            />
          </div>
        </button>
      </div>
      <div
        className={`bg-gainsboro text-gray-900 text-sm md:text-md ${
          expanded ? 'p-2' : 'h-0 overflow-hidden'
        }`}
      >
        {description}
      </div>
    </div>
  );
}
