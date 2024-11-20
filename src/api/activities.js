import axios from "axios";

export async function getProjectActivities(jwt, id, page) {
  const res = await axios.get(`/project-activities?filters[project][id]=${id}&populate=*&&pagination[page]=${page}`, {
    headers: {
      authorization: `Bearer ${jwt}`
    }
  })
  return res.data
}

export async function getProjectActivity(jwt, activity_id, id) {
  const res = await axios.get(`/project-activities/${activity_id}?filters[project][id]=${id}&populate=*`, {
    headers: {
      authorization: `Bearer ${jwt}`
    }
  })
  return res.data
}

export async function addActivity(jwt, data) {
  const res = await axios.post(
    `/project-activities`,
    { data: { ...data } },
    {
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    }
  );
  return res.data;
}

export async function deleteActivity(jwt, index) {
  const res = await axios.delete(`/project-activities/${index}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return res;
}

export async function updateActivity(jwt, id, data) {
  const res = await axios.put(
    `/project-activities/${id}`,
    { data: data },
    {
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    }
  );
  return res.data;
}
