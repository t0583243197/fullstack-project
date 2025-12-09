
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { useAddProductsMutation,useUpdateProductsMutation } from "./productApiSlice";

const ProductForm = ({visible,setVisible,addOrUpdate, productId,product}) => {
//קריאת api להוספת מוצר
const [addProduct,{ isError1, isSuccess1, error1, data1 }] = useAddProductsMutation();

const [updateProduct, { isError, isSuccess, error, data }] = useUpdateProductsMutation();

//useState עבור שמירת הטופס
const [formData, setformData] = useState({
    barcode: product?.barcode??"",
    name: product?.name??"",
    price:product?.price??0,
    image:product?.image??"",
    description:product?.description??"",
    type:product?.type??"live",
    id:product?.id??"",
    })
//עדכון הטופס
const handleChange = (e) => {
    const { id, value } = e.target
    // console.log( id, value);

    setformData({
        ...formData,
        [id]: value
    })
 }

//מעדכן או מוסיף
 const handleAddOrupdate = async () => {
    // debugger
    if (!visible) return;
    setVisible(false);
    if(addOrUpdate==="add"){
     await addProduct(formData).unwrap(); 
    }
    else if(addOrUpdate==="update"){
        formData.id=productId
     await updateProduct(formData); 
    }
    }
    return (
        <> 
        {/* {console.log(product)} */}
            <div className="card flex justify-content-center">
                <Dialog
                    visible={visible}
                    modal
                    onHide={() => { if (!visible) return; setVisible(false); }}
                    content={({ hide }) => (
                        <div className="flex flex-column px-8 py-5 gap-4" style={{ borderRadius: '12px', backgroundImage: 'radial-gradient(circle at left top, var(--primary-400), var(--primary-700))' }}>

                            <div className="inline-flex flex-column gap-2">
                                <label htmlFor="barcode" className="text-primary-50 font-semibold">
                                    barcode
                                </label>
                                <InputText id="barcode" label="barcode" className="bg-white-alpha-20 border-none p-3 text-primary-50" required value={formData.barcode}onChange={(e) => handleChange(e)}></InputText>
                                <label htmlFor="name" className="text-primary-50 font-semibold">
                                    name
                                </label>
                                <InputText id="name" label="name" className="bg-white-alpha-20 border-none p-3 text-primary-50" type="name" required value={formData.name}onChange={(e) => handleChange(e)}></InputText>
                                <label htmlFor="description" className="text-primary-50 font-semibold">
                                    description
                                </label>
                                <InputText id="description" label="description" className="bg-white-alpha-20 border-none p-3 text-primary-50" required value={formData.description} onChange={(e) => handleChange(e)}></InputText>
                                <label htmlFor="type" className="text-primary-50 font-semibold">
                                    type
                                </label>
                                <InputText id="type" label="type" className="bg-white-alpha-20 border-none p-3 text-primary-50" required value={formData.type} onChange={(e) => handleChange(e)}></InputText>
                                <label htmlFor="image" className="text-primary-50 font-semibold">
                                    image
                                </label>
                                <InputText id="image" label="image" className="bg-white-alpha-20 border-none p-3 text-primary-50" required value={formData.image} onChange={(e) => handleChange(e)}></InputText>
                                <label htmlFor="price" className="text-primary-50 font-semibold">
                                    price
                                </label>
                                <InputText id="price" label="price" className="bg-white-alpha-20 border-none p-3 text-primary-50" required value={formData.price} onChange={(e) => handleChange(e)}></InputText>
                            </div>
                            <div className="flex align-items-center gap-2">
                                {/* //כפתור עבור הוספת המוצר */}
                                <Button label={addOrUpdate}  onClick={handleAddOrupdate}
                                 text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                                  {/* //כפתור עבור ביטול הוספת המוצר */}
                                <Button label="Cancel" onClick={(e) => hide(e)} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                            </div>
                        </div>
                    )}
                ></Dialog>
            </div>
       </>
    )
}
export default ProductForm
