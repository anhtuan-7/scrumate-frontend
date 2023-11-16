import { useEffect } from "react";
import { Button, Typography, Spinner } from "@material-tailwind/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import useThunk from "../hooks/useThunk";
import { checkLogin } from "../store";

const Homepage = () => {
  const [doCheckLogin, isLoading, error] = useThunk(checkLogin);

  useEffect(() => {
    doCheckLogin();
  }, [doCheckLogin]);

  if (isLoading)
    return (
      <div className="container mx-auto grid items-center">
        <Spinner className="h-12 w-12" color="blue" />
      </div>
    );
  else if (error) console.log("Error: ", error);

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-between text-blue-gray-900">
      <Navbar />
      <div className="grid items-center lg:grid-cols-2 gap-12 content-center w-full px-10">
        <div className="grid gap-6 p-24">
          <Typography variant="paragraph" className="text-lg">
            <span className="bold">
              <a
                href="https://en.wikipedia.org/wiki/Scrum_(software_development)"
                className="text-blue-500"
              >
                Scrum (noun)
              </a>
            </span>
            : an agile team collaboration framework commonly used in software
            development and other industries. Scrum prescribes for teams to
            break work into goals to be completed within time-boxed iterations,
            called sprints. Each sprint is no longer than one month and commonly
            lasts two weeks.{" "}
          </Typography>
          <Button color="blue" size="sm" className="md:w-1/2 lg:w-2/5">
            <Typography>Get Started</Typography>{" "}
          </Button>
        </div>
        <img src="/home-1.jpg" className="h-100" />
      </div>
      <div className="grid items-center lg:grid-cols-2 gap-12 content-center w-full px-10">
        <img src="/home-2.jpg" className="h-100" />
        <div className="grid gap-6 p-24">
          <Typography variant="h2" color="blue">
            Why <img src="/hires-logo.png" className="w-40 inline" />
          </Typography>
          <Typography className="text-lg">
            <span className="text-blue-500">Scrumate</span> is tailored for
            agile project management, integrating the Scrum methodology
            seamlessly. With user-friendly sprint planning, backlog management,
            and real-time collaboration features, your team can embrace an
            iterative and adaptive approach to project development.
          </Typography>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;
