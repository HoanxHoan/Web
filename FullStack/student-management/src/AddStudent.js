import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddStudent() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [stuClass, setStuClass] = useState("");

  const handleCreate = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/api/students", {
        name,
        age: Number(age),
        class: stuClass,
      })
      .then(() => {
        alert("Thêm học sinh thành công!");
        navigate("/");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Thêm học sinh mới</h2>

      <form onSubmit={handleCreate}>
        <div>
          <label>Tên:</label><br />
          <input 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label>Tuổi:</label><br />
          <input 
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        <div>
          <label>Lớp:</label><br />
          <input 
            value={stuClass}
            onChange={(e) => setStuClass(e.target.value)}
          />
        </div>

        <button type="submit" style={{ marginTop: 10 }}>
          Thêm mới
        </button>
      </form>
    </div>
  );
}

export default AddStudent;
