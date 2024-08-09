export const load = ({ cookies }) => {
  let token = cookies.get("token");

  return { token };
};
