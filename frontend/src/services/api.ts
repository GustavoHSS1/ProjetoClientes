import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3333'
})

export async function getCustomers(){
  const res = await api.get('/customer')
  return res.data
}

export async function createCustomer(payload:{ name: string; email: string }){
  const res = await api.post('/customer', payload)
  return res.data
}

export async function deleteCustomer(id: string){
  const res = await api.delete(`/customer/${id}`)
  return res.data
}

export default api
