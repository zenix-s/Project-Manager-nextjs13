import getInvitations from "@/actions/getInvitations";
import { InvitationProps } from "@/types";
import Button from "@/components/button";
import getCurrentUser from "@/actions/getCurrentUser";
import IndividualInvitation from "@/components/notifications/components/IndividualInvitation"

const NotificacionesPage = async () => {
  const Invitations = (await getInvitations()) || [];
  const user = await getCurrentUser();


  return (
    <div>
      <div className="w-full overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Notificacion</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {Invitations.map((invitation:any) => (
              <IndividualInvitation key={invitation.id} 
              invitation={invitation}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NotificacionesPage;
