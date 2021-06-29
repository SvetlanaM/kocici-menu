import Link from 'next/link';
import React from 'react';

interface Props {
  title: string;
  onClick: () => void;
}

const NeutralButton = ({ title, onClick }: Props): JSX.Element => (
  <button
    type="button"
    onClick={onClick}
    className="mb-5 py-1.5 border-rounded-base border-purple font-medium text-center text-purple-light transition duration-500 ease-in hover:bg-purple-light hover:text-white w-full xl-custom:w-1/4 "
  >
    {title}
  </button>
);

export default NeutralButton;
