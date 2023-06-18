"use client";
import { useCallback, useState } from "react";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter, usePathname } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import { BsBoxArrowInRight, BsPencilSquare } from "react-icons/bs";
import Button from "@/components/button";
import Input from "@/components/inputs/input";
type AuthType = "login" | "register";
const AuthForm = () => {
  const [authType, setAuthType] = useState<AuthType>("login");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pathName = usePathname();
  // if route is not /, redirect to /
  if (pathName !== "/") {
    router.push("/");
  }
  const toggleAuthType = useCallback(() => {
    setAuthType(authType === "login" ? "register" : "login");
  }, [authType]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    if (authType === "register") {
      axios
        .post("api/register", data)
        .then(() => {
          toast.success("Usuario registrado con éxito");
        })
        .catch((err) => {
          toast.error("Error al registrar usuario");
        })
        .finally(() => {
          setLoading(false);
        });
    }
    if (authType === "login") {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((res) => {
          if (res?.error) {
            toast.error(res.error);
            setLoading(false);
          }
          if (res?.ok && !res?.error) {
            toast.success("Bienvenido");
            router.push("/proyectos");
          }
        })
        .finally(() => {
          router.refresh();
        });
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="w-full max-w-[500px] rounded-lg ">
        <div className="h-full w-full">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 p-4"
          >
            <h1 className="text-center text-2xl font-bold">
              {authType === "login" ? "Login" : "Register"}
            </h1>
            {authType === "register" && (
              <Input
                id="username"
                label="Username"
                type="text"
                register={register}
                errors={errors}
                required
              />
            )}
            <Input
              id="email"
              label="Email"
              type="email"
              register={register}
              errors={errors}
              required
            />
            <Input
              id="password"
              label="Password"
              type="password"
              register={register}
              errors={errors}
              required
            />
            <Button
              label={authType === "login" ? "Login" : "Register"}
              theme="primary"
              fullWidth
              center
              icon={authType === "login" ? BsBoxArrowInRight : BsPencilSquare}
              loading={loading}
              disabled={loading}
              type="submit"
            />
            <Button
              label={
                authType === "login"
                  ? "No tienes una cuenta? Registrate"
                  : "Ya tienes una cuenta? Inicia Sesión"
              }
              theme="secondary"
              fullWidth
              center
              onClick={toggleAuthType}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
