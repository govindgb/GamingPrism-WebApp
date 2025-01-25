const Button = ({ text, onClick }) => {
    return (
      <button
        onClick={onClick}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        {text}
      </button>
    );
  };
  
  export default Button;
  