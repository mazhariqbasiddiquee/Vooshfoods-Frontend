import React from 'react';

interface FloatingChatButtonProps {
  onClick: () => void;
}

export function FloatingChatButton({ onClick }: FloatingChatButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white p-4 rounded-full shadow-lg focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all duration-200 flex items-center justify-center"
      aria-label="Open chat"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12c0 4.556 4.694 8.25 10.125 8.25.982 0 1.936-.09 2.85-.26.41-.075.82-.16 1.22-.26.37-.09.73-.19 1.08-.31.34-.12.67-.25.99-.4.31-.15.61-.31.9-.48.28-.17.55-.36.8-.56.24-.2.47-.41.68-.63.21-.22.41-.45.59-.69.18-.24.34-.49.49-.75.15-.26.29-.53.41-.8.12-.27.23-.55.32-.83.09-.28.17-.57.23-.86.06-.29.1-.59.13-.89.03-.3.05-.61.05-.92C21.75 7.444 17.056 3.75 11.625 3.75c-.982 0-1.936.09-2.85.26-.41.075-.82.16-1.22.26-.37.09-.73.19-1.08.31-.34.12-.67.25-.99.4-.31.15-.61.31-.9.48-.28.17-.55.36-.8.56-.24.2-.47.41-.68.63-.21.22-.41.45-.59.69-.18.24-.34.49-.49.75-.15.26-.29.53-.41.8-.12.27-.23.55-.32.83-.09.28-.17.57-.23.86-.06.29-.1.59-.13.89-.03.3-.05.61-.05.92z" />
      </svg>
    </button>
  );
}
