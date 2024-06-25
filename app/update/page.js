"use client"
import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation'


const Page = () => {
  const searchParams = useSearchParams();

  const search = searchParams.get('id')
  const [CustomerID, setcustomerID] = useState(search);
  const [AllUpdates, setAllUpdates] = useState([])
  const [CustomerEmail, setCustomerEmail] = useState("");
  const [Message, setMessage] = useState("")
  const [msg, setmsg] = useState("")



  function addUpdate() {
    // Fetch data from the API
    const postData = {
      CustomerID: CustomerID,
      Update: Message

    };


    fetch("/api/addUpdate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    }).then((response) => response.json())
      .then((data) => {
        setmsg(data.msg)
        if (data.success) {
          console.log(data.customer);
          setmsg(data.msg)
        } else {
          console.error("API request failed");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    auth();
    getAllUpdates();
  }, [])


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


  async function getAllUpdates() {
    const fetch_api = await fetch(`/api/getUpdate/?id=${CustomerID}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await fetch_api.json();
    if (data.success) {
      setAllUpdates(data.Updates)
    }
  };

  return (
    <>
      <div className="mt-20">
        <h2 className="mb-5 text-2xl font-bold text-center">
          Add Update for - Token {search}
                  </h2>
      </div>
      <div class="max-w-sm mx-auto border border-3 rounded-lg p-5">
        {!msg ? ("") : (<div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50" role="alert">
          {msg}
        </div>)}
        {/* <div class="mb-5">
          <label for="id" class="block mb-2 text-sm font-medium text-gray-900">
            Customer ID
          </label>
          <input
            value={CustomerID}
            onChange={(e) => setcustomerID(e.target.value)}
            type="text"
            id="id"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div> */}
        <div class="mb-5">
          <label
            for="name"
            class="block mb-2 text-sm font-medium text-gray-900"
          >
            Token Number
          </label>
          <input
            type="text"
            placeholder="xxxxx"
            disabled
            value={CustomerID}
            onChange={(e) => setcustomerID(e.target.value)}
            id="name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-0"
            required
          />
        </div>
        <div class="mb-5">
          <label
            for="class"
            class="block mb-2 text-sm font-medium text-gray-900"
          >
            Add Update :
          </label>
          <textarea
            value={Message}
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            id="class"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-0"
            placeholder="xxxxxxx"
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

          onClick={addUpdate}
          class="mb-8 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg mt-4 text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          - Save -
        </button>



      {AllUpdates.map((update) => (
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



    </>
  );
};

export default Page;
