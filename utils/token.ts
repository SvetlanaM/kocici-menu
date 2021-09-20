export let token: string | null = null;

export function getToken(): string {
  return token;
}

export function setToken(t: string):void {
  token = t;
}
