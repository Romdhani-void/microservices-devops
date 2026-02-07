import { useState, useEffect } from 'react'
import './index.css'

function App() {
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)

  // Fetch products on load
  useEffect(() => {
    fetch('http://localhost:3001/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Error fetching products:', err))
  }, [])

  // Fetch orders on load (optional, just to show we can)
  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = () => {
    fetch('http://localhost:3002/orders')
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(err => console.error('Error fetching orders:', err))
  }

  const handleBuy = (productId) => {
    setLoading(true)
    fetch('http://localhost:3002/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, quantity: 1 })
    })
    .then(res => res.json())
    .then(data => {
        alert(`Order placed! Order ID: ${data.id}`)
        fetchOrders() // Refresh orders
    })
    .catch(err => alert('Failed to place order'))
    .finally(() => setLoading(false))
  }

  return (
    <>
      <h1>MicroShop</h1>
      <div className="card">
        <h2>Products</h2>
        <div className="product-grid">
            {products.length === 0 ? <p>No products found (Is backend running?)</p> : null}
            {products.map(p => (
                <div key={p.id} className="product-card">
                    <h3>{p.name}</h3>
                    <p>${p.price}</p>
                    <button onClick={() => handleBuy(p.id)} disabled={loading}>
                        {loading ? 'Processing...' : 'Buy Now'}
                    </button>
                </div>
            ))}
        </div>
      </div>

      <div className="card">
        <h2>Your Orders</h2>
        {orders.length === 0 ? <p>No orders yet.</p> : (
            <ul>
                {orders.map(o => (
                    <li key={o.id} style={{textAlign: 'left'}}>
                        Order #{o.id} - Product {o.product_id} (Qty: {o.quantity})
                    </li>
                ))}
            </ul>
        )}
      </div>
    </>
  )
}

export default App
