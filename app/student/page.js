"use client"
import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation'


const Page = () => {
  const searchParams = useSearchParams();

  const search = searchParams.get('token')
  const [CustomerID, setcustomerID] = useState(search);
  const [CustomerName, setCustomerName] = useState("");
  const [CustomerBranch, setCustomerBranch] = useState("CSE")
  const [CustomerCollege, setCustomerCollege] = useState("")
  const [CustomerPhone, setCustomerPhone] = useState("");
  const [CustomerEmail, setCustomerEmail] = useState("");
  const [Update, setUpdate] = useState([])
  const [msg, setmsg] = useState("")


  useEffect(() => {
    auth();
  }, []);



  const postData = {
    id: CustomerID,
    // Add other properties if needed
  };

  const router = useRouter();
  async function auth() {
    const fetch_api = await fetch("/api/getUpdate/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    });

    const data = await fetch_api.json();
    if (data.success) {
      console.log(data);
      setUpdate(data.Updates)
    }
  };



  return (
    <>
      <div className="mt-20">
        <h2 className="mb-5 text-2xl font-bold text-center">
          Student Token  {CustomerID} Status
        </h2>
      </div>
      <div class="max-w-lg text-center mx-auto border border-3 rounded-lg p-5">
      <div>
      {Update.map((update) => (
        <div key={update._id} className="flex items-center p-4 mb-4 text-sm text-green-800 rounded-lg bg-blue-50" role="alert">
          <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Info</span>
          <div>
            <span className="font-medium">{update.update}</span> 
          </div>
        </div>
      ))}
    </div>
    

        {/* <div class="flex items-start mb-5">
    <div class="flex items-center h-5">
      <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300" required/>
    </div>
    <label for="remember" class="ms-2 text-sm font-medium text-gray-900">Remember me</label>
  </div> */}
        <button
          class="mt-20 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
        Wait for counselling to Start --  SONU SIR CLASSES
        </button>
      </div>
    </>
  );
};

export default Page;
