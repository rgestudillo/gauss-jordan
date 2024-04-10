import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [rows, setRows] = useState(2);
  const [columns, setColumns] = useState(2);
  const [option, setOption] = useState("Option 1");
  const [results, setResults] = useState([]);
  const [grid, setGrid] = useState([]);
  const [solutionType, setSolutionType] = useState(false);
  const [solutionProcess, setSolutionProcess] = useState('');
  const [equations, setEquations] = useState('');
  const [gridUpdated, setGridUpdated] = useState(false);
  const handleOptionChange = (e) => {
    setOption(e.target.value);
    setGrid([]);  
    generateGrid(rows, columns);
    setSolutionType(null);
    setSolutionProcess(null);
  }; 

  const handleEquationsChange = (e) => {
    setEquations(e.target.value);
  };
  const convertEquationsToGrid = (equations) => {
    // Split the equations by newline character to get individual equations
    const equationLines = equations.split('\n');
    
    // Initialize an empty grid
    const newGrid = [];
  
    // Iterate over each equation
    equationLines.forEach((equation) => {
        // Initialize an empty row for the grid
        const row = [];
    
        // Initialize coefficient
        let coefficient = "";

        // Iterate over each character of the equation
        for (let i = 0; i < equation.length; i++) {
          console.log("coefficient is: ", coefficient);
          const char = equation[i];
          if (char === 'x' || char === 'y' || char === 'z') {
            if(coefficient == ""){
              row.push(1);
            }else if(coefficient == "-"){
              row.push(-1);
            }else{
              row.push(parseFloat(coefficient.trim()));
            }


            console.log("reset");
            coefficient = "";
          }
          // If character is '=', push the constant term and break the loop
          else if (char === '=') {
              const constant = parseInt(equation.substring(i + 1));
              row.push(constant);
              break;
          }else{
            if(char != '+' &&  char != ' '){
              coefficient+=char;
            }
  
          }
        }

        // Push the row to the grid
        newGrid.push(row);
    });
    // Set the grid and update status
    setGrid(newGrid);
    setGridUpdated(true);
};

  
  const handleParse = () =>  {
    convertEquationsToGrid(equations);
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
        row.push('');
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

  useEffect(() => {
    console.log("option is: ", option);
  }, [option]);
  

  function printMatrix(grid){
    console.log("printing...");
    for (let i = 0; i < grid.length; i++) {
      console.log(grid[i]);
    }  
  }

  // Function to convert grid to matrix with float values
  function convertGridToMatrix(grid) {
    const matrix = [];
    
    for (let i = 0; i < grid.length; i++) {
      matrix[i] = [];
      for (let j = 0; j < grid[i].length; j++) {
        matrix[i][j] = parseFloat(grid[i][j]);
      }
    }
    
    return matrix;
  }

  const areAllFieldsFilled = () => {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j] === '') {
          return false; // If any field is empty, return false
        }
      }
    }
    return true; // If all fields are filled, return true
  };
  
  const solve = () => {
    let solutionProcessText = '';
    const matrix = convertGridToMatrix(grid);
    const numRows = matrix.length;
    const numCols = matrix[0].length;
    solutionProcessText += `\nInput is: \n`;
    for (let i = 0; i < matrix.length; i++) {
      solutionProcessText += matrix[i].join('\t') + '\n';
    }
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

      const pivotValue = matrix[col][col];
      for (let i = 0; i < numCols; i++) {
        matrix[col][i] /= pivotValue;
      }
      solutionProcessText += `\nR${pivotRow + 1} = R${pivotRow + 1}/${pivotValue}\n`;
      // Append the printed grid to the solution process text

      for (let i = 0; i < matrix.length; i++) {
        solutionProcessText += matrix[i].join('\t') + '\n';
      }
      for (let row = 0; row < numRows; row++) {
        if (row === col) continue;
        const factor = matrix[row][col];
        solutionProcessText += `\nR${row + 1} = R${row + 1} - ${factor}(R${row})\n`;
        for (let i = col; i < numCols; i++) {
          matrix[row][i] -= factor * matrix[col][i];
        }
        for (let i = 0; i < matrix.length; i++) {
          solutionProcessText += matrix[i].join('\t') + '\n';
        }
      }
    }

    let uniqueSolution = true;
    let noSolution = false;
    let multipleSolutions = false;
    const tempResults = [];

    solutionProcessText += '\n Solved system of equations:\n';
    for (let row = 0; row < numRows; row++) {
      const equation = matrix[row].slice(0, numCols - 1).map((value, index) => `${value}x${index + 1}`).join(' + ');
      const constant = matrix[row][numCols - 1];
      solutionProcessText += `${equation} = ${constant}\n`;
      tempResults.push(constant);

      if (matrix[row][numCols - 1] !== 0 && matrix[row].slice(0, numCols - 1).every(value => value === 0)) {
        noSolution = true;
      }

      if (checker(matrix[row])) {
        multipleSolutions = true;
      }
    }

    if (noSolution || multipleSolutions) {
      uniqueSolution = false;
    }

    setResults(tempResults);
    setSolutionProcess(solutionProcessText);

    if (uniqueSolution) {
      setSolutionType('Unique solution');
    } else if (noSolution) {
      setSolutionType('No solution');
    } else if (multipleSolutions) {
      setSolutionType('Multiple solutions');
    }
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
    <div className='flex flex-col space-y-10 text-white justify-center items-center mt-8'>
      <h1 className="text-5xl font-bold text-amber-300">
        Gauss-Jordan Elimination Calculator
      </h1>
      <select className="fixed right-0 top-0 m-8 select select-primary  max-w-xs text-black" onChange={handleOptionChange}>
        <option>Option 1</option>
        <option>Option 2</option>
      </select>
      {option === "Option 1" && <div className='flex flex-col space-y-8'>
        <div className='flex space-x-4 justify-center items-center'>
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Row
            </h1> 
            <select className="select select-bordered max-w-xs text-black text-2xl" onChange={handleRowsChange}>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>
          </div>
          <h1 className="text-3xl font-bold  mt-10">
            X
          </h1>
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Col
            </h1> 
            <select className="select select-bordered max-w-xs text-black text-2xl" onChange={handleColumnsChange}>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: '32px', color: 'black' }}>
          {grid.map((row, rowIndex) => (
            row.map((cell, colIndex) => (
              <div key={`${rowIndex}-${colIndex}`} className='flex flex-row justify-center items-center' >
                { colIndex === columns - 1 && <h1 className="mr-8 text-3xl font-bold text-white">
                  =
                </h1>}
                <textarea 
                  onKeyPress={(e) => {
                    const charCode = e.charCode;
                    // Check if the entered character is a letter (A-Z or a-z)
                    if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122)) {
                      e.preventDefault(); // Prevent entering letters
                    }
                  }}
                  className="textarea textarea-bordered text-2xl text-center" 
                  placeholder={colIndex === columns - 1 ? 'D' : `${String.fromCharCode(65 + colIndex)}${String.fromCharCode(120 + colIndex)} `}
                  value={cell}
                  onChange={(e) => handleTextareaChange(e, rowIndex, colIndex)}
                />
              </div>
            ))
          ))}
        </div>
        <div>
          <button className={`btn ${areAllFieldsFilled() ? "btn-primary" : "bg-gray-300 px-4 py-2 rounded-md cursor-not-allowed opacity-50"}`} onClick={areAllFieldsFilled() ? solve : undefined} >
            Solve
          </button>
        </div>
      </div>
      }
      {option === "Option 2" && <div className='flex flex-col space-y-8'>
          <textarea onChange={handleEquationsChange}   className="w-[40vh] h-[20vh] textarea textarea-bordered text-black" placeholder="x + 2y + 3z = 4
5x + 6y + 7z = 8
9x + 4y + 2z = 3"></textarea>
          <div>
            <button onClick={handleParse} className="btn btn-primary"  >
              Solve
            </button>
        </div>
      </div>
      }
      {solutionProcess && <div className="collapse bg-slate-500">
        <input type="checkbox" /> 
        <div className="ml-4 collapse-title text-xl font-medium">
          Show Solution
        </div>
        <div className="collapse-content"> 
          <pre>{solutionProcess}</pre>
        </div>
      </div>}
      {solutionType && 
        <div className="solution-container">
          {solutionType === "Unique solution" && 
            <div className='flex flex-col space-y-4 text-amber-300'>   
              {results.map((result, index) => (
                <p className="text-3xl font-bold" key={index}>
                  x<sub>{index + 1}</sub> = {result}
                </p>
              ))}
            </div>
          }
          {solutionType === "No solution" && 
            <p className="text-3xl font-bold">
              No Solution
            </p>
          }
          {solutionType === "Multiple solutions" && 
            <h1 className="text-3xl font-bold">
              There are many possible solutions.
            </h1>
          }
        </div>
      }
    </div>
  );
}

export default App;
