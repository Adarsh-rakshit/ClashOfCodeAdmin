import React, { useEffect, useState } from 'react'
import { Controller, useForm } from "react-hook-form"
import Button from "../Button.jsx"
import Input from "../Input.jsx"
import Select from "../Select.jsx"
import appwriteService from "../../appwrite/config.js"
import { useNavigate } from "react-router-dom"
const ContestForm = ({ Contest }) => {
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      Name: Contest?.Name || "",
      Schedule: Contest?.Schedule || "",
      OrganisationID: Contest?.OrganisationID || "",
      ContestUrl: Contest?.ContestUrl || "",
      DifficultyLevel: Contest?.DifficultyLevel || "",
      Duration: Contest?.Duration || ""
    }
  })

  const navigate = useNavigate();


  const sub = async (data) => {
    const ContestName = data.Name;
    const Schedule = new Date(data.Schedule).toISOString();
    const ContestURL = data.ContestUrl;
    const DifficultyLevel = data.DifficultyLevel;
    const OrganisationID = data.OrganisationID;
    const Duration = parseInt(data.Duration, 10);
    try {
      await appwriteService.createContest({ ContestName, Schedule, ContestURL, DifficultyLevel, OrganisationID, Duration });
    }
    catch (err) {
      console.log("erorr in sending data" + err)
    }
  }


  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await appwriteService.getAllOrgs();
        if (response && response.documents) {
          // Map over the documents array to extract the necessary fields
          setOrganizations(response.documents.map(org => ({
            id: org.$id,  // Assuming $id is the unique identifier
            name: org.OrgName  // Assuming OrgName is the field you want to display
          })));
        } else {
          console.error('No organizations found or error in fetching.');
        }
      } catch (error) {
        console.error('Error fetching organizations:', error);
      }
    };

    fetchOrganizations();
  }, []);
  return (
    <div className='w-full md:w-96 md:max-w-full mx-auto'>
      <div className='p-6 border border-gray-600 sm:rounded-3xl bg-gray-800'>
      <form onSubmit={handleSubmit(sub)} className="">
      <div className='flex flex-wrap'>
      <div className='w-full px-2'>
        <Input
          label="Contest Name"
          placeholder="Contest Name"
          className=""
          {...register("Name",{required: "Name required"})}
        />
      </div>
      <div className='w-full px-1'>
        <Controller
          name="OrganisationID"
          control={control}
          rules={{ required: 'Organisation is needed' }}
          render={({ field }) => (
            <Select
              options={organizations}
              label="Organisation"
              className="mb-4"
              {...field} // This binds value and onChange to the field
            />
          )}
        />
      </div>

      <div className='w-full px-1'>
        <Controller
          name='DifficultyLevel'
          control={control}
          rules={{required : "Difficulty level required"}}
          render={({ field }) => (
            <Select
              options={[
                { id: 'beginner', name: 'Beginner' },
                { id: 'intermediate', name: 'Intermediate' },
                { id: 'advanced', name: 'Advanced' },
              ]}
              label="Difficulty Level"
              className="mb-4"
              {...field}
            />
          )}
        />
      </div>

      <div className="relative max-w-sm w-full">
        <Controller
          name='Schedule'
          control={control}
          rules={{required: "Schedule is Needed"}}
          render={({ field }) => (
            <Input
              type="datetime-local"
              {...field}
              label="Schedule"
              className="block
            w-full
            mt-1
            border-white
            rounded-md
            shadow-sm
            focus:border-indigo-300
            focus:ring
            focus:ring-indigo-200
            focus:ring-opacity-50
            bg-transparent
            placeholder-gray-600
            text-gray-500
            mx-2"
            />
          )}
        />

      </div>
      <div className='w-full px-2'>
        <Input
          label="ContestUrl"
          placeholder="URL"
          className=""
          {...register("ContestUrl", { required: "url is needed" })}
        />
      </div>
      <div className='w-full px-2'>
        <Input
          label="Duration"
          type="number"
          placeholder="Duration"
          className=""
          {...register("Duration",{required: "Duration needed"})}
        />
      </div>
      </div>
      <button type="submit" className="h-10
            px-5
            text-indigo-100
            bg-indigo-700
            rounded-lg
            transition-colors
            duration-150
            focus:shadow-outline
            hover:bg-indigo-800">Submit</button>

    </form>
      </div>
    </div>
  )
}

export default ContestForm
