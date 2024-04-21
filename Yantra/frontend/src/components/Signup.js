// // // Signup.js

// // import React, { useState } from "react";
// // import axios from "axios";

// // function Signup() {
// //   const [formData, setFormData] = useState({
// //     username: "",
// //     email: "",
// //     password: "",
// //     confirmPassword: "",
// //   });

// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       if (formData.password !== formData.confirmPassword) {
// //         alert("Passwords do not match");
// //         return;
// //       }

// //       const response = await axios.post(
// //         "http://localhost:3000/auth/signup",
// //         formData
// //       );
// //       console.log("Signup successful:", response.data);
// //       // Redirect or perform any other action after successful signup
// //     } catch (error) {
// //       console.error("Error signing up:", error.message);
// //     }
// //   };

// //   return (
// //     <div>
// //       <h2>Signup</h2>
// //       <form onSubmit={handleSubmit}>
// //         <div>
// //           <label>Username:</label>
// //           <input
// //             type="text"
// //             name="username"
// //             value={formData.username}
// //             onChange={handleChange}
// //             required
// //           />
// //         </div>
// //         <div>
// //           <label>Email:</label>
// //           <input
// //             type="email"
// //             name="email"
// //             value={formData.email}
// //             onChange={handleChange}
// //             required
// //           />
// //         </div>
// //         <div>
// //           <label>Password:</label>
// //           <input
// //             type="password"
// //             name="password"
// //             value={formData.password}
// //             onChange={handleChange}
// //             required
// //           />
// //         </div>
// //         <div>
// //           <label>Confirm Password:</label>
// //           <input
// //             type="password"
// //             name="confirmPassword"
// //             value={formData.confirmPassword}
// //             onChange={handleChange}
// //             required
// //           />
// //         </div>
// //         <button type="submit">Signup</button>
// //       </form>
// //     </div>
// //   );
// // }

// // export default Signup;

// // Signup.js

// import React, { useState } from "react";
// import axios from "axios";

// function Signup() {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [signupSuccess, setSignupSuccess] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (formData.password !== formData.confirmPassword) {
//         alert("Passwords do not match");
//         return;
//       }

//       const response = await axios.post(
//         "http://localhost:3000/auth/signup",
//         formData
//       );
//       console.log("Signup successful:", response.data);
//       setSignupSuccess(true);
//     } catch (error) {
//       console.error("Error signing up:", error.message);
//     }
//   };

//   return (
//     <div>
//       <h2>Signup</h2>
//       {signupSuccess ? (
//         <div>
//           <p>Signup successful!</p>
//           <button onClick={() => setSignupSuccess(false)}>Close</button>
//           <button onClick={() => window.location.href = '/login'}>Go to Login</button>
//         </div>
//       ) : (
//         <form onSubmit={handleSubmit}>
//           <div>
//             <label>Username:</label>
//             <input
//               type="text"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div>
//             <label>Email:</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div>
//             <label>Password:</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div>
//             <label>Confirm Password:</label>
//             <input
//               type="password"
//               name="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <button type="submit">Signup</button>
//         </form>
//       )}
//     </div>
//   );
// }
// export default Signup;

import React, { useState } from "react";
import axios from "axios";

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [signupSuccess, setSignupSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      const response = await axios.post(
        "http://localhost:3000/auth/signup",
        formData
      );
      console.log("Signup successful:", response.data);
      setSignupSuccess(true);
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  };

  return (
    <div>
      <div>
        <h1>SignUP</h1>
      </div>
      <div style={containerStyle}>
        {signupSuccess ? (
          <div style={successMessageStyle}>
            <p>Signup successful!</p>
            <button style={buttonStyle} onClick={() => setSignupSuccess(false)}>
              Close
            </button>
            <button
              style={buttonStyle}
              onClick={() => (window.location.href = "/login")}
            >
              Go to Login
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={formStyle}>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Username:</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Confirm Password:</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>
            <button type="submit" style={buttonStyle}>
              Signup
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

const containerStyle = {
  fontFamily: "Arial, sans-serif",
  backgroundColor: "#f4f4f4",
  margin: 0,
  padding: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
};

const headerStyle = {
  color: "#333",
  textAlign: "center",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
};

const inputGroupStyle = {
  marginBottom: "15px",
};

const labelStyle = {
  marginBottom: "5px",
  color: "#666",
};

const inputStyle = {
  padding: "10px",
  marginBottom: "15px",
  border: "1px solid #ddd",
  borderRadius: "4px",
};

const successMessageStyle = {
  textAlign: "center",
};

const buttonStyle = {
  backgroundColor: "#5cb85c",
  color: "white",
  padding: "10px 15px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  marginBottom: "10px",
  marginRight: "10px",
};

export default Signup;
