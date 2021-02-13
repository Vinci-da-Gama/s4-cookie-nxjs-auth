import { useState, useEffect } from "react";
// import PropTypes from "prop-types";

import Layout from "../components/Layout";
import { authInitialProps, getUserProfile } from "../lib/auth";

const initUserProfile = {
  init: "waiting profile...",
};

const Profile = (props) => {
  console.log("12 -- props: ", props);
  const [userProfile, setUserProfile] = useState(initUserProfile);

  useEffect(() => {
    const getTargetUserProfile = async () => {
      try {
        setUserProfile(await getUserProfile());
      } catch (error) {
        console.warn("20 -- error: ", error.message);
      }
    };
    getTargetUserProfile();
    // return () => {}
  }, []);

  return (
    <Layout title="Profile" {...props}>
      <pre>{JSON.stringify(userProfile, null, 2)}</pre>
    </Layout>
  );
};

Profile.getInitialProps = authInitialProps(true);

/* Profile.propTypes = {}; */

export default Profile;
