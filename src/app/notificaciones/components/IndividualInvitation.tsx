"use client";
import Button from "@/components/button";
import { InvitationProps } from "@/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const IndividualInvitation = ({
  invitation,
}: {
  invitation: InvitationProps;
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleInvitation = (accept: boolean) => {
    setLoading(true);
    axios
      .put("/api/proyectos/invitations", {
        id: invitation.id,
        accept: accept,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
        router.refresh();
      });
  };

  const HandleOptions = () => {
    if (invitation.status === "Pendiente") {
      return (
        <>
          <Button
            theme="primary"
            label="Aceptar"
            onClick={() => handleInvitation(true)}
            disabled={loading}
          />
          <div className="divider-horizontal" />
          <Button
            theme="error"
            label="Rechazar"
            onClick={() => handleInvitation(false)}
            disabled={loading}
          />
        </>
      );
    }

    return (
      <>
        {/* <Button
          theme="error"
          label="Eliminar"
          onClick={() => console.log("Eliminar invitacion")}
        /> */}
      </>
    );
  };

  return (
    <tr key={invitation.id}>
      <td>Invitación a proyecto con id {invitation.projectId}</td>
      <td>{invitation.createdDate.toLocaleDateString("es-ES")}</td>
      <td>{invitation.status}</td>
      <th>
        <div className="flex w-full items-center justify-end">
          <HandleOptions />
        </div>
      </th>
    </tr>
  );
};

export default IndividualInvitation;
