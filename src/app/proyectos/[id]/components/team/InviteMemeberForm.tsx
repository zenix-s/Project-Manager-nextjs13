'use client'
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "@/components/inputs/input";
import Button from "@/components/button";
import axios from 'axios';
import toasts from 'react-hot-toast'
import { useState } from "react";
import { useRouter } from "next/navigation";

interface InviteMemberFormProps {
  idProject: number;
}

const InviteMemberForm = ({ idProject }: InviteMemberFormProps) => {
  const [ loading, setLoading ] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      projectId: idProject,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setLoading(true)
    axios.post("/api/proyectos/invitations", data)
    .then(res => {
      toasts.success("Invitación enviada")
    })
    .catch(err => {
      toasts.error(err.response.data.message)
    })
    .finally(() => {
      setLoading(false)
    });

    




  }

  return (
    <div className="w-full">
      <form 
        onSubmit={
          handleSubmit(onSubmit)
        }
        className="w-full flex gap-4 items-end"
      >
        <div className="w-96">
          <Input
            label="Email"
            id="email"
            type="email"
            register={register}
            required
            errors={errors}
          />
        </div>
        <div>
          <Button
            label="Invitar"
            type="submit"
            theme="primary"
            loading={loading}
            disabled={loading}
          />
        </div>

      </form>
    </div>
  );
};

export default InviteMemberForm;
