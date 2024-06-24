"use client"
import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation'


const Page = () => {
  const searchParams = useSearchParams();

  const search = searchParams.get('id')
  const [UpdateID, setUpdateID] = useState(search);
  const [UpdateLink, setUpdateLink] = useState("");
  const [UpdateTitle, setUpdateTitle] = useState("");
  const [UpdateDescription, setUpdateDescription] = useState("");
  const [UpdatePhone, setUpdatePhone] = useState("");
  const [UpdateEmail, setUpdateEmail] = useState("");
  const [msg, setmsg] = useState("")

  const postData = {
    Updateid: UpdateID,
    // Add other properties if needed
  };
  useEffect(() => {
    auth();
    fetch("/api/getUpdate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    }).then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log(data.Update);
          setUpdateTitle(data.Update.UpdateTitle)
          setUpdateDescription(data.Update.UpdateDescription)
          setUpdateLink(data.Update.UpdateLink)
        } else {
          console.error("API request failed");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

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


  function updateDetails() {
    fetch("/api/editUpdate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ UpdateID: UpdateID, UpdateTitle: UpdateTitle, UpdateDescription: UpdateDescription,UpdateLink:UpdateLink }),
    }).then((response) => response.json())
      .then((data) => {
        setmsg(data.msg)
        if (data.success) {
          console.log(data);
          setTimeout(() => {
            window.location.href = "/admin/updates"; // Replace "/your-target-page" with the actual target page URL
          }, 300);
        } else {
          console.error("API request failed");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  return (
    <>
      <div className="mt-20">
        <h2 className="mb-5 text-2xl font-bold text-center">
          Edit Update Details
        </h2>
      </div>
      <div class="max-w-sm mx-auto border border-3 rounded-lg p-5">
        {!msg ? ("") : (<div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50" role="alert">
          {msg}
        </div>)}
        <div class="mb-5">
          <label for="id" class="block mb-2 text-sm font-medium text-gray-900">
            Update ID
          </label>
          <input
            value={UpdateID}
            type="text"
            disabled
            id="id"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div class="mb-5">
          <label
            for="name"
            class="block mb-2 text-sm font-medium text-gray-900"
          >
            Title
          </label>
          <input
            type="text"
            value={UpdateTitle}
            onChange={(e) => setUpdateTitle(e.target.value)}
            id="name"
            placeholder="Title"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-0"
            required
          />
        </div>
        <div class="mb-5">
          <label
            for="class"
            class="block mb-2 text-sm font-medium text-gray-900"
          >
            Description
          </label>
          <textarea
            value={UpdateDescription}
            onChange={(e) => setUpdateDescription(e.target.value)}
            type="text"
            id="class"
            rows={6}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-0"
            placeholder="Your Body Goes here......."
            required
          />
        </div>


        <div class="mb-5">
          <label
            for="name"
            class="block mb-2 text-sm font-medium text-gray-900"
          >
            Link
          </label>
          <input
            type="text"
            value={UpdateLink}
            onChange={(e) => setUpdateLink(e.target.value)}
            id="name"
            placeholder="Optional"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-0"
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
