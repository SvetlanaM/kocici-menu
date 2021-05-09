import { useIdentityContext } from 'react-netlify-identity';
import { useEffect } from 'react';


import { setToken } from '../utils/token';
import { setUser } from '../utils/user';


export default function useAuth() {
  const auth = useIdentityContext();
  
  const { user } = useIdentityContext();

  if (typeof window !== "undefined") {
    // setToken(String(user?.user_metadata.my_token))
    // setToken(String("eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MDRlZmI3ZC1jYzdmLTRkN2EtOWM3My05MGQ2ZWIyZGFhNmQiLCJpYXQiOjE1MTYyMzkwMjIsImh0dHBzOi8vaGFzdXJhLmlvL2p3dC9jbGFpbXMiOnsieC1oYXN1cmEtYWxsb3dlZC1yb2xlcyI6WyJlZGl0b3IiLCJ1c2VyIiwibW9kIl0sIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS11c2VyLWlkIjoiNjA0ZWZiN2QtY2M3Zi00ZDdhLTljNzMtOTBkNmViMmRhYTZkIn19.I5IPZuJFZ812eA_x09Tba3KDeOzMKx0n0FU6RX6wdio1bC4zZ4v1MsbtpFxKzAq7QdAQDegg3LZmAdODlZrpExIA06f_8szgsVcupsieOyyB-pQ5fO8qxmbPAOPDdqndVLp08Gapyx6xM7wwtsS-FeSebsshbtHMNqGomp3eKFSPgR3iobTFjumSBi5nIYzXo2mUu8zj9lobuplB9gnBNIbZnUP0233DiqATw8e0qYkVcJHsjmEn-hPJGBwDn2EXoJgqeIE6Xz4WPDMIZ8PV0ZL-Pxwt4Gsr4qD11uj9tXTcZl17Wyh_PU3sfRtLqjN2P7XbfIW8tfnqFLxvBurOd3kmP3K6G9jpm2GuX3LLl2QH1usff75eHqEMgpyhQsVR12oQ4zQUV0iiJKz_ht431pir2xUUUSaKKR6AKOxjDv6t0RAE2YfzQz_z_QHS0bsAfGnmo0fYfCDortX1sqWwFpr3JOUqmraGBBOCNXbobJGEYZiG96iG5wqFwqeNhde1g2amGV_5gGAbnpLXl1E1EqBFs5tHIMx79mXnTCUkEeoGIs_zw4v2pYg6KkrMEe2oXC4h5mOiplyHAJjetsXLOIkBGOE_2ukHkHgZrDxHTOtLhtG_snK3l6HZD090GwOPOunADtwGvvIRIFT5dMGS1raEBvI6EMrqKcfevesJ0IE"))
    setUser(user?.id || '')
  }


  useEffect(() => {
  }, [auth]);
  return { isAuthenticated: auth && auth.isLoggedIn, user: user };
}

