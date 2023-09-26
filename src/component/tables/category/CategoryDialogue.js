import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../extra/Input";
import Button from "../../extra/Button";
import { editData, objectToFormData, submitData } from "../../util/fuction";
import { closeDialog } from "../../../redux/slice/dialogSlice";
import { categoryAdd, categoryUpdate } from "../../../redux/slice/categorySlice";

const CategoryDialogue = ({ data, setData }) => {

  const { dialogueData } = useSelector(
    (state) => state.dialogue
  );

  useEffect(() => {
    if (dialogueData) {
      editData(dialogueData);
    }
  }, [dialogueData]);


  const handleSubmit = async (e) => {
    const addCategory = submitData(e);
    if (addCategory) {

      console.log("addCategory", addCategory);
      const formData = objectToFormData(addCategory);

      try {
        let response
        if (dialogueData) {
          const payload = { formData, categoryId: dialogueData._id }
          response = await dispatch(categoryUpdate(payload)).unwrap();
        } else {
          response = await dispatch(categoryAdd(formData)).unwrap();
        }
        console.log(response.status, "response.data.status");
        response.status ? dispatch(closeDialog()) : alert(response.message);
      } catch (err) {
        console.log("err", err);
        alert(err.message)
      }
    }

  };

  const dispatch = useDispatch();
  return (
    <div className="dialog">

      <div className="w-100">
        <div className="row justify-content-center">
          <div className="col-xl-5 col-md-8 col-11">
            <div className="mainDiaogBox">
              <div className="row justify-content-between align-items-center formHead">
                <div className="col-8">
                  <h2 className="text-second m0">Category Dialog</h2>
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
              <form onSubmit={handleSubmit} id="categoryForm">
                <div className="row align-items-start formBody">
                  <div className="col-12">
                    <Input
                      type={`text`}
                      id={`categoryName`}
                      name={`categoryName`}
                      label={`Category Name`}
                      placeholder={`Category Name`}
                      errorMessage={`Enter Category Name`}
                    />
                  </div>
                  <div className="col-12">
                    <Input
                      type={`file`}
                      id={`image`}
                      name={`image`}
                      label={`Image`}
                      errorMessage={`Enter Image`}
                    />
                  </div>
                </div>
                <div className="row m20-top formFooter">
                  <div className="col-12 text-end m0">
                    <Button className={`bg-gray text-light`} text={`Cancel`} type={`button`} onClick={() => dispatch(closeDialog())} />
                    <Button
                      type={`submit`}
                      className={`bg-second text-light m10-left`}
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
  );
};

export default CategoryDialogue;
