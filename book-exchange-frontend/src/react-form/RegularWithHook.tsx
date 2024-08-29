import  { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
interface data {
  name: string;
  email: string;
  password: string;
}


function RegularWithHook() {
  const { register, handleSubmit } = useForm<data>();

  useEffect(() => {
    console.log("Register", { ...register });
  }, []);

  const onSubmit: SubmitHandler<data> = (data: data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="">Name:</label>
        <input type="text" {...register("name")} />
      </div>
      <div>
        <label htmlFor="">Email:</label>
        <input type="email" {...register("email")} />
      </div>
      <div>
        <label htmlFor="">Password:</label>
        <input type="password" {...register("password")} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default RegularWithHook;
