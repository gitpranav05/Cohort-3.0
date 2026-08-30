function Button({ text, onClick }: { text: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="border-2 p-1 rounded-xl  cursor-pointer"
    >
      {text}
    </button>
  );
}

export default Button;
