// GetStarted.js

import React from "react";
import ReactMarkdown from "react-markdown";

function GetStarted() {
  const markdownContent = `
- Our calculator handles systems up to 3 unknowns and/or 4 equations, ranging from 2x2 to 4x4 matrices. However, if the number of equations doesn't equal the number of variables, there may be an infinite number of solutions or no solution at all.
  `;

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
      {/* <ReactMarkdown>{markdownContent}</ReactMarkdown> */}

      <div className="flex flex-col mt-8 space-y-4 items-center ml-4">
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
