import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [stuClass, setStuClass] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/students/${id}`)
      .then((res) => {
        console.log("Server trả về:", res.data);

        const stu = res.data.student || res.data;

        setName(stu.name || "");
        setAge(stu.age || "");
        setStuClass(stu.class || stu.stuClass || "");
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:5000/api/students/${id}`, {
        name,
        age: Number(age),
        stuClass,
      })
      .then(() => {
        alert("Cập nhật thành công!");
        navigate("/");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Chỉnh sửa thông tin học sinh</h2>

      <form onSubmit={handleUpdate}>
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
          Lưu thay đổi
        </button>
      </form>
    </div>
  );
}

export default EditStudent;
