import { ICategory } from '../interfaces/category';
import instance from './instance';
const getAllCategory = () => {
    return instance.get('/categories')
}
const getOneCategory = (id: number | string) => {
    return instance.get(`/categories/${id}`)
}
const addCategory = (Category: ICategory) => {
    return instance.post('/categories', Category)
}
const deleteCategory = (id: number) => {
    return instance.delete(`/categories/${id}`)
}

export { getAllCategory, deleteCategory, addCategory, getOneCategory }