import { useState, useEffect } from "react";
import "../App.css";
import { MathJax, MathJaxContext } from "better-react-mathjax";

function Home() {
  const [rows, setRows] = useState(2);
  const [columns, setColumns] = useState(2);

  const [results, setResults] = useState([]);
  const [grid, setGrid] = useState([]);
  const [solutionType, setSolutionType] = useState(false);
  const [solutionProcess, setSolutionProcess] = useState("");

  const [gridUpdated, setGridUpdated] = useState(false);

  const handleClear = () => {
    setRows(2); // Reset rows to default value
    setColumns(2); // Reset columns to default value
    setResults([]); // Clear results
    setGrid([]); // Clear grid
    generateGrid(rows, columns);
    setSolutionType(false); // Reset solution type
    setSolutionProcess(""); // Clear solution process
    setGridUpdated(false); // Reset grid updated flag
  };

  const handleRowsChange = (e) => {
    setRows(parseInt(e.target.value));
    generateGrid(parseInt(e.target.value), columns);
  };

  const handleColumnsChange = (e) => {
    setColumns(parseInt(e.target.value));
    generateGrid(rows, parseInt(e.target.value));
  };

  const generateGrid = (rowCount, columnCount) => {
    const newGrid = [];
    for (let i = 0; i < rowCount; i++) {
      const row = [];
      for (let j = 0; j < columnCount; j++) {
        row.push("");
      }
      newGrid.push(row);
    }
    setGrid(newGrid);
  };

  const handleTextareaChange = (e, rowIndex, colIndex) => {
    const updatedGrid = [...grid];
    updatedGrid[rowIndex][colIndex] = e.target.value;
    setGrid(updatedGrid);
    setSolutionType(null);
    setSolutionProcess(null);
  };

  useEffect(() => {
    generateGrid(rows, columns);
  }, [rows, columns]);

  // Function to convert grid to matrix with float values
  function convertGridToMatrix(grid) {
    const matrix = [];

    for (let i = 0; i < grid.length; i++) {
      matrix[i] = [];
      for (let j = 0; j < grid[i].length; j++) {
        matrix[i][j] = parseFractionOrFloat(grid[i][j]);
      }
    }

    return matrix;
  }

  function parseFractionOrFloat(value) {
    if (value.includes("/")) {
      // Assuming the format is like "1/3" or "10/4"
      const parts = value.split("/");
      if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
        return parseFloat(parts[0]) / parseFloat(parts[1]);
      }
    }
    return parseFloat(value);
  }

  const areAllFieldsFilled = () => {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j] === "") {
          return false; // If any field is empty, return false
        }
      }
    }
    return true; // If all fields are filled, return true
  };

  const solve = () => {
    let solutionProcessText = "";
    const matrix = convertGridToMatrix(grid);
    const numRows = matrix.length;
    const numCols = matrix[0].length;

    // Add LaTeX formatting for input matrix
    solutionProcessText += "\\[\\text{Input is: }\\]";
    solutionProcessText += "\\[\\begin{bmatrix}";
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        solutionProcessText += matrix[i][j];
        if (j !== numCols - 1) {
          solutionProcessText += " & ";
        }
      }
      solutionProcessText += " \\\\ ";
    }
    solutionProcessText += "\\end{bmatrix}\\]";

    for (let col = 0; col < numCols - 1; col++) {
      let pivotRow = -1;
      for (let row = col; row < numRows; row++) {
        if (matrix[row][col] !== 0) {
          pivotRow = row;
          break;
        }
      }

      if (pivotRow === -1) {
        continue;
      }

      [matrix[col], matrix[pivotRow]] = [matrix[pivotRow], matrix[col]];

      if (pivotRow != col) {
        solutionProcessText += `\\[R_{${col + 1}} \\leftrightarrow R_{${
          pivotRow + 1
        }}\\]`;

        solutionProcessText += "\\[\\begin{bmatrix}";
        for (let i = 0; i < numRows; i++) {
          for (let j = 0; j < numCols; j++) {
            solutionProcessText += matrix[i][j];
            if (j !== numCols - 1) {
              solutionProcessText += " & ";
            }
          }
          solutionProcessText += " \\\\ ";
        }
        solutionProcessText += "\\end{bmatrix}\\]";
      }

      const pivotValue = matrix[col][col];
      for (let i = 0; i < numCols; i++) {
        matrix[col][i] /= pivotValue;
      }

      if (pivotValue != 1) {
        solutionProcessText += `\\[R_{${
          pivotRow + 1
        }} = \\frac{1}{${pivotValue}} R_{${pivotRow + 1}}\\]`;

        solutionProcessText += "\\[\\begin{bmatrix}";
        for (let i = 0; i < numRows; i++) {
          for (let j = 0; j < numCols; j++) {
            solutionProcessText += matrix[i][j];
            if (j !== numCols - 1) {
              solutionProcessText += " & ";
            }
          }
          solutionProcessText += " \\\\ ";
        }
        solutionProcessText += "\\end{bmatrix}\\]";
      }

      for (let row = 0; row < numRows; row++) {
        if (row === col) continue;
        const factor = matrix[row][col];

        for (let i = col; i < numCols; i++) {
          matrix[row][i] -= factor * matrix[col][i];
        }

        if (factor != 0) {
          // Add LaTeX formatting for row operations
          solutionProcessText += `\\[R_{${row + 1}} = R_{${row + 1}} + (${
            factor * -1
          })R_{${pivotRow + 1}}\\]`;

          solutionProcessText += "\\[\\begin{bmatrix}";
          for (let i = 0; i < numRows; i++) {
            for (let j = 0; j < numCols; j++) {
              solutionProcessText += matrix[i][j];
              if (j !== numCols - 1) {
                solutionProcessText += " & ";
              }
            }
            solutionProcessText += " \\\\ ";
          }
          solutionProcessText += "\\end{bmatrix}\\]";
        }
      }
    }

    let uniqueSolution = true;
    let noSolution = false;
    let multipleSolutions = false;

    // Add LaTeX formatting for the solved system of equations
    solutionProcessText += "\\[\\text{Solved system of equations:}\\]";
    let tempResults = "";
    for (let row = 0; row < numRows; row++) {
      const variableName = String.fromCharCode(120 + row);
      const equation = matrix[row]
        .slice(0, numCols - 1)
        .map((value, index) => `${value}${String.fromCharCode(120 + index)}`)
        .join(" + ");
      const constant = matrix[row][numCols - 1];
      solutionProcessText += `\\[${equation} = ${constant}\\]`;
      tempResults += `\\[${variableName} = ${constant}\\]`;
      if (
        matrix[row][numCols - 1] !== 0 &&
        matrix[row].slice(0, numCols - 1).every((value) => value === 0)
      ) {
        noSolution = true;
      }

      if (checker(matrix[row])) {
        multipleSolutions = true;
      }
    }

    if (noSolution || multipleSolutions) {
      uniqueSolution = false;
    }

    if (uniqueSolution) {
      setSolutionType("Unique solution");
    } else if (noSolution) {
      setSolutionType("No solution");
    } else if (multipleSolutions) {
      setSolutionType("Multiple solutions");
    }

    setSolutionProcess(solutionProcessText);
    setResults(tempResults);
  };

  const checker = (row) => {
    const numCols = row.length;
    let countNonZero = 0;
    for (let i = 0; i < numCols - 1; i++) {
      if (row[i] !== 0) {
        countNonZero++;
      }
    }
    return countNonZero > 1;
  };

  useEffect(() => {
    if (gridUpdated) {
      solve();
      // Reset the gridUpdated flag to false
      setGridUpdated(false);
    }
  }, [gridUpdated]);
  return (
    <div className="flex flex-col space-y-10 text-white justify-center items-center my-8">
      <div className="flex flex-col space-y-8 justify-center items-center">
        <div className="flex space-x-4 text-black items-center">
          <div>
            <select
              className="select select-bordered max-w-xs text-black text-2xl border-4  border-black rounded-none "
              onChange={handleRowsChange}
            >
              <option>2</option>
              <option>3</option>
            </select>
          </div>
          <h1 className="text-lg font-bold">X</h1>
          <div>
            <select
              className="select select-bordered max-w-xs text-black text-2xl border-4 border-black rounded-none"
              onChange={handleColumnsChange}
            >
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gap: "32px",
            color: "black",
          }}
        >
          {grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className="flex flex-row justify-center items-center"
                style={{
                  borderRight:
                    colIndex === columns - 2 ? "5px solid black" : "none", // Add border on the right for the last column
                  paddingRight: colIndex === columns - 2 ? "50px" : "0", // Add padding to maintain spacing
                }}
              >
                <textarea
                  onKeyPress={(e) => {
                    const charCode = e.charCode;
                    // Check if the entered character is a letter (A-Z or a-z)
                    if (
                      (charCode >= 65 && charCode <= 90) ||
                      (charCode >= 97 && charCode <= 122)
                    ) {
                      e.preventDefault(); // Prevent entering letters
                    }
                  }}
                  className="textarea textarea-bordered text-2xl text-center border-4 border-black rounded-none"
                  placeholder={
                    colIndex === columns - 1
                      ? "D"
                      : `${String.fromCharCode(
                          65 + colIndex
                        )}${String.fromCharCode(120 + colIndex)} `
                  }
                  value={cell}
                  onChange={(e) => handleTextareaChange(e, rowIndex, colIndex)}
                />
              </div>
            ))
          )}
        </div>

        <div className="flex space-x-4">
          <button onClick={handleClear} className="btn bg-black text-white">
            Clear
          </button>
          <button
            className={`btn ${
              areAllFieldsFilled()
                ? "btn bg-black text-white"
                : "bg-gray-300 px-4 py-2 rounded-md cursor-not-allowed opacity-50"
            }`}
            onClick={areAllFieldsFilled() ? solve : undefined}
          >
            Solve
          </button>
        </div>
      </div>

      {solutionType && (
        <div className="collapse bg-white border-4  border-black">
          <input type="checkbox" />
          <div className="ml-4 collapse-title text-xl  text-black text-center  font-medium">
            Show Solution
          </div>
          <div className="collapse-content">
            <pre>
              <MathJaxContext>
                <MathJax className=" text-black ">{solutionProcess}</MathJax>
              </MathJaxContext>
            </pre>
          </div>
        </div>
      )}
      {solutionType && (
        <div className="flex flex-col items-center justifty-center solution-container text-black">
          <h1 className="text-xl font-bold text-[#04BBD4]">Answer:</h1>
          {solutionType === "Unique solution" && (
            <div className="flex flex-row ">
              <MathJaxContext>
                <MathJax className="text-3xl text-black font-bold">
                  {results}
                </MathJax>
              </MathJaxContext>
            </div>
          )}
          {solutionType === "No solution" && (
            <p className="text-3xl font-bold">No Solution</p>
          )}
          {solutionType === "Multiple solutions" && (
            <h1 className="text-3xl font-bold">
              There are many possible solutions.
            </h1>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
