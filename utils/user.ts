export let user_id: string | undefined;

export function getUser(): string {
  return user_id;
}

export function setUser(u: string): void {
  user_id = u;
}
