import axios from "axios";

const BASE_URL = "http://localhost:5000/api/applications"; // Backend rotalarının temel URL'si

// Başvuru Ekleme
export const createApplication = async (data: any) => {
  try {
    const response = await axios.post(`${BASE_URL}`, data);
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || "Başvuru eklenirken bir hata oluştu.");
  }
};

// Başvuru Güncelleme
export const updateApplication = async (id: string, data: any) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || "Başvuru güncellenirken bir hata oluştu.");
  }
};

// Başvuru Listesi
export const getApplications = async (filter?: any) => {
  try {
    const query = filter ? `?${new URLSearchParams(filter).toString()}` : "";
    const response = await axios.get(`${BASE_URL}${query}`);
   console.log("respone.data services:", response.data)
    return response.data;
    
  } catch (error) {
    throw new Error(error?.response?.data?.message || "Başvurular alınırken bir hata oluştu.");
  }
};

// Başvuru Detayları
export const getApplicationById = async (id: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || "Başvuru detayları alınırken bir hata oluştu.");
  }
};

// Başvuru Silme
export const deleteApplication = async (id: string) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
    return { message: "Başvuru başarıyla silindi." };
  } catch (error) {
    throw new Error(error?.response?.data?.message || "Başvuru silinirken bir hata oluştu.");
  }
};

// Avukat Atama
export const assignLawyer = async (id: string, lawyerId: string) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}/assign-lawyer`, { lawyerId });
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || "Avukat atanırken bir hata oluştu.");
  }
};
