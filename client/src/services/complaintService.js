import api from "./api";

export const createComplaint = async (payload) => {
  const { data } = await api.post("/complaints", payload);
  return data.complaint;
};

export const analyzeComplaintImage = async (payload) => {
  const { data } = await api.post("/complaints/analyze", payload);
  return data.analysis;
};

export const getComplaints = async () => {
  const { data } = await api.get("/complaints");
  return data.complaints;
};

export const getComplaint = async (id) => {
  const { data } = await api.get(`/complaints/${id}`);
  return data.complaint;
};

export const updateComplaint = async (id, payload) => {
  const { data } = await api.patch(`/complaints/${id}`, payload);
  return data.complaint;
};

export const getComplaintDashboard = async () => {
  const { data } = await api.get("/complaints/dashboard");
  return data;
};
