// import React from 'react'

// export const App = () => {
//   return (
//     <div>App</div>
//   )
// }
import axios from "axios";
import { useState,useEffect } from "react";

const App =()=>{

  const [data,setData]=useState({UserName:"",UserEmail:"",UserAge:"",UserGender:""});
 const [detail, setDetail] = useState([]);

const getData = async () => {
    try {
        const response = await axios.get(
            "http://localhost:5000/api/collect/getData"
        );

        console.log("Fetched Data:", response.data);

        setDetail(response.data.Mydata || []);

    } catch (error) {
        console.log("GET Error:", error.response?.data || error.message);
    }
};

useEffect(() => {
    getData();
}, []);
  const HandleChange=(e)=>{
    setData({...data,[e.target.name]:e.target.value});
  }

  const HnadleClick = async(e)=>{
    e.preventDefault();

    try {

     const input = await axios.post(
    "http://localhost:5000/api/collect/postData",
    data
);

alert(input.data.msg);

setData({
    UserName: "",
    UserEmail: "",
    UserAge: "",
    UserGender: ""
});

getData();
      
    } catch (error) {

      console.log('error.data',error);
      alert(error.response.data.msg);
      
    }


  }
  return(
    <>

    <div>
      <div>
      <h1>Data Entry Process </h1>
      </div>

      <div>
        <label>Enter UserName:</label>
        <input type="text" onChange={HandleChange} name="UserName" value={data.UserName} placeholder="Enter User Name"/><br></br>

        <label>Enter UserEmail:</label>
        <input type="email" onChange={HandleChange} name="UserEmail" value={data.UserEmail} placeholder="Enter User Email"/><br></br>

        <label>Enter UserAge:</label>
        <input type="number" onChange={HandleChange} name="UserAge" value={data.UserAge} placeholder="Enter User Age"/><br></br>

        <label>Enter UserGender:</label>
        <input type="text" onChange={HandleChange} name="UserGender" value={data.UserGender} placeholder="Enter User Email"/><br></br>

        <button onClick={HnadleClick}>Submit</button>
      </div>

      <div>
      <table>
      <thead>
        <tr>
          <th>s.no</th>
          <th>Name of User</th>
          <th>Email of User</th>
          <th>Age of User</th>
          <th>Gender of User</th>
        </tr>

      </thead>
      <tbody>
    {detail.map((user, index) => (
        <tr key={user._id}>
            <td>{index + 1}</td>
            <td>{user.UserName}</td>
            <td>{user.UserEmail}</td>
            <td>{user.UserAge}</td>
            <td>{user.UserGender}</td>
        </tr>
    ))}
</tbody>
      </table>  
      </div>
      
    </div>

    </>  
  )
}

export default App