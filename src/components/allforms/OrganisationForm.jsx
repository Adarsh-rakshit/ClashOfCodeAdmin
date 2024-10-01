import React from 'react'
import { useForm } from 'react-hook-form'
import Button from '../Button'
import Input from '../Input'
import appwriteService from "../../appwrite/config.js"
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const OrganisationForm = (orgs) => {
    const { register, handleSubmit } = useForm({
        defaultValues: {
            Name: orgs?.Name || "",
            Icon: orgs?.Icon || "",
            OrgUrl: orgs?.OrgUrl || ""
        }
    })
    const submit = async (data) => {
        const file = await appwriteService.uploadFile(data.Icon[0]);
        if (file) {
            const fileId = file.$id;
            const OrgName = data.Name;
            const orgUrl = data.OrgUrl;
            await appwriteService.createOrg({ OrgName, fileId, orgUrl });
        }
        else {
            return console.error();
        }
    }
    return (
        <div className='w-full md:w-96 md:max-w-full mx-auto'>
            <h1 className="text-xl font-bold text-white capitalize dark:text-white mb-5">Organisation Form</h1>
            <div className='p-6 border border-gray-600 sm:rounded-md bg-gray-800'>
                <form onSubmit={handleSubmit(submit)} className=''>
                    <div className='px-2'>
                        <Input
                            label="Organisation Name"
                            placeholder="Organisation Name"
                            className=""
                            {...register("Name", { required: true })}
                        />
                    </div>
                    <div className='px-2'>
                        <Input
                            label="Organisation Url"
                            placeholder="Url"
                            className=""
                            {...register("OrgUrl", { required: true })}
                        />
                    </div>
                    <div className='mb-5'>
                        <label className="block text-sm font-medium text-white">
                            Organisation Icon
                        </label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                                <svg className="mx-auto h-12 w-12 text-white" stroke="currentColor" fill="none" viewBox="0 0 48 48" ariahidden="true">
                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <div className="flex text-sm text-gray-600">
                                    <label htmlFor="Organisation Icon" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                        <div className="px-2">
                                            <Input
                                                label="Organisation Icon"
                                                type="file"
                                                className="sr-only"
                                                accept="image/png, image/jpg, image/jpeg"
                                                {...register("Icon", { required: true })}
                                            />
                                        </div>
                                    </label>
                                    <p className="pl-1 text-white">or drag and drop</p>
                                </div>
                                <p className="text-xs text-white">
                                    PNG, JPG, GIF up to 10MB
                                </p>
                            </div>  
                        </div>
                    </div>
                    <Button type="submit" className="px-5
            text-indigo-100
            bg-indigo-700
            rounded-lg
            transition-colors
            duration-150
            focus:shadow-outline
            hover:bg-indigo-800">
                        Submit
                    </Button>
                </form>
            </div>
        </div>

    )
}

export default OrganisationForm