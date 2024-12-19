import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import Output from "./components/Output";
import LanguageSelector from "./components/LanguageSelector";
import TaskDescription from "./components/TaskDescription";

const CodeEditorApp = () => {
  const [code, setCode] = useState(""); // Код пользователя
  const [language, setLanguage] = useState("python"); // Текущий язык
  const [output, setOutput] = useState(""); // Результат выполнения
  const [pyodide, setPyodide] = useState(null); // Pyodide instance
  const [isCorrect, setIsCorrect] = useState(null); // Правильность решения

  const task = "Напишите функцию, которая возвращает сумму двух чисел.";
  const expectedResult = 7; // Пример ожидаемого результата

  useEffect(() => {
    const loadPyodide = async () => {
      try {
        const pyodideInstance = await window.loadPyodide({
          indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/",
        });

        setPyodide(pyodideInstance);
      } catch (err) {
        console.error("Ошибка загрузки Pyodide:", err);
      }
    };
    loadPyodide();
  }, []);

  const handleEditorChange = (value) => {
    setCode(value);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    setCode(""); // Очистка кода при смене языка
  };

  const handleRunCode = async () => {
    let outputBuffer = "";
    setIsCorrect(null); // Сбросить статус проверки перед запуском

    if (language === "python" && pyodide) {
      try {
        // Выполнение Python-кода (определение функции)
        await pyodide.runPythonAsync(code);

        console.log = (text) => {
          outputBuffer += `${text}\n`;
          setOutput(outputBuffer); // Обновляем вывод на странице
        };

        // Тестирование функции с различными входами
        // const result = await pyodide.runPythonAsync(code);

        // if (result === expectedResult) {
        //   setIsCorrect(true);
        // } else {
        //   setIsCorrect(false);
        // }
      } catch (err) {
        setOutput(`Ошибка выполнения: ${err.message}`);
        setIsCorrect(false);
      }
    } else if (language === "javascript") {
      try {
        // Выполнение JavaScript-кода (определение функции)
        eval(code);

        // Тестирование функции с различными входами
        const result = sumTwoNumbers(3, 4); // Вызов функции

        if (result === expectedResult) {
          setIsCorrect(true);
        } else {
          setIsCorrect(false);
        }
      } catch (err) {
        setOutput(`Ошибка выполнения: ${err.message}`);
        setIsCorrect(false);
      }
    } else {
      setOutput("Поддержка только для Python и JavaScript.");
      setIsCorrect(false);
    }
  };

  return (
    <div style={{ display: "flex", padding: "20px" }}>
      <TaskDescription task={task} />
      <div style={{ flex: 1 }}>
        <h1>Редактор кода с интерпретатором</h1>

        <LanguageSelector
          language={language}
          onLanguageChange={handleLanguageChange}
        />

        <Editor
          height="400px"
          width="800px"
          language={language}
          theme="vs-dark"
          value={code}
          onChange={handleEditorChange}
          options={{
            fontSize: 16,
            automaticLayout: true,
            minimap: { enabled: false },
            tabSize: 2,
          }}
        />
        <button
          onClick={handleRunCode}
          style={{
            marginTop: "10px",
            padding: "10px 20px",
            fontSize: "16px",
          }}
          disabled={!pyodide && language === "python"}
        >
          {pyodide || language === "javascript"
            ? "Запустить"
            : "Загрузка интерпретатора..."}
        </button>
        <Output output={output} />
        {isCorrect !== null && (
          <div
            style={{
              marginTop: "10px",
              fontWeight: "bold",
              color: isCorrect ? "green" : "red",
            }}
          >
            {isCorrect
              ? "Правильное решение!"
              : "Неправильное решение, попробуйте снова."}
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeEditorApp;
