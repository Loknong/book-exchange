

// Regular Version
// const FormPage = () => {
//     const onShumit = (e: React.FormEvent<HTMLFormElement>): void => {
//         e.preventDefault();
//         console.log(e.target.name.value, e.target.lastname.value, e.target.email.value, e.target.checkbok.checked)
//     }
//     return (
//         <div className=" flex items-center flex-col justify-center">
//             <h1>Form Page</h1>
//             <form onSubmit={onShumit} className="w-[20rem] shadow-md px-4 py-2 space-y-2  flex flex-col">
//                 <div className="flex justify-between mt-4">
//                     <label htmlFor="name">Name: </label>
//                     <input type="text" name="" id="name" className="border border-gray-300 rounded  px-2 max-w-[12rem]" />
//                 </div>

//                 <div className="flex justify-between">
//                     <label htmlFor="lastname">Lastname: </label>
//                     <input type="text" name="" id="lastname" className="border border-gray-300 rounded  px-2 max-w-[12rem] " />
//                 </div>
//                 <div className="flex justify-between">
//                     <label htmlFor="email">Email: </label>
//                     <input type="text" name="" id="email" className="border border-gray-300 rounded  px-2 max-w-[12rem]" />
//                 </div>
//                 <div className="flex items-center space-x-2">
//                     <input type="checkbox" name="" id="checkbok" />
//                     <label htmlFor="checkbok">confirm</label>
//                 </div>
//                 <button className="px-4 py-2 rounded shadoow-sm border border-primary text-primary " type="submit">Submit</button>

//             </form>
//         </div>
//     )
// }

// export default FormPage

// Hook Form Version (Hint: use react-hook-form)
// import { useForm } from 'react-hook-form'
// import { DevTool } from '@hookform/devtools'

// let renderCounter = 0;

// interface FormValues {
//     name: string;
//     lastname: string;
//     email: string;
// }

// const FormPage = () => {
//     const form = useForm<FormValues>()
//     const { register, control, handleSubmit } = form;
//     renderCounter++;

//     const onSubmit = (data: FormValues) => {
//         console.log(data)
//     }
//     return (
//         <div className=" flex items-center flex-col justify-center">
//             <h1>Form Page {renderCounter / 2}</h1>
//             <form onSubmit={handleSubmit(onSubmit)} className="w-[20rem] shadow-md px-4 py-2 space-y-2  flex flex-col">
//                 <div className="flex justify-between mt-4">
//                     <label htmlFor="name">Name: </label>
//                     <input  {...register('name')} type="text" id="name" className="border border-gray-300 rounded  px-2 max-w-[12rem]" />
//                 </div>

//                 <div className="flex justify-between">
//                     <label htmlFor="lastname">Lastname: </label>
//                     <input {...register('lastname')} type="text" id="lastname" className="border border-gray-300 rounded  px-2 max-w-[12rem] " />
//                 </div>
//                 <div className="flex justify-between">
//                     <label htmlFor="email">Email: </label>
//                     <input {...register('email')} type="text" id="email" className="border border-gray-300 rounded  px-2 max-w-[12rem]" />
//                 </div>
//                 <button className="px-4 py-2 rounded shadoow-sm border border-primary text-primary " type="submit">Submit</button>

//             </form>
//             <DevTool control={control} />
//         </div>
//     )
// }

// export default FormPage

import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'


const schema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    lastname: z.string().min(1, { message: 'Lastname is required' }),
    email: z.string().email()
})

type FormValues = z.infer<typeof schema>


const FormPage = () => {
    const form = useForm<FormValues>({
        defaultValues: {
            name: 'John',
            lastname: 'Doe',
            email: ''
        },
        resolver: zodResolver(schema)
    })
    const { register, control, handleSubmit, formState: { errors, isSubmitting } } = form;

    const onSubmit = async (data: FormValues) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log(data);

        } catch (error) {

        }

    }
    return (
        <div className=" flex items-center flex-col justify-center">
            <h1>Form Page</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="w-[20rem] shadow-md px-4 py-2 space-y-2  flex flex-col">
                <div className="flex justify-between mt-4">
                    <label htmlFor="name">Name: </label>
                    <input type="text" {...register('name')} id="name" className="border border-gray-300 rounded  px-2 max-w-[12rem]" />
                </div>
                {errors.name && <p className="text-red-500 text-sm">{errors.name?.message}</p>}
                <div className="flex justify-between">
                    <label htmlFor="lastname">Lastname: </label>
                    <input type="text" {...register('lastname')} id="lastname" className="border border-gray-300 rounded  px-2 max-w-[12rem] " />
                </div>
                {errors.lastname && <p className="text-red-500 text-sm">{errors.email?.message}</p>}
                <div className="flex justify-between">
                    <label htmlFor="email">Email: </label>
                    <input type="text" {...register('email')} id="email" className="border border-gray-300 rounded  px-2 max-w-[12rem]" />
                </div>
                {errors.email && <p className="text-red-500 text-sm">{errors.email?.message}</p>}

                <button disabled={isSubmitting} className="px-4 py-2 rounded shadoow-sm border border-primary text-primary disabled:bg-slate-50" type="submit">Submit</button>
                {errors.root && <p className="text-red-500 text-sm">Something went wrong</p>}
            </form>
            <DevTool control={control} />
        </div>
    )
}

export default FormPage
