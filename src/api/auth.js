import axios from "axios";

axios.defaults.baseURL = "http://localhost:1337/api/";

export async function authorize(name, password) {
  return await axios.post("/auth/local", {
      identifier: name,
      password: password,
    })
    .then((res) => {
      console.log("reslogin",res);
      return res.data;
    })
}

// export async function getUserSettings(jwt) {
//   return axios.get("/settings",
//       {
//         headers: {
//           authorization: `Bearer ${jwt}`,
//         },
//       }
//     )
//     .then((res) => res.data.data);
// }
