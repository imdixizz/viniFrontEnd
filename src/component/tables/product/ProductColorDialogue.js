import React, { useEffect, useState } from 'react';
import Title from '../../extra/Title';
import { useDispatch, useSelector } from 'react-redux';
import { editData, generateNum, objectToFormData, submitData } from '../../util/fuction';
import { categoryGet } from '../../../redux/slice/categorySlice';
import { attributesGet } from '../../../redux/slice/attributesSlice';
import Input, { Image, MultiSelect, Select } from '../../extra/Input';
import Button from '../../extra/Button';
import { editProductColor, productAdd } from '../../../redux/slice/productSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { closeDialog } from '../../../redux/slice/dialogSlice';

const ProductColorDialogue = () => {
  const dispatch = useDispatch()

  const { dialogueData } = useSelector(
    (state) => state.dialogue
  );


  const { attributes } = useSelector(
    (state) => state.attributes
  );
  useEffect(() => {
    dispatch(attributesGet())
  }, []);


  useEffect(() => {
    if (dialogueData) {
      editData(dialogueData);
    }
  }, [dialogueData]);



  const handleSubmit = async (e) => {
    const addProduct = submitData(e);
    console.log("addProduct", addProduct);


    if (addProduct) {

      // const formData = objectToFormData(addProduct);
      const formData = new FormData();
      formData.append("size", addProduct.size);
      formData.append("stock", addProduct.stock);
      formData.append("outOfStock", addProduct.outOfStock);
      for (let i = 0; i < addProduct.productImage.length; i++) {
        formData.append("productImage", addProduct.productImage[i]);
      }

      console.log("addProduct-formData", formData);
      const payload = { formData, productId: dialogueData._id }

      try {
        if (formData) {
          let response = await dispatch(editProductColor(payload)).unwrap();
          console.log(response.status, "response.data.status");
          if (response.status) {
            dispatch(closeDialog())
          } else {
            alert(response.message);
          }
        }
      } catch (err) {
        console.log("err", err);
        alert(err.message)
      }
    }

  };


  const attributeNames = ["Color", "Size"];
  const [colorData, sizeData] = attributeNames.map(attrName =>
    attributes.find(obj => obj["attrName"] === attrName)
  );



  return (
    <div className="dialog">

      <div className="w-100">
        <div className="row justify-content-center">
          <div className="col-xl-7 col-11 m0">
            <div className="mainDiaogBox">
              <div className="row justify-content-between align-items-center formHead">
                <div className="col-8">
                  <h2 className="text-second m0">Product Dialog</h2>
                </div>
                <div className="col-4">
                  <div
                    className="closeButton"
                    onClick={() => {
                      dispatch(closeDialog());
                    }}
                  >
                    <i className="ri-close-line"></i>
                  </div>
                </div>
              </div>
              <div className="mainAddProduct">

                <form onSubmit={handleSubmit} id="productColorForm" className='position-relative p10-x'>

                  <div className="col-12 mainMultiSelector" id='mainMultiSelector'>
                    <div className="row align-items-start formBody">

                      <div className="col-md-4 col-8">
                        <Input
                          className={`p0`}
                          id={`color`}
                          name={`color`}
                          label={`Color`}
                          type={`color`}
                          placeholder={`Select Color`}
                          errorMessage={`Select Color`}
                        />
                      </div>
                      <div className="col-md-2 col-4">
                        <Input
                          id={`stock`}
                          name={`stock`}
                          label={`Stock`}
                          type={`text`}
                          placeholder={`Select Stock`}
                          errorMessage={`Select Stock`}
                        />
                      </div>
                      <div className="col-md-6 col-12">

                        <MultiSelect
                          options={sizeData?.details}
                          className={`inputSelect`}
                          id={`size`}
                          name={`size`}
                          label={`Size`}
                          placeholder={`Select Size`}
                          errorMessage={`Select Size`}
                        />
                      </div>
                      <div className="col-12">
                        <Image
                          id={`productImage`}
                          name={`productImage`}
                          label={`Product Image`}
                          errorMessage={`Enter Product Image`}
                          multiple={true}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row formFooter">
                    <div className="col-6 text-center m0">
                      <Button className={`bg-gray text-light w-100`} text={`Cancel`} type={`button`} />
                    </div>
                    <div className="col-6 text-center m0">
                      <Button
                        type={`submit`}
                        className={`bg-second text-light w-100`}
                        text={`Submit`}
                      />
                    </div>
                  </div>
                </form>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default ProductColorDialogue;
