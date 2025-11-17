import React, { useEffect, useState } from 'react'
import { getCustomers, createCustomer, deleteCustomer } from '../services/api'

type Customer = {
  id: string
  name: string
  email: string
  status: boolean
}

export default function CustomerList(){
  const [customers, setCustomers] = useState<Customer[]>([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  async function load(){
    setLoading(true)
    try{
      const data = await getCustomers()
      setCustomers(data)
    }catch(err){
      console.error(err)
      alert('Erro ao buscar clientes (veja o console)')
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{ load() }, [])

  async function handleAdd(e: React.FormEvent){
    e.preventDefault()
    if(!name || !email) return alert('Preencha nome e email')
    try{
      const newCustomer = await createCustomer({ name, email })
      setCustomers(prev => [newCustomer, ...prev])
      setName('')
      setEmail('')
    }catch(err){
      console.error(err)
      alert('Erro ao criar cliente')
    }
  }

  async function handleDelete(id: string){
    if(!confirm('Remover cliente?')) return
    try{
      await deleteCustomer(id)
      setCustomers(prev => prev.filter(c => c.id !== id))
    }catch(err){
      console.error(err)
      alert('Erro ao remover cliente')
    }
  }

  return (
    <div>
      <form onSubmit={handleAdd} className="form-row">
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Nome" />
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" type="email" />
        <button type="submit">Adicionar</button>
      </form>

      <div className="customer-list">
        {loading ? <p>Carregando...</p> : (
          customers.length === 0 ? <p>Nenhum cliente</p> : (
            customers.map(c => (
              <div className="customer-item" key={c.id}>
                <div>
                  <strong>{c.name}</strong>
                  <div style={{fontSize:12}}>{c.email}</div>
                </div>
                <div>
                  <button onClick={()=>handleDelete(c.id)}>Remover</button>
                </div>
              </div>
            ))
          )
        )}
      </div>
    </div>
  )
}
