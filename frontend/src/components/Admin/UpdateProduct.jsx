import {
  FormControl,
  HStack,
  Image,
  Input,
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetail } from "../../Actions/ProductDetailAction";
import { updateProductAdmin } from "../../Actions/ProductAction";

const UpdateProduct = () => {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });

  const [imagePreview, setImagePreview] = useState([]);
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const {
    productDetail: { product },
    isLoading,
  } = useSelector((state) => state.productDetail);
  const { isUpdate } = useSelector((state) => state.updateProduct);
  console.log("is update", isUpdate);

  const categories = [
    "Laptop",
    "Sports",
    "T-shirt",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

  const changeHandler = (event) => {
    const { name, value } = event.target;
    if (name === "images") {
      const files = Array.from(event.target.files);

      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setImages((prevData) => [...prevData, reader.result]);
            setImagePreview((prevData) => [...prevData, reader.result]);
          }
        };
        reader.readAsDataURL(file);
      });
    } else {
      setProductData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const finalProductData = {
      name: productData.name,
      description: productData.description,
      price: productData.price,
      category: productData.category,
      stock: productData.stock,
      images: images,
    };
    console.log(finalProductData);
    dispatch(updateProductAdmin(id, finalProductData));
    navigate('/admin/products');
  };

  useEffect(() => {
    if (!product || product._id !== id) {
      dispatch(fetchProductDetail(id));
    }
    if (product) {
      setProductData({
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        stock: product.stock,
      });
    }
  }, [id, dispatch, isLoading]);

  return (
    <HStack>
      {/* {isUpdate ? toast("Product Update successfully") : <></>} */}
      <VStack
        w={"full"}
        h={"100vh"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <form onSubmit={submitHandler}>
          <FormControl>
            <VStack gap={5}>
              <Input
                type="text"
                placeholder={"Product Name"}
                name="name"
                value={productData.name}
                onChange={changeHandler}
              />

              <Input
                type="number"
                placeholder={"Product price"}
                name="price"
                value={productData.price}
                onChange={changeHandler}
              />

              <Textarea
                placeholder={"Product Description"}
                name="description"
                value={productData.description}
                onChange={changeHandler}
              />

              <Select
                placeholder="Select Categories"
                name="category"
                value={productData.category}
                onChange={changeHandler}
              >
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </Select>

              <Input
                type="number"
                placeholder="Product Stock"
                name="stock"
                value={productData.stock}
                onChange={changeHandler}
              />

              <Input
                type="file"
                multiple
                name="images"
                accept="image/*"
                className="custom-file-input"
                onChange={changeHandler}
              />
              <HStack>
                {imagePreview &&
                  imagePreview.map((image, index) => (
                    <Image key={index} src={image} width={"3rem"} />
                  ))}
              </HStack>
              <HStack>
                {product &&
                  product.images.map((image, index) => (
                    <Image key={index} src={image.url} width={"3rem"} />
                  ))}
              </HStack>
            </VStack>
          </FormControl>
          <button className="btn">Update</button>
        </form>
      </VStack>
    </HStack>
  );
};

export default UpdateProduct;
