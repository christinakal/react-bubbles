import React, { useState } from "react";
import axios from "axios";
import { axiosWithAuth } from ".//axiosWithAuth";
import { useHistory } from "react-router-dom";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  // console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorToAdd, setColorToAdd] = useState(initialColor);
  const history = useHistory();

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
      .put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then(() => {
        setEditing(false);
        updateColors(
          colors.map(color => {
            return color.id === colorToEdit.id ? colorToEdit : color;
          })
        );
      });
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`/colors/${color.id}`)
      .then(res => {
        // console.log(res.data)
        updateColors(
          colors.filter(colour => {
            return colour.id !== color.id;
          })
        );
      })
      .catch(err => console.log(err));
  };

  const handleAdd = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("/colors", colorToAdd)
      .then(response => {
        updateColors(response.data);
        history.push("/bubble-page");
      });
  };

  return (
    <div className="colors-wrap">
      <h2>colors</h2>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={e => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit} className="edit-color-form">
          <h3>edit color</h3>
          <label>color name:</label>
          <input
            onChange={e =>
              setColorToEdit({ ...colorToEdit, color: e.target.value })
            }
            value={colorToEdit.color}
          />
          <label>hex code: </label>
          <input
            onChange={e =>
              setColorToEdit({
                ...colorToEdit,
                code: { hex: e.target.value }
              })
            }
            value={colorToEdit.code.hex}
          />

          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <form onSubmit={handleAdd} className="add-color-form">
        <label htmlFor="color" />
        <p>Color</p>
        <input
          value={colorToAdd.color}
          type="text"
          onChange={e =>
            setColorToAdd({ ...colorToAdd, color: e.target.value })
          }
          name="color"
        />
        <label htmlFor="hex" />
        <p>Color Code</p>
        <input
          type="text"
          value={colorToAdd.code.hex}
          onChange={e =>
            setColorToAdd({
              ...colorToAdd,
              code: { hex: e.target.value }
            })
          }
          name="hex"
        />
        <button className="add-color-btn">Add Color</button>
      </form>
      <div className="spacer" />
    </div>
  );
};

export default ColorList;

// import React, { useState } from "react";
// import { axiosWithAuth } from "./axiosWithAuth";
// import { useHistory } from "react-router-dom";

// const initialColor = {
//   color: "",
//   code: { hex: "" }
// };

// const ColorList = ({ colors, updateColors }) => {
//   console.log(colors);
//   const [editing, setEditing] = useState(false);
//   const [colorToEdit, setColorToEdit] = useState(initialColor);
//   const [colorToEditId, setColorToEditId] = useState("");
//   const [colorToAdd, setColorToAdd] = useState(initialColor);
//   const history = useHistory();

//   const editColor = color => {
//     setEditing(true);
//     setColorToEdit(color);
//   };

//   const saveEdit = e => {
//     e.preventDefault();
//     const colorElement = colors.filter(element => {
//       return colorToEditId === element.id;
//     });
//     // Make a put request to save your updated color
//     // think about where will you get the id from...
//     // where is is saved right now?
//     axiosWithAuth()
//       .put(`/colors/${colorElement.id}`, colorToEdit)
//       .then(response => {
//         colors.map((element, index) => {
//           if (element.id === colorToEditId) {
//             colors.splice(index, 1);
//             updateColors([...colors, colorToEdit]);
//           }
//         });
//         history.push("/bubble-page");
//       });
//   };

//   const deleteColor = color => {
//     // make a delete request to delete this color
//     axiosWithAuth()
//       .delete(`/colors/${color.id}`)
//       .then(response => {
//         axiosWithAuth()
//           .get("/colors")
//           .then(response => {
//             updateColors(response.data);
//           });
//       });
//   };

// const handleAdd = e => {
//   e.preventDefault();
//   axiosWithAuth()
//     .post("/colors", colorToAdd)
//     .then(response => {
//       updateColors(response.data);
//       history.push("/bubble-page");
//     });
// };

// return (
//   <div className="colors-wrap">
//     <h2>colors</h2>
//     <ul>
//       {colors.map(color => (
//         <li key={color.color} onClick={() => editColor(color)}>
//           <span>
//             <span
//               className="delete"
//               onClick={e => {
//                 e.stopPropagation();
//                 deleteColor(color);
//               }}
//             >
//               x
//             </span>{" "}
//             {color.color}
//           </span>
//           <div
//             className="color-box"
//             style={{ backgroundColor: color.code.hex }}
//           />
//         </li>
//       ))}
//     </ul>
//     {editing && (
//       <form onSubmit={saveEdit} className="edit-color-form">
//         <h3>edit color</h3>
//         <label>color name:</label>
//         <input
//           onChange={e =>
//             setColorToEdit({ ...colorToEdit, color: e.target.value })
//           }
//           value={colorToEdit.color}
//         />
//         <label>hex code: </label>
//         <input
//           onChange={e =>
//             setColorToEdit({
//               ...colorToEdit,
//               code: { hex: e.target.value }
//             })
//           }
//           value={colorToEdit.code.hex}
//         />

//         <div className="button-row">
//           <button type="submit">save</button>
//           <button onClick={() => setEditing(false)}>cancel</button>
//         </div>
//       </form>
//     )}
//     <form onSubmit={handleAdd} className="add-color-form">
//       <label htmlFor="color" />
//       <p>Color</p>
//       <input
//         value={colorToAdd.color}
//         type="text"
//         onChange={e =>
//           setColorToAdd({ ...colorToAdd, color: e.target.value })
//         }
//         name="color"
//       />
//       <label htmlFor="hex" />
//       <p>Color Code</p>
//       <input
//         type="text"
//         value={colorToAdd.code.hex}
//         onChange={e =>
//           setColorToAdd({
//             ...colorToAdd,
//             code: { hex: e.target.value }
//           })
//         }
//         name="hex"
//       />
//       <button className="add-color-btn">Add Color</button>
//     </form>
//     <div className="spacer" />
//   </div>
// );
// };

// export default ColorList;
