import React, { useEffect, useState } from 'react';
import Title from '../../extra/Title';
import { deleteProductColor, productShowGet, updateProduct } from '../../../redux/slice/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { baseURL } from '../../util/config';
import Table from '../../extra/Table';
import Input from '../../extra/Input';
import { isSkeleton } from '../../util/allSelector';
import Button from '../../extra/Button';
import ProductColorDialogue from './ProductColorDialogue';
import { openDialog } from '../../../redux/slice/dialogSlice';
import { warning } from '../../util/Alert';
import ToggleSwitch from '../../extra/ToggleSwitch';


const ProductShow = () => {
  const dispatch = useDispatch()
  const nevigate = useNavigate()
  const location = useLocation()
  const roleSkeleton = useSelector(isSkeleton);

  const { dialogue, dialogueType } = useSelector(
    (state) => state.dialogue
  );

  console.log("location", location);


  const [data, setData] = useState([]);
  const { productDetails } = useSelector((state) => state.product)

  useEffect(() => {
    dispatch(productShowGet(location.state))
  }, []);

  useEffect(() => {
    setData(productDetails)
  }, [productDetails]);

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handleDelete = (id) => {
    const data = warning();
    data
      .then((logouts) => {
        const yes = logouts.isConfirmed
        console.log("yes", yes);
        if (yes) {
          dispatch(deleteProductColor(id))
        }
      })
      .catch((err) => console.log(err));
  }

  const productTable = [
    {
      Header: "No",
      Cell: ({ index }) => (
        <span>{page * rowsPerPage + parseInt(index) + 1}</span>
      )
    },
    {
      Header: "color",
      width: "100px",
      Cell: ({ row }) => (
        <div className='colorRound' style={{ backgroundColor: row.color }}></div>
      )
    },
    { Header: "Stock", body: "stock", sorting: { type: "client" }, width: "100px" },
    {
      Header: "Product Image",
      body: "productImage",
      Cell: ({ row }) => (
        <span className='allProductColor'>
          {
            row.productImage.map((res) => {
              return (
                <div className="userProfile" style={{ height: "80px", width: "80px", overflow: "hidden" }}>
                  {/* <img src={baseURL + res} alt="image" height={`100%`} /> */}
                  <img src={res} alt="image" height={`100%`} />
                </div>

              )
            })
          }
        </span>
      ),
      width: "700px"
    },
    {
      Header: "Size",
      Cell: ({ row }) => (
        <div>{row.size?.toString()}</div>
      ),
      width: "150px"
    },
    {
      Header: "Out Of Stock",
      Cell: ({ row }) => (
        <ToggleSwitch value={row.outOfStock} onClick={() => dispatch(updateProduct({ productId: row._id, type: "inStock" }))} />
      ),
    },
    {
      Header: "New Collection",
      Cell: ({ row }) => (
        <ToggleSwitch value={row.newCollection} onClick={() => dispatch(updateProduct({ productId: row._id, type: "collection" }))} />
      ),
    },
    {
      Header: "Action",
      Cell: ({ row }) => (
        <span>
          <button
            className='bg-second text-light m15-right p10-x p7-y fs-14'
            onClick={() => dispatch(openDialog({ type: "productColor", data: row }))}
          ><i class="ri-edit-2-line"></i></button>
          <button className='bg-danger  text-light p10-x p7-y fs-14' onClick={() => handleDelete(row._id)}><i class="ri-delete-bin-line"></i></button>
        </span>
      ),
    }
  ];


  const addThisNewData = () => {
    nevigate("/admin/product/addProduct", { state: data[0] })
  }


  console.log("data", data);

  return (
    <div>
      <Title name={"Product Show"} />

      <div className="productShowColorDetails">
        {
          roleSkeleton ? (<div className="skeleton" style={{ minHeight: "150px" }}></div>) : (<div className="row">
            <div className="col-12">
              <div className="productTitle productDefault">
                <span>Title : </span>
                <span>{data[0]?.title}</span>
              </div>
            </div>
            <div className="col-6">
              <div className="productFebric productDefault">
                <span>Febric : </span>
                <span>{data[0]?.febric}</span>
              </div>
            </div>
            <div className="col-6">
              <div className="productShipping productDefault">
                <span>Shipping : </span>
                <span>₹{data[0]?.shippingCharge}</span>
              </div>
            </div>
            <div className="col-6">
              <div className="productPrice productDefault">
                <span>Price : </span>
                <span> <del className='text-gray'>₹{data[0]?.oldPrice}</del> ₹{data[0]?.price}</span>
              </div>
            </div>
            <div className="col-6">
              <div className="productDiscount productDefault">
                <span>Discount : </span>
                <span>{data[0]?.discount}%</span>
              </div>
            </div>

          </div>)
        }


      </div>

      <Table
        data={data}
        mapData={productTable}
      />


      <Button className={`bg-success text-light m20-top`} text={`Add More Color`} type={`button`} onClick={() => addThisNewData()} />

      {dialogue && dialogueType === "productColor" && (
        <ProductColorDialogue setData={setData} data={data} />
      )}

    </div>
  );
}

export default ProductShow;
