"use client";
import React, { useState, useRef } from "react";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { storage, db } from "../../../../firebaseConfig";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
import "react-advanced-cropper/dist/style.css";
import Cropper from "react-easy-crop";
import getCroppedImg from "./getCroppedImage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
const productId = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [initialProduct, setInitialProduct] = useState({
    id: "",
    productName: "",
    price: "",
    department: "",
    image: "",
    productDescription: "",
  });
  const [product, setProduct] = useState({
    id: "",
    productName: "",
    price: "",
    department: "",
    image: "",
    productDescription: "",
  });
  const [isAdmin, toggleIsAdmin] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  // department, id, image, price, productDescription, productName
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedImage, setCroppedImage] = useState(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [showButton, toggleShowButton]= useState("choose");

  async function convertBlobToFile(blobUrl, fileName) {
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    return new File([blob], fileName, { type: blob.type });
  }
  async function uploadFileToFirebaseStorage(file) {
    const storageRef = ref(storage, `images/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  }

  async function handleUpload(blobUrl) {
    if (!image) {
      alert("Please select an image to upload");
      return;
    }
    try {
      const file = await convertBlobToFile(blobUrl, product.productName);
      const downloadURL = await uploadFileToFirebaseStorage(file);
      let oldProduct = product;
      oldProduct.image = downloadURL;
      setProduct(oldProduct);
      setImage(null);
      console.log("File uploaded and URL saved successfully:", downloadURL);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  }

  const handleImageChange = (e) => {
    toggleShowButton("upload")
    if (e.target.files[0]) {
      let value = URL.createObjectURL(e.target.files[0]);
      setImage(value);
    }
  };

  const handleSubmit = (e, isAdmin, productDetails) => {
    e.preventDefault();
    if (isAdmin) {
      handleSaveChanges(productDetails);
    } else {
      handleSaveForReview(productDetails);
    }
  };

  const handleSaveChanges = async (product) => {
    if (areProductsEqual(product, initialProduct)) {
      toast.error("Make some changes to the values first!");
      return;
    }
    console.log("handleSaveChanges called", product);

    const response = await fetch(`/api/changeProductDetails`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product: product,
      }),
    });
    const json = await response.json();
    console.log(json);
    const statusCode = response.status;

    console.log(json.status);
    if (statusCode === 201) {
      toast.success("Item added for review!");
      router.push("/dashboard");
    } else if (statusCode === 400) {
      toast.error(json.error);
    } else {
      toast.error("Failed to add the item!");
    }
  };

  const areProductsEqual = (product1, product2) => {
    const keys1 = Object.keys(product1);
    const keys2 = Object.keys(product2);

    // Check if both objects have the same number of keys
    if (keys1.length !== keys2.length) {
      return false;
    }

    // Check if all keys and values are the same in both objects
    for (let key of keys1) {
      if (product1[key] !== product2[key]) {
        return false;
      }
    }

    return true;
  };

  const handleSaveForReview = async (product) => {
    if (areProductsEqual(product, initialProduct)) {
      toast.error("Make some changes to the values first!");
      return;
    }
    console.log("handleSaveForReview called", userEmail);
    const response = await fetch(`/api/productForReview`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userEmail: userEmail,
        adminEmail: null,
        status: "pending",
        productDetails: product,
      }),
    });
    const json = await response.json();
    console.log(json);
    const statusCode = response.status;

    console.log(json.status);
    if (statusCode === 201) {
      toast.success("Item added for review!");
      router.push("/dashboard");
    } else if (statusCode === 400) {
      toast.error(json.error);
    } else {
      toast.error("Failed to add the item!");
    }
  };

  const onChange = (e) => {
    console.log(e.target.name, e.target.value);
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  const src = product.image;

  useEffect(() => {
    const productString = searchParams.get("product");
    let decodedProduct = null;
    if (productString) {
      try {
        decodedProduct = JSON.parse(decodeURIComponent(productString));
        console.log(decodedProduct.productName);
        console.log(decodedProduct.image);
        decodedProduct.image = decodedProduct.image.replace(
          "images/",
          "images%2F"
        );
        console.log(decodedProduct.image);
        setInitialProduct(decodedProduct);
        setProduct(decodedProduct);
      } catch (e) {
        console.error("Error parsing product data:", e);
      }
    }
  }, []);
  useEffect(() => {
    let authStorageToken = localStorage.getItem("authStorageToken");
    const decodedData = jwtDecode(authStorageToken);
    toggleIsAdmin(decodedData.user.isAdmin);
    if (decodedData.user.isAdmin) {
      setAdminEmail(decodedData.user.email);
    } else {
      setUserEmail(decodedData.user.email);
    }
  }, []);
  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };
  const showCroppedImage = async () => {
    try {
      const croppedImage = await getCroppedImg(
        image,
        croppedAreaPixels,
        rotation
      );
      console.log("donee", { croppedImage });
      setCroppedImage(croppedImage);
      handleUpload(croppedImage);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      {image && (
        <>
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={4 / 3}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
          <button
            onClick={showCroppedImage}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 bottom-36 bg-black px-4 py-2 rounded-md left-1/2"
          >
            Upload
          </button>
        </>
      )}
      <div className="p-5 m-5 grid justify-center ">
        <ToastContainer />
        <form className="grid justify-center bg-white rounded-xl p-10 ">
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="font-semibold leading-7 text-gray-900 text-3xl ">
                Product details
              </h2>
              <div className="mt-1 text-sm leading-6 text-gray-600">
                {isAdmin ? (
                  <p> You can directly edit these items as you are admin. </p>
                ) : (
                  <p>
                    An admin will approve any changes done to this product.{" "}
                  </p>
                )}
              </div>

              <div className="mt-10 flex flex-row ">
                <div className="col-span-full flex flex-col ">
                  <div className="mt-2 flex flex-col items-center gap-x-3">
                    <div className="max-w-[200px] overflow-hidden h-auto mr-4">
                      <img src={product.image} alt="product" />
                    </div>
                    <div className="flex flex-col mt-4 justify-center items-center ">
                      <div>
                        <label className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                          Choose Image
                          <input type="file" className="hidden" onChange={handleImageChange}/>
                        </label>
                      </div>
                      {/* <div>
                        <button
                          onClick={handleUpload}
                          disabled={uploading}
                          className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                          {uploading ? "Uploading..." : "Upload Image"}
                        </button>
                      </div> */}
                      {progress > 0 && <progress value={progress} max="100" />}
                    </div>
                  </div>
                </div>
                <div className=" grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="productName"
                      className="block text-xl font-medium leading-6 text-gray-900"
                    >
                      Name
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input
                          id="productname"
                          name="productName"
                          type="text"
                          value={product.productName}
                          onChange={onChange}
                          className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="price"
                      className="block text-xl font-medium leading-6 text-gray-900"
                    >
                      Price (in dollars)
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input
                          id="price"
                          name="price"
                          type="number"
                          value={product.price}
                          onChange={onChange}
                          className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="price"
                      className="block text-xl font-medium leading-6 text-gray-900"
                    >
                      Department
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input
                          id="department"
                          name="department"
                          type="text"
                          value={product.department}
                          onChange={onChange}
                          className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="productDescription"
                      className="block text-xl font-medium leading-6 text-gray-900"
                    >
                      About
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="productDescription"
                        name="productDescription"
                        value={product.productDescription}
                        onChange={onChange}
                        rows={3}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {/* <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p> */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-x-6">
            <button
              type="button"
              className="text-xl font-semibold leading-6 text-gray-900"
              onClick={() => router.push("/dashboard")}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-xl font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={(e) => handleSubmit(e, isAdmin, product)}
            >
              {isAdmin ? (
                <span>Save changes as admin</span>
              ) : (
                <span>Save changes for review</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default productId;
