import { Typography } from "@material-tailwind/react";

const Footer = () => {
  return (
    <footer className="bg-white backdrop-saturate-200 backdrop-blur-2xl bg-opacity-80 text-blue-gray-900 w-full grid md:grid-cols-3 gap-4 items-center justify-items-center py-3 px-10 border-t mt-4">
      <div className="flex-col md:justify-self-start">
        <Typography>&copy; 2024 Scrumate</Typography>
        <div>
          Images by{" "}
          <a href="https://www.freepik.com/free-vector/collection-colorful-avatar-men-women_1265964.htm#query=google%20avatar&position=3&from_view=keyword&track=ais&uuid=b77d9862-9724-45a8-859a-0a78a4b6c3b7">
            <Typography color="blue" variant="lg" className="inline">
              Freepik
            </Typography>
          </a>
        </div>
      </div>
      <img src="/hires-logo.png" className="w-36" />
      <ul className="flex flex-wrap items-center gap-y-2 gap-x-8 md:justify-self-end">
        <li>About Us</li>
        <li>Liscence</li>
        <li>Contact Us</li>
      </ul>
    </footer>
  );
};

export default Footer;
