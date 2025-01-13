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
  let url = `/categories?pagination[page]=${page}&pagination[pageSize]=10`;

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

 
export async function getCategory(jwt, id) {
  const res = await axios.get(`/categories/${id}`, {
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

export async function deleteCategory(jwt, index) {
  const res = await axios.delete(`/categories/${index}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return res;
}

export async function updateCategory(jwt, id, data) {
  const res = await axios.put(
    `/categories/${id}`,
    { data: data },
    {
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    }
  );
  return res.data;
}
