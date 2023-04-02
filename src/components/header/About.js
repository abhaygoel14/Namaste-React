import ProfileClass from "./ProfileClass";

const About = () => {
  const name = "Abhay Goel";
  return (
    <>
      <h1>About us Page</h1>
      <ProfileClass name={name} />
    </>
  );
};

export default About;
