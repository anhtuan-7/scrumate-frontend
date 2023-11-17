import { useEffect } from "react";
import { Button, Typography, Spinner } from "@material-tailwind/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import useThunk from "../hooks/useThunk";
import { checkLogin } from "../store";
import { Link } from "react-router-dom";
import Toast from "../components/Toast";

const Homepage = () => {
  const [doCheckLogin, isLoading, error] = useThunk(checkLogin);

  useEffect(() => {
    doCheckLogin();
  }, [doCheckLogin]);

  if (isLoading)
    return (
      <div className="mx-auto min-h-screen flex flex-col items-center justify-center">
        <div className="flex items-center gap-3 p-6">
          <Spinner className="h-8 w-8 inline-block" color="blue" />
          <Typography variant="h2" color="blue" className="inline-block">
            Just a moment
          </Typography>
        </div>
        <img src="/waiting.gif" className="rounded-2xl" />
      </div>
    );
  else if (error) {
    // console.log(error);
    Toast.fire({
      icon: "error",
      title:
        error === 503
          ? "Service Unavailable"
          : "Session Expired. Please log in again",
    });
  }

  return (
    <div className="w-full bg-blue-grad bg-cover">
      <div className="min-h-screen bg-gray-600/50 flex flex-col items-center justify-around gap-2 text-gray-200">
        <Navbar />
        <div className="grid items-center lg:grid-cols-2 gap-12 content-center w-full mt-6">
          <div className="grid gap-6 p-24">
            <Typography variant="paragraph" className="text-xl">
              <span className="font-bold">
                <a
                  href="https://en.wikipedia.org/wiki/Scrum_(software_development)"
                  className="text-orange-500"
                >
                  Scrum (noun)
                </a>
              </span>
              : an agile team collaboration framework commonly used in software
              development and other industries. Scrum prescribes for teams to
              break work into goals to be completed within time-boxed
              iterations, called sprints. Each sprint is no longer than one
              month and commonly lasts two weeks.{" "}
            </Typography>
            <Link to="/app">
              <Button size="sm" className="md:w-1/2 lg:w-2/5 bg-orange-500">
                <Typography>Get Started</Typography>{" "}
              </Button>
            </Link>
          </div>
          <img src="/home-1.png" className="h-100 px-10" />
        </div>
        <div className="grid items-center lg:grid-cols-2 gap-12 content-center w-full">
          <img src="/home-2.png" className="h-100 px-10" />
          <div className="grid gap-6 p-24">
            <Typography variant="h2" color="white">
              Why <img src="/logo-white.png" className="w-60 inline" />
            </Typography>
            <Typography className="text-xl">
              <span className="text-orange-500 font-bold">Scrumate</span> is
              tailored for agile project management, integrating the Scrum
              methodology seamlessly. With user-friendly sprint planning,
              backlog management, and real-time collaboration features, your
              team can embrace an iterative and adaptive approach to project
              development.
            </Typography>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Homepage;
