import getInvitations from "@/actions/getInvitations";
import { InvitationProps } from "@/types";
import Button from "@/components/button";

const NotificacionesPage = async () => {
  const Invitations = (await getInvitations()) || [];

  console.log(Invitations);

  return (
    <div>
      <div className="w-full overflow-x-auto">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>Notificacion</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>


            {Invitations.map((invitation) => (
              <tr key={invitation.id}>
                <td>Invitación a proyecto con id {invitation.projectId}</td>
                <td>{invitation.createdDate.toLocaleDateString("es-ES")}</td>
                <td>{invitation.status}</td>
                <th>
                  <div className="flex w-full items-center justify-end">
                    <Button theme="primary" label="Aceptar" />
                    <div className="divider-horizontal" />
                    <Button theme="error" label="Rechazar" />
                  </div>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NotificacionesPage;
