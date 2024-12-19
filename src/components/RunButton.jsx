const RunButton = ({ onRunCode, disabled }) => {
  return (
    <button
      onClick={onRunCode}
      style={{
        marginTop: "10px",
        padding: "10px 20px",
        fontSize: "16px",
      }}
      disabled={disabled}
    >
      {disabled ? "Загрузка интерпретатора..." : "Запустить"}
    </button>
  );
};

export default RunButton;
