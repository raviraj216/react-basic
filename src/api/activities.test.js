import axios from "axios";
import {
  addClientActivities,
  getProjectActivities,
  getProjectActivity,
  addActivity,
  deleteActivity,
  updateActivity,
  updateCosts,
  addCost,
} from "./activities";

jest.mock("axios");

describe("Activities API functions", () => {
  const jwt = "your-jwt";
  const projectId = "your-project-id";
  const activityId = "your-activity-id";
  const data = { response: "mock" };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should add client activities", async () => {
    const responseData = { response: "mock"};
    const response = { data: responseData };
    axios.post.mockResolvedValue(response);

    const result = await addClientActivities(jwt, data);

    expect(axios.post).toHaveBeenCalledWith(
      `/client-activities`,
      { data: { ...data } },
      {
        headers: {
          authorization: `Bearer ${jwt}`,
        },
      }
    );
    expect(result).toEqual(responseData);
  });

  it("should get project activities", async () => {
    const activitiesData = [{response: "mock" }];
    const response = { data: activitiesData };
    axios.get.mockResolvedValue(response);

    const result = await getProjectActivities(jwt, projectId, 1);

    expect(axios.get).toHaveBeenCalledWith(
      `/project-activities?filters[project][id]=${projectId}&populate=*&&pagination[page]=1`,
      {
        headers: {
          authorization: `Bearer ${jwt}`,
        },
      }
    );
    expect(result).toEqual(activitiesData);
  });

  it("should get a project activity", async () => {
    const activityData = { response: "mock" };
    const response = { data: activityData };
    axios.get.mockResolvedValue(response);

    const result = await getProjectActivity(jwt, activityId, projectId);

    expect(axios.get).toHaveBeenCalledWith(
      `/project-activities/${activityId}?filters[project][id]=${projectId}&populate=*`,
      {
        headers: {
          authorization: `Bearer ${jwt}`,
        },
      }
    );
    expect(result).toEqual(activityData);
  });

  it("should add an activity", async () => {
    const responseData = { response: "mock" };
    const response = { data: responseData };
    axios.post.mockResolvedValue(response);

    const result = await addActivity(jwt, data);

    expect(axios.post).toHaveBeenCalledWith(
      `/project-activities`,
      { data: { ...data } },
      {
        headers: {
          authorization: `Bearer ${jwt}`,
        },
      }
    );
    expect(result).toEqual(responseData);
  });

  it("should delete an activity", async () => {
    const response = { response: "mock" };
    axios.delete.mockResolvedValue(response);

    const result = await deleteActivity(jwt, activityId);

    expect(axios.delete).toHaveBeenCalledWith(`/project-activities/${activityId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    expect(result).toEqual(response);
  });

  it("should update an activity", async () => {
    const responseData = { response: "mock" };
    const response = { data: responseData };
    axios.put.mockResolvedValue(response);

    const result = await updateActivity(jwt, activityId, data);

    expect(axios.put).toHaveBeenCalledWith(
      `/project-activities/${activityId}`,
      { data: data },
      {
        headers: {
          authorization: `Bearer ${jwt}`,
        },
      }
    );
    expect(result).toEqual(responseData);
  });

  it("should update costs", async () => {
    const responseData = {response: "mock" };
    const response = { data: responseData };
    axios.put.mockResolvedValue(response);

    const result = await updateCosts(jwt, activityId, data);

    expect(axios.put).toHaveBeenCalledWith(
      `/costs/${activityId}`,
      { data: data },
      {
        headers: {
          authorization: `Bearer ${jwt}`,
        },
      }
    );
    expect(result).toEqual(responseData);
  });

  it("should add a cost", async () => {
    const responseData = {response: "mock" };
    const response = { data: responseData };
    axios.post.mockResolvedValue(response);

    const result = await addCost(jwt, data);

    expect(axios.post).toHaveBeenCalledWith(
      `/costs`,
      { data: { ...data } },
      {
        headers: {
          authorization: `Bearer ${jwt}`,
        },
      }
    );
    expect(result).toEqual(responseData);
  });
});
