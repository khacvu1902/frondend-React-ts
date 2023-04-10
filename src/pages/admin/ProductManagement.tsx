import React from 'react'
import { IProduct } from '../../interfaces/Product'
import { ICategory } from '../../interfaces/category'
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';




type Props = {
    products: IProduct[],
    onRemove: (id: number | string) => void
}

const ProductManagerment = ({ products, onRemove }: Props) => {
    const columns: ColumnsType<IProduct> = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: (text) => <a>{text}</a>,
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "Image",
            dataIndex: "img",
            key: "img",
            render: (url) => (
                <img src={url} className="w-[50px] h-auto rounded-xl"></img>
            ),
        },
        {
            title: "Action",
            key: "action",
            render: (record) => (
                <Space size="middle">
                    <button onClick={() => onRemove(record._id)}>Delete</button>
                    <Link to={`/admin/products/${record._id}/update`}>
                        <button>Update</button>
                    </Link>
                </Space>
            ),
        },
    ];
    return <Table columns={columns} dataSource={products} pagination={{ pageSize: 5 }} />
}

export default ProductManagerment