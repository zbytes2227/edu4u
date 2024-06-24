"use client"
import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation'


const Page = () => {
  const searchParams = useSearchParams();

  const search = searchParams.get('id')
  const [ProductID, setProductID] = useState(search);
  const [ProductName, setProductName] = useState("");
  const [ProductBranch, setProductBranch] = useState("CSE")
  const [ProductSemester, setProductSemester] = useState("1")
  const [ProductLink, setProductLink] = useState("")


  const [msg, setmsg] = useState("")

  const postData = {
    productid: ProductID,
  };
  useEffect(() => {
    auth();
    fetch("/api/getProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    }).then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log(data.Product);
          setProductName(data.Product.ProductName)
          setProductLink(data.Product.ProductLink)
          setProductSemester(data.Product.ProductSemester)
          setProductBranch(data.Product.ProductBranch)
        } else {
          console.error("API request failed");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);


  function updateDetails() {
    fetch("/api/editProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ProductID: ProductID, ProductName: ProductName, ProductSemester:ProductSemester, ProductBranch:ProductBranch,ProductLink:ProductLink }),
    }).then((response) => response.json())
      .then((data) => {
        setmsg(data.msg)
        if (data.success) {
          console.log(data);
          setTimeout(() => {
            window.location.href = "/admin/products"; // Replace "/your-target-page" with the actual target page URL
          }, 1000);
        } else {
          console.error("API request failed");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  const router = useRouter();
  async function auth() {
    const fetch_api = await fetch("/api/auth/", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await fetch_api.json();
    if (!data.success) {
      router.push("/login");
    }
  };

  return (
    <>
      <div className="mt-20">
        <h2 className="mb-5 text-2xl font-bold text-center">
          Edit Product Details
        </h2>
      </div>
      <div class="max-w-sm mx-auto border border-3 rounded-lg p-5">
        {!msg ? ("") : (<div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50" role="alert">
          {msg}
        </div>)}
        <div class="mb-5">
          <label for="status" class="block mb-2 text-sm font-medium text-gray-900">Select Branch</label>
          <select value={ProductBranch} onChange={(e) => setProductBranch(e.target.value)} name="status" id="status" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required>
            <option value="CSE">Computer Science & Engineering</option>
            <option value="IT">Information Technology</option>
            <option value="ECE">Electronics Engineering</option>
            <option value="EC">Electrical Engineering</option>
            <option value="MECH">Mechanical Engineering</option>
            <option value="CIVIL">Civil Engineering</option>
          </select>
        </div>


        <div class="mb-5">
          <label for="status" class="block mb-2 text-sm font-medium text-gray-900">Select Semester</label>
          <select value={ProductSemester} onChange={(e) => setProductSemester(e.target.value)} name="status" id="status" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required>
            <option value="1">1st Semester</option>
            <option value="2">2st Semester</option>
            <option value="3">3st Semester</option>
            <option value="4">4st Semester</option>
            <option value="5">5st Semester</option>
            <option value="6">6st Semester</option>
          </select>
        </div>


        <div class="mb-5">
          <label
            for="Subject"
            class="block mb-2 text-sm font-medium text-gray-900"
          >
            Subject Title
          </label>
          <input
            id="Subject"
            value={ProductName}
            onChange={(e) => setProductName(e.target.value)}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-0"
            placeholder="Subject Name"
            required
          />
        </div>


        <div class="mb-5">
          <label
            for="Subject"
            class="block mb-2 text-sm font-medium text-gray-900"
          >
            Link
          </label>
          <input
            id="SubjectL"
            value={ProductLink}
            onChange={(e) => setProductLink(e.target.value)}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-0"
            placeholder="Subject Link"
            required
          />
        </div>

        {/* <div class="flex items-start mb-5">
    <div class="flex items-center h-5">
      <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300" required/>
    </div>
    <label for="remember" class="ms-2 text-sm font-medium text-gray-900">Remember me</label>
  </div> */}
        <button

          onClick={updateDetails}
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Save
        </button>
      </div>
    </>
  );
};

export default Page;
