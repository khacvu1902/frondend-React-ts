import { useEffect, useState } from 'react'
import { Route } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import { createProduct, removeProduct, getProducts, updateProduct } from './api/product'
import HomePage from './pages/HomePage'
import ProductDetailPage from './pages/ProductDetailPage'
import ProductsPage from './pages/ProductsPage'
import AddProduct from './pages/admin/AddProduct'
import ProductManagement from './pages/admin/ProductManagement'
import AdminLayout from './pages/layout/AdminLayout'
import { IProduct } from './interfaces/Product'
import { ICategory } from './interfaces/category'
import UpdateProductPage from './pages/admin/UpdateProduct'
import { getAllCategory } from './api/category'
import CategoriesProductPage from './pages/CategoriesPage'
import Signin from './pages/signin'
import Dashboard from './pages/admin/Dashboard'
import { upload } from "./api/upload";
import Signup from "./pages/signup";
function App() {
  const [products, setProducts] = useState<IProduct[]>([])
  const [categories, setCategories] = useState<ICategory[]>([])
  useEffect(() => {
    (async () => {
      const { data } = await getProducts();
      setProducts(data.data);
    })()
  }, [])
  useEffect(() => {
    (async () => {
      const { data } = await getAllCategory();
      setCategories(data.data);
    })()
  }, [])
  const onHandleRemove = async (id: number | string) => {
    try {
      await removeProduct(id);
      setProducts(products.filter((item) => item._id != id));
    } catch (error) {
    }
  }
  const onHandleAdd = async (product: IProduct) => {
    try {
      const formData = new FormData();
      formData.append("files", product.img[0]);
      const result = await upload(formData);
      createProduct({
        ...product,
        img: result.data.urls[0].url,
      })?.then((res) => setProducts([...products, res.data.product]));
    } catch (error) {

    }
  }
  const onHandleUpdate = async (product: IProduct) => {
    try {
      await updateProduct(product)
    } catch (error) {

    }
  }
  return (
    <div className="App">
      <Routes>
        <Route path='/' >
          <Route index element={<HomePage categories={categories} />} />
          <Route path='products' >
            <Route index element={<ProductsPage products={products} categories={categories} />} />
            <Route path=':id' element={<ProductDetailPage />} />
          </Route>
          <Route path='categories'>
            <Route path=':id' element={<CategoriesProductPage categories={categories} />} />
          </Route>
          <Route path='login' element={<Signin />} />
          <Route path='signup' element={<Signup />} />
        </Route>
        <Route path='/admin' element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path='products'>
            <Route index element={<ProductManagement products={products} onRemove={onHandleRemove} />} />
            <Route path='add' element={<AddProduct onAdd={onHandleAdd} categories={categories} />} />
            <Route path=':id/update' element={<UpdateProductPage onUpdate={onHandleUpdate} products={products} />} />
          </Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
