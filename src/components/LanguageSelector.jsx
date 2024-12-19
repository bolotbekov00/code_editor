const LanguageSelector = ({ language, onLanguageChange }) => {
  return (
    <div>
      <label htmlFor="language">Выберите язык: </label>
      <select
        id="language"
        value={language}
        onChange={onLanguageChange}
        style={{ marginBottom: "10px" }}
      >
        <option value="python">Python</option>
        <option value="javascript">JavaScript</option>
      </select>
    </div>
  );
};

export default LanguageSelector;
