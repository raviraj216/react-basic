import axios from "axios";
axios.defaults.baseURL = "http://localhost:1337/api/";
export async function searchCategories(jwt, searchQuery, show = false) {
  let url = `/employees?_q=${searchQuery}`;

  if (!show) {
    url += '&filters[Employee_active][$eq]=true';
  }

  const res = await axios.get(
    url,
    {
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    }
  );
  return res.data;
}

export async function getCategories(jwt, page, show = false) {
  let url = `/categories?pagination[page]=${page}&pagination[pageSize]=2`;

  if (!show) {
   // url += '&filters[Employee_active][$eq]=true';
  }

  const res = await axios.get(
    url,
    {
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    }
  );
  console.log("page",page)
  console.log("res.data",res.data)
  return res.data;
}

 
export async function getEmployee(jwt, id) {
  const res = await axios.get(`/employees/${id}`, {
    headers: {
      authorization: `Bearer ${jwt}`,
    },
  });
  return res.data;
}

export async function addCategory(jwt, data) {
  const res = await axios.post(
    `/categories`,
    { data: { ...data } },
    {
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    }
  );
  return res.data;
}

export async function deleteEmployee(jwt, index) {
  const res = await axios.delete(`/employees/${index}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return res;
}

export async function updateEmployees(jwt, id, data) {
  const res = await axios.put(
    `/employees/${id}`,
    { data: data },
    {
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    }
  );
  return res.data;
}
