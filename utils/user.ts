export let user_id: string | undefined;

export function getUser() {
  return user_id;
}

export function setUser(u: string) {
  user_id = u;
}
