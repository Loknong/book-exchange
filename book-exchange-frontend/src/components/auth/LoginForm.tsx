import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { loginUser } from "../../api/api";
import Input from "../base/Input";
import Button from "../base/Button";
import Modal from "../base/Modal";
import { useUserStore } from "../../stores/userStore";

const schema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(4, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof schema>;

const LoginForm: React.FC = () => {
  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { setUser } = useUserStore();

  const onSubmit = async (data: FormData) => {
    console.log("Submitting data:", data); // Log the data being submitted
    try {
      const response = await loginUser(data.username, data.password);
      console.log("Response", response.data);

      if (response.status === "success") {
        // Store the token in local storage
        localStorage.setItem("authToken", response.data.token);

        // Set user info in Zustand
        setUser(
          response.data.user.id,
          response.data.user.username,
          response.data.user.role
        );

        navigate("/address");
      } else {
        setErrorMessage(response.message);
        setModalOpen(true);
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        setErrorMessage(err.response?.data.message || "An error occurred");
      } else {
        setErrorMessage("Unexpected error");
      }
      setModalOpen(true);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="bg-orange-200 max-w-xl w-full px-4 py-4 pb-6 rounded shadow-md"
      >
        <div>LoginForm</div>
        <Input name="username" label="Username" type="text" />
        <Input name="password" label="Password" type="password" />
        <Button type="submit" variant="primary">
          Login
        </Button>
      </form>
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <div className="p-4">
          <h2 className="text-xl mb-2">Login Error</h2>
          <p>{errorMessage}</p>
          <Button variant="primary" onClick={() => setModalOpen(false)}>
            Close
          </Button>
        </div>
      </Modal>
    </FormProvider>
  );
};

export default LoginForm;
