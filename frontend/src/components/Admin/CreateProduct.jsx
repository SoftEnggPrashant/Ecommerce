import {
  FormControl,
  HStack,
  Image,
  Input,
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateProduct = () => {
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

  const categories = [
    "Laptop",
    "Sports",
    "T-shirt",
    "Footwear",
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

  const createProduct = async (productData) => {
    console.log("insite the create product function", productData);
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/admin/products/new",
        productData,
        { withCredentials: true }
      );
      console.log(data);
      toast.success('Product created');
      navigate('/admin/products');
    } catch (error) {
      console.log(error);
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
    createProduct(finalProductData);
  };

  return (
    <HStack>
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
            </VStack>
          </FormControl>
          <button className="btn">Create</button>
        </form>
      </VStack>
    </HStack>
  );
};

export default CreateProduct;
