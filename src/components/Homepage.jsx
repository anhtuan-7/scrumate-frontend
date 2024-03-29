import { Button, Typography } from '@material-tailwind/react';
import { Link } from 'react-router-dom';

import Footer from './Footer';
import Navbar from './Navbar';

const Homepage = () => {
  return (
    <div className="w-full bg-blue-grad bg-cover">
      <div className="flex min-h-screen flex-col items-center justify-around gap-2 bg-gray-600/50 text-gray-200">
        <Navbar />
        <div className="mt-6 grid w-full content-center items-center gap-12 lg:grid-cols-2">
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
              month and commonly lasts two weeks.
            </Typography>
            <Link to="/app">
              <Button size="sm" className="bg-orange-500 md:w-1/2 lg:w-2/5">
                <Typography>Get Started</Typography>
              </Button>
            </Link>
          </div>
          <img src="/home-1.png" className="h-100 px-10" />
        </div>
        <div className="grid w-full content-center items-center gap-12 lg:grid-cols-2">
          <img src="/home-2.png" className="h-100 px-10" />
          <div className="grid gap-6 p-24">
            <Typography variant="h2" color="white">
              Why <img src="/logo-white.png" className="inline w-60" />
            </Typography>
            <Typography className="text-xl">
              <span className="font-bold text-orange-500">Scrumate</span> is
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
