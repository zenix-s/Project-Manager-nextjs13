import getCurrentUser from "./getCurrentUser";

const getProyectos = async () => {
  const user = await getCurrentUser();

  if (!user?.id) {
    return [];
  }

  try {
    const response = await fetch("http://localhost:3000/api/proyectos", {
      method: "GET",
      headers: {
        "user-id": "1",
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log("data");
      console.log(data);
      return data;
    }
  } catch (err) {
    console.error(err);
  }

  return [];
};

export default getProyectos;
