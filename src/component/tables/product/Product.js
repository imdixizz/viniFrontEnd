import React, { useEffect, useState } from 'react';
import Title from '../../extra/Title';
import Table from '../../extra/Table';
import { useDispatch, useSelector } from 'react-redux';
import { bannerDelete } from '../../../redux/slice/bannerSlice';
import { baseURL } from '../../util/config';
import Pagination from '../../extra/Pagination';
import Searching from '../../extra/Searching';
import Button from '../../extra/Button';
import { openDialog } from '../../../redux/slice/dialogSlice';
import { warning } from '../../util/Alert';
import ProductDetailsDialogue from './ProductDetailsDialogue';
import { useNavigate } from 'react-router-dom';
import { deleteProduct, deleteProductColor, productGet } from '../../../redux/slice/productSlice';

const Product = () => {
  const dispatch = useDispatch()
  const nevigate = useNavigate()

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const { dialogue, dialogueType } = useSelector(
    (state) => state.dialogue
  );
  const [data, setData] = useState([]);

  const { product, productCount } = useSelector((state) => state.product)

  const [search, setSearch] = useState("");
  const handleFilterData = (filteredData) => {
    if (typeof filteredData === "string") {
      setSearch(filteredData);
    } else {
      setData(filteredData);
    }
  };



  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState(0);
  const handleChildValue = (value) => {
    setSortOrder(sortOrder === 0 ? 1 : 0);
    setSortField(value);
  };

  const payload = {
    page,
    limit: rowsPerPage,
    search,
    sortField,
    sortOrder
  }
    // Server Get
  useEffect(() => {
    dispatch(productGet({ ...payload, command: false }))
  }, [page, rowsPerPage, search, sortField, sortOrder]);

  // normal Get

  useEffect(() => {
    dispatch(productGet({ ...payload, command: true }))
  }, []);

  useEffect(() => {
    setData(product)
  }, [product]);


  const handleMove = (id) => {
    console.log("id", id);
    nevigate("/admin/product/productShow", { state: id })
  }


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event, 10));
    setPage(0);
  };



  const handleDelete = (id) => {
    const data = warning();
    data
      .then((logouts) => {
        const yes = logouts.isConfirmed
        console.log("yes", yes);
        if (yes) {
          dispatch(deleteProduct(id))
        }
      })
      .catch((err) => console.log(err));
  }


  const productTable = [
    {
      Header: "No",
      body: "No",
      Cell: ({ index }) => (
        <span>{page * rowsPerPage + parseInt(index) + 1}</span>
      )
    },
    { Header: "Product Code", body: "productCode", sorting: { type: "server" } },
    {
      Header: "Product Image",
      body: "productImage",
      Cell: ({ row }) => (
        <div className="userProfile" style={{ height: "80px", width: "80px", overflow: "hidden" }}>
          {/* <img src={baseURL + row.productImage[0]} alt="image" height={`100%`} /> */}
          <img src={row.productImage[0]} alt="image" height={`100%`} />
        </div>
      ),
    },
    { Header: "Title", body: "title", sorting: { type: "server" } },
    { Header: "Febric", body: "febric", sorting: { type: "server" } },
    { Header: "Category", body: "categoryName", sorting: { type: "server" } },
    {
      Header: "Old Price",
      body: "oldPrice",
      Cell: ({ row }) => (
        <span>₹{row.oldPrice}</span>
      ),
      sorting: { type: "server" }
    },
    {
      Header: "Price",
      body: "price",
      Cell: ({ row }) => (
        <span>₹{row.price}</span>
      ),
      sorting: { type: "server" }
    },
    {
      Header: "Discount",
      body: "discount",
      Cell: ({ row }) => (
        <span>{row.discount}%</span>
      ),
      sorting: { type: "server" }
    },
    {
      Header: "Shipping",
      body: "shippingCharge",
      Cell: ({ row }) => (
        <span>₹{row.shippingCharge}</span>
      ),
      sorting: { type: "server" }
    },
    {
      Header: "Action",
      Cell: ({ row }) => (
        <span>
          <button className='bg-primary m15-right text-light p10-x p7-y fs-14 position-relative' onClick={() => handleMove(row._id)}>
            <span className='notiCount bg-danger'>{row.totalProduct}</span>
            <i class="ri-information-line"></i>
          </button>
          <button
            type='button'
            className='bg-second text-light m15-right p10-x p7-y fs-14'
            onClick={() => dispatch(openDialog({ type: "product", data: row }))}
          ><i class="ri-edit-2-line"></i></button>
          <button className='bg-danger  text-light p10-x p7-y fs-14' onClick={() => handleDelete(row._id)}><i class="ri-delete-bin-line"></i></button>
        </span>
      ),
    }


  ];

  const navigation = useNavigate()

  return (
    <div>
      <Title name={"Product"} />

      <div className='bg-light p15'>
        <div className="row justify-content-between align-items-center">
          <div className="col-2 m0">
            <Button className={`bg-second text-light`} text={`ADD`} bIcon={`ri-add-line`}
              onClick={() => {
                navigation("/admin/product/addProduct")
              }}
            />
          </div>
          <div className="col-md-5 col-smm-6 col-7 m0 ">
            <Searching
              type={`server`}
              data={product}
              setData={setData}
              column={productTable}
              serverSearching={handleFilterData}
            />
          </div>
        </div>
      </div>
      <Table
        data={data}
        mapData={productTable}
        serverPerPage={rowsPerPage}
        Page={page}
        onChildValue={handleChildValue}
      />
      <Pagination
        type={"server"}
        serverPage={page}
        setServerPage={setPage}
        serverPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        totalData={productCount}
      />


      {dialogue && dialogueType === "product" && (
        <ProductDetailsDialogue setData={setData} data={data} />
      )}
    </div>
  );
}

export default Product;
