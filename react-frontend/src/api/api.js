import axios from "axios";

const API_URL = "http://localhost:9090/api";

// ** Books API Calls **
export const getBooks = async () => {
  return axios.get(`${API_URL}/books`);
};

export const getBookById = async (id) => {
  return axios.get(`${API_URL}/books/${id}`);
};

export const createBook = async (book) => {
  return axios.post(`${API_URL}/books`, book);
};

export const updateBook = async (id, book) => {
  return axios.put(`${API_URL}/books/${id}`, book);
};

export const deleteBook = async (id) => {
  return axios.delete(`${API_URL}/books/${id}`);
};

// ** Members API Calls **
export const getMembers = async () => {
  return axios.get(`${API_URL}/members`);
};

export const getMemberById = async (id) => {
  return axios.get(`${API_URL}/members/${id}`);
};

export const createMember = async (member) => {
  return axios.post(`${API_URL}/members`, member);
};

export const updateMember = async (id, member) => {
  return axios.put(`${API_URL}/members/${id}`, member);
};

export const deleteMember = async (id) => {
  return axios.delete(`${API_URL}/members/${id}`);
};

// ** Loans API Calls **
export const getLoans = async () => {
  return axios.get(`${API_URL}/loans`);
};

export const getLoanById = async (id) => {
  return axios.get(`${API_URL}/loans/${id}`);
};

// ** Staff API Calls **
export const getStaff = async () => {
  return axios.get(`${API_URL}/staff`);
};

export const getStaffById = async (id) => {
  return axios.get(`${API_URL}/staff/${id}`);
};

export const createStaff = async (staff) => {
  return axios.post(`${API_URL}/staff`, staff);
};

export const updateStaff = async (id, staff) => {
  return axios.put(`${API_URL}/staff/${id}`, staff);
};

export const deleteStaff = async (id) => {
  return axios.delete(`${API_URL}/staff/${id}`);
};
