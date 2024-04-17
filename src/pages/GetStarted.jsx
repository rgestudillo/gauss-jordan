// GetStarted.js

import { MathJax, MathJaxContext } from "better-react-mathjax";

function GetStarted() {
  return (
    <div className="flex flex-col">
      <p className="mt-4 text-justify">
        Welcome to our <strong>System of Linear Equations Calculator</strong>,
        powered by{" "}
        <strong>
          Gauss-Jordan Elimination in Reduced Row Echelon Form (RREF)
        </strong>
        . Our tool simplifies solving linear equations by seamlessly integrating
        the renowned Gauss-Jordan elimination technique. It efficiently
        transforms your system of equations into an{" "}
        <strong>augmented matrix</strong> and applies a systematic series of row
        operations, ensuring you obtain the solution you need. With intuitive
        input options and rapid computations, it delivers precise solutions for
        systems of equations with up to 3 unknowns and/or 4 equations. Say
        goodbye to manual calculations and let our efficient calculator handle
        the heavy lifting, streamlining your work in linear algebra with
        confidence.
      </p>
      <div className="flex flex-col my-4 bg-white border border-black px-8 py-4">
        <ol className="list-disc">
          <p className="text-amber-500 font-bold text-center">Matrix Option</p>
          <li>
            <strong>Accessing Matrix Interface:</strong> Upon landing on our
            website, you'll find the matrix option readily available.
          </li>
          <li>
            <strong>Rows and Columns:</strong> Click and choose the number of
            rows and columns needed for your system.
          </li>
          <li>
            <strong>Inputting Coefficients:</strong> Once selected,
            corresponding fields for coefficients will appear. Enter the
            numerical values of your coefficients, aligning them properly with
            the corresponding variables across the equations.
          </li>
          <li>
            <strong>Calculation:</strong> Click the "Solve" button to initiate
            the calculation process. Our calculator will employ the Gauss-Jordan
            method to transform or reduce the matrix.
          </li>
          <li>
            <strong>Result:</strong>
            The resulting matrix will be displayed automatically, providing you
            with the solution to your system of linear equations
          </li>
          <li>
            <strong>Example: </strong> For instance, consider the system
          </li>
          <MathJaxContext>
            <MathJax className=" text-black ">{`  \\[
  \\begin{align*}
  2x + 3y - z &= 5 \\\\
  3x + 2y + z &= 10 \\\\
  x - 5y + 3z &= 0
  \\end{align*}
  \\]`}</MathJax>
          </MathJaxContext>
          <p>
            To solve this system using the ‘Matrix’ option. Make a matrix with 3
            rows and 4 columns. Then enter the coefficients accordingly:
          </p>
          <p>
            Then, click solve. By applying the Gauss-Jordan elimination
            algorithm, the calculator will convert this augmented matrix into
            its RREF, from which the solution can be read directly.
          </p>
        </ol>
      </div>

      <div className="flex flex-col mb-5 space-y-4 items-center ml-4">
        <p className="text-amber-500 font-bold">Additional Notes</p>
        <ol className="list-disc">
          <li>
            <strong>Clearing input:</strong> Just click the ‘Clear’ button
          </li>
          <li>
            {" "}
            <strong>R1, R2, R3, R4</strong> stands for rows 1, 2, 3, and 4
            respectively.
          </li>
          <li>
            Our calculator handles systems up to <strong>3 unknowns </strong>
            and/or <strong>4 equations</strong> , ranging from{" "}
            <strong>2x2 to 4x4 matrices</strong>. However, if the number of
            equations doesn't equal the number of variables, there may be an
            infinite number of solutions or no solution at all.
          </li>
        </ol>
      </div>
    </div>
  );
}

export default GetStarted;
