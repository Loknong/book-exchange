import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "../base/Input";
import Button from "../base/Button";
import { addBook } from "../../api/api";
import { AxiosError } from "axios";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  genre: z.string().min(1, "Genre is required"),
  bookCondition: z.string().min(1, "Book condition is required"),
  description: z.string().optional(),
  thumbnail: z.instanceof(File).optional(),
});

type FormData = z.infer<typeof schema>;

const AddBookForm: React.FC = () => {
  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key as keyof FormData] as string | Blob);
      });
      const book = await addBook(formData);
      console.log(book);
    } catch (err) {
      if (err instanceof AxiosError) {
        console.error(err.response?.data.message || "An error occurred");
      } else {
        console.error("Unexpected error");
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="bg-orange-200 max-w-xl w-full px-4 py-4 pb-6 rounded shadow-md"
      >
        <div>AddBookForm</div>
        <Input name="title" label="Title" />
        <Input name="author" label="Author" />
        <Input name="genre" label="Genre" />
        <Input name="bookCondition" label="Book Condition" />
        <Input name="description" label="Description" />
        <div className="my-4">
          <label htmlFor="thumbnail" className="block my-2 text-gray-800">
            Thumbnail
          </label>
          <input
            id="thumbnail"
            type="file"
            {...methods.register("thumbnail")}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {methods.formState.errors.thumbnail && (
            <p className="text-red-500 text-sm">
              {methods.formState.errors.thumbnail.message}
            </p>
          )}
        </div>
        <Button type="submit" variant="primary">
          Submit
        </Button>
      </form>
    </FormProvider>
  );
};

export default AddBookForm;
