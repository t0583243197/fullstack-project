import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import { useGetAllProductsQuery, useDeleteProductsMutation, useUpdateProductsMutation } from './productApiSlice'
import { useAddProductToBasketMutation, useDeleteProductsFromBasketMutation, useUpdateProductsFromBasketMutation, useGetAllbasketQuery } from "../basket/basketApiSlice"
import ProductForm from './ProductForm';
import useAuth from '../auth/useAuth';
import { Dialog } from 'primereact/dialog';

const BasicDemo = () => {
    //useState
    const [layout, setLayout] = useState('grid');
    const [productId, setProductId] = useState();
    const [visibleForm, setVisibleForm] = useState(false);
    const [addOrUpdate, setaddOrUpdate] = useState("");
    const [visible, setVisible] = useState(false);
    const [product, setProduct] = useState({});

    const [updateProductId, setUpdateProductId] = useState(" ")
    //קריאות api
    const [deleteProduct, { isError, isSuccess, error, data }] = useDeleteProductsMutation()
    const [updateProduct, { isError1, isSuccess1, error1, data1 }] = useUpdateProductsMutation();
    const [addProductToBasket, { isError2, isSuccess2, error2, data2 }] = useAddProductToBasketMutation();

    const { data: products = [] } = useGetAllProductsQuery()
    //האם אתה מנהל?
    const roles = useAuth()[0].roles
    // console.log(roles);
    //ספריית עיצוב- בשביל חלונית נפתחת במחיקת מוצר
    const footerContent = (
        <div>
            <Button label="No" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
            <Button label="Yes" icon="pi pi-check" onClick={() => { handleDelete(productId); setVisible(false) }} autoFocus />
        </div>
    );
    //פונקציה עוטפת למחיקת מוצר
    const handleDelete = (id) => {
        deleteProduct(id)
    }
     useEffect(()=>{
        if(isError)
        alert(error.data);
    },[isError])
    const handleUpdate = (prod) => {
        setVisibleForm(true)
        setaddOrUpdate("update")
        setProduct(prod)
        setUpdateProductId(prod._id)
    }

    const handleAdd = () => {
        setVisibleForm(true)
        setaddOrUpdate("add")
        setUpdateProductId(" ")
    }

    const handleAddProductToBasket = (productId) => {
        const d = {
            productId
        }
        addProductToBasket(d)
    }

    const getSeverity = (product) => {
        switch (product.inventoryStatus) {
            case 'INSTOCK':
                return 'success';

            case 'LOWSTOCK':
                return 'warning';

            case 'OUTOFSTOCK':
                return 'danger';

            default:
                return null;
        }
    };
    const listItem = (product, index) => {
        return (
            // console.log("product", product),
            <div className="col-12" key={product.id}>
                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                    <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`http://localhost:1234/imeges/${product.image}`} alt={product.name} />
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{product.name}</div>
                            <Rating value={product.rating} readOnly cancel={false}></Rating>
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-tag"></i>
                                    <span className="font-semibold">{product.category}</span>
                                </span>
                                <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag>
                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <span className="text-2xl font-semibold">${product.price}</span>
                            <Button label="delete" icon="pi pi-trash" onClick={() => {
                                setVisible(true)
                                setProductId(product._id)
                            }} visible={roles === "Admin"} />

                            <Dialog header="Header" visible={visible} style={{ width: '50vw' }} onHide={() => { if (!visible) return; setVisible(false); }} footer={footerContent} >
                                <p className="m-0">
                                    Are you sure you want to delet tihs product? </p>
                            </Dialog>
                            <Button label="update_Product" icon="pi pi-pencil" onClick={() => handleUpdate(product)} visible={roles === "Admin"} />
                            <Button icon="pi pi-shopping-cart" className="p-button-rounded" disabled={product.inventoryStatus === 'OUTOFSTOCK'} visible={(roles === "Admin" || roles === "User")} onClick={() => handleAddProductToBasket(product._id)} ></Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
    const gridItem = (product) => {
        return (
            // console.log("product", product),
            <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2" key={product.id}>
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                        <div className="flex align-items-center gap-2">
                            <i className="pi pi-tag"></i>
                            <span className="font-semibold">{product.category}</span>
                        </div>
                        <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag>
                    </div>
                    <div className="flex flex-column align-items-center gap-3 py-5">
                        <img className="w-9 shadow-2 border-round" src={`http://localhost:1234/imeges/${product.image}`} alt={product.name} />
                        <div className="text-2xl font-bold">{product.name}</div>
                        <Rating value={product.rating} readOnly cancel={false}></Rating>
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        <span className="text-2xl font-semibold">${product.price}</span>
                        <Button label="delete" icon="pi pi-trash" onClick={() => {
                            setVisible(true)
                            setProductId(product._id)
                        }} visible={roles === "Admin"} />

                        <Dialog header="Header" visible={visible} style={{ width: '50vw' }} onHide={() => { if (!visible) return; setVisible(false); }} footer={footerContent} >
                            <p className="m-0">
                                Are you sure you want to delet tihs product? </p>
                        </Dialog>
                        <Button label="update_Product" icon="pi pi-pencil" onClick={() => handleUpdate(product)} visible={roles === "Admin"} />
                        <Button icon="pi pi-shopping-cart" className="p-button-rounded" disabled={product.inventoryStatus === 'OUTOFSTOCK'} visible={(roles === "Admin" || roles === "User")} onClick={() => handleAddProductToBasket(product._id)}></Button>
                    </div>
                </div>
            </div>
        );
    };
    const itemTemplate = (product, layout, index) => {
        if (!product) {
            return;
        }

        if (layout === 'list') return listItem(product, index);
        else if (layout === 'grid') return gridItem(product);
    };
    const listTemplate = (products, layout) => {
        return <div className="grid grid-nogutter">{products.map((product, index) => itemTemplate(product, layout, index))}</div>;
    };
    const header = () => {
        return (
            <div className="flex justify-content-end">
                <Button label="add_Product" icon="pi pi-user" onClick={() => handleAdd()} style={{ position: "absolute", left: "5%" }}
                    visible={roles === "Admin"} />

                <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
            </div>
        );
    }
    return (
        <>
            <div className="card">
                <DataView value={products} listTemplate={listTemplate} layout={layout} header={header()} />
            </div>
            {visibleForm && <ProductForm visible={visibleForm} setVisible={setVisibleForm} addOrUpdate={addOrUpdate} productId={updateProductId} product={product}></ProductForm>}</>
    )
}
export default BasicDemo